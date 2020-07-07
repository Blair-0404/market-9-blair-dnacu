// const form = document.querySelector('form')
const id = document.querySelector('.id')
const password = document.querySelector('.password')
const password2 = document.querySelector('.password2')
const emailBtn = document.querySelector('.email-bottom')
const emailSelect = document.querySelector('#email-select')
const name = document.querySelector('.name')
const phone = document.querySelector('.phone')
const phoneAuthBtn = document.querySelector('.phone-auth-button')
const checkSelectInfo = document.querySelector('.check-select-info')

// id
id.addEventListener('focusout', (e) => {
    e.preventDefault();
    isValidatedId();
})

function isValidatedId() {
    const idValue = id.value.trim();
    const generalRegExpId = /^[0-9a-z-_]+$/;
    const isGeneralRegEx = generalRegExpId.test(idValue);
    const label = document.querySelector('.id-msg');
    const lengthErrorMsg = "아이디는 4글자 이상 20글자 이하로 사용 가능합니다";
    const generalErrorMsg = "아이디는 소문자와 숫자만 사용 가능합니다";
    const validateMsg = "입력하신 아이디로 사용 가능합니다";

    // validation logic
    if (idValue.length < 4 || idValue.length > 20) {
        id.classList.add("invalid");
        label.textContent = lengthErrorMsg;
    } else if (!isGeneralRegEx) {
        id.classList.add("invalid");
        label.textContent = generalErrorMsg;
    } else {
        id.classList.remove("invalid");
        label.textContent = validateMsg;
    }
}

// name
name.addEventListener('focusout', (e) => {
    e.preventDefault();
    isValidatedName();
})

function isValidatedName() {
    const nameValue = name.value.trim();
    const generalRegExpName = /[ㄱ-ㅎ|가-힣|a-z|A-Z|\*]+$/;
    const isGeneralRegEx = generalRegExpName.test(nameValue);
    const label = document.querySelector('.name-msg');
    const nameErrorMsg = "이름에 특수문자, 숫자는 입력하실 수 없습니다. 다시 입력해주세요.";

    if (!isGeneralRegEx) {
        name.classList.add("invalid");
        label.textContent = nameErrorMsg;
    }
}