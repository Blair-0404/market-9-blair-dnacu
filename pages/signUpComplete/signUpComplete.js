const getUserInfoMock = () => {
  return new Promise((resolve, reject) => {
    const res = {
      id: "crongro",
      name: "윤지수",
      email: "crongro@woowa.com",
      phone: "010-1234-5678",
    };

    setTimeout(() => resolve(res), 500);
  });
};

const init = async () => {
  await setUserInfo();
};

const setUserInfo = async () => {
  const userInfo = await getUserInfoMock();
  const infoWrap = document.querySelector(
    "#signup-complete-wrap .user-info-wrap"
  );

  infoWrap.querySelector(".name .value").textContent = userInfo.name;
  infoWrap.querySelector(".id .value").textContent = userInfo.id;
  infoWrap.querySelector(".email .value").textContent = userInfo.email;
  infoWrap.querySelector(".phone .value").textContent = userInfo.phone;
};

init();
