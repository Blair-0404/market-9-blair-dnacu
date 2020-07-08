import { httpRequest } from "/js//httpRequest.js";

const signInWrap = document.querySelector("#signin-wrap");
const passwordReg = new RegExp("^[a-zA-Z0-9]{8,20}$", "gm");

const showErrorMessage = (message) => {
  const errMsg = signInWrap.querySelector("form .err");

  errMsg.textContent = message;
  errMsg.classList.add("on");
};

const signInHandler = (e) => {
  e.preventDefault();
  const id = signInWrap.querySelector("input.id").value;
  const password = signInWrap.querySelector("input.password").value;
  const saveId = signInWrap.querySelector(".save-id input").checked;

  // 아이디가 글자 수 범위(4 ~ 20)를 벗어날 경우
  if (id.length > 20 || id.length < 4)
    showErrorMessage("아이디를 확인해주세요.");
  // 패스워드가 글자 수 범위(8 ~ 20)를 벗어나거나, 영문+숫자 이외의 문자를 사용하였을 경우
  else if (
    password.length > 20 ||
    id.length < 8 ||
    !password.match(passwordReg)
  )
    showErrorMessage("비밀번호를 확인해주세요.");
  else {
    httpRequest.post("/signIn", { id, password }).then(({ signInSuccess }) => {
      // 로그인 성공!
      if (signInSuccess) {
        alert("로그인 성공!");

        // 아이디 저장을 위해 localStorage에 저장
        if (saveId) localStorage.setItem("id", id);

        window.location.href = "/";
      }
      // 로그인 실패!
      else {
        showErrorMessage("아이디와 비밀번호를 확인 후 다시 로그인해주세요.");
      }
    });
  }
};

const init = () => {
  const savedId = localStorage.getItem("id");
  if (savedId) {
    signInWrap.querySelector("input.id").value = savedId;
    signInWrap.querySelector(".save-id input").checked = true;
  }

  const submitBtn = signInWrap.querySelector("input.submit");
  submitBtn.addEventListener("click", signInHandler);
};

init();
