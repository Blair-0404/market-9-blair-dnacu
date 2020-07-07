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

/**
 * @param somebody
 */

// body
//     #signup-complete-sction
//         #signup-complete-wrap
//             .title-wrap
//                 img.title(
//                     src="https://ceo.baemin.com/lockpath/images/logo-ceo.png"
//                     alt=""
//                 )
//                 .suv-title 회원이 되셨습니다.
//             .move-main-link
//                 a(href="/") 메인으로 &rarr;
//             .user-info-wrap
//                 .name 이름
//                 .id 아이디
//                 .email 이메일
//                 .phone 휴대폰
//             .small-messsage 위 내용은 내 정보관리에서 수정하실 수 있습니다.
