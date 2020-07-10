const DataStore = require("nedb");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userList = new DataStore({
  filename: "data/userList.db",
  autoload: true,
});

/**
 * @async
 * @param {string} id - 유저의 id입력
 * @returns {Promise<boolean>} - 중복 id이면 true, 유니크하다면 false를 반환한다.
 */
const isDuplicatedId = (id) =>
  new Promise((resolve, reject) => {
    userList.find({ id }, (err, docs) => {
      if (err) reject(err);
      else resolve(docs.legnth > 0);
    });
  });

/**
 * @async
 * @param {string} id - 유저의 id입력
 * @returns {Promise<User | null>} - 해당 유저의 정보 반환. 해당 유저가 없으면 null 리턴
 */
const getUserInfo = (id) =>
  new Promise((resolve, reject) => {
    userList.findOne({ id }, (err, docs) => {
      if (err) reject(err);
      else resolve(docs);
    });
  });

/**
 * @async
 * @param {User} userInfo - 저장할 유저의 정보 입력
 * @returns {Promise<boolean>} - 저장 성공 시 true, 실패 시 err반환
 */
const addUser = (userInfo) =>
  new Promise((resolve, reject) => {
    userList.find({ id: userInfo.id }, (err, docs) => {
      if (docs.length > 0) reject({ code: "AlreadyExist" });
      else

        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(userInfo.password, salt, function(err, hash) {
            // Store hash in your password DB.
          });
        });

        userList.insert({ ...userInfo }, (err, docs) => {
          if (err) reject({ code: "InsertFailed", message: err });
          else resolve(docs._id);
        });
    });
  });

const userListDB = {
  addUser,
  getUserInfo,
  isDuplicatedId,
};

module.exports = userListDB;
