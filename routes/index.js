const mainRouter = require("./main.js");
const signUpRouter = require("./signUp.js");
const signInRouter = require("./signIn.js");
const signOutRouter = require("./signOut.js");
const completeRouter = require("./complete.js");
const notFoundRouter = require("./notFound.js");

module.exports = {
  mainRouter,
  signUpRouter,
  signInRouter,
  signOutRouter,
  completeRouter,
  notFoundRouter,
};
