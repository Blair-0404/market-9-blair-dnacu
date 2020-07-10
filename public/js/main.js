import { httpRequest } from "/js/httpRequest.js";

const wrap = document.querySelector("#main-wrap");
const signBtn = wrap.querySelector(".submit");

signBtn.addEventListener("click", (e) => {
  e.preventDefault();

  wrap.classList.add("on");

  setTimeout(() => {
    window.location.href = "/signIn";
  }, 600);
});

const signOutBtn = wrap.querySelector(".submit.signOut");

if (signOutBtn)
  signOutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    httpRequest.get("/signOut").then((res) => {});
  });
