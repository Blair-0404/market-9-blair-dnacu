const signUpSelectors = {
    form: document.querySelector('form'),
    id: document.querySelector('.id'),
    password: document.querySelector('.password'),
    password2: document.querySelector('.password2'),
    emailTop: document.querySelector('.email-top'),
    emailBottom: document.querySelector('.email-bottom'),
    emailSelect: document.querySelector('#email-select'),
    name: document.querySelector('.name'),

    phone: document.querySelector('.phone'),
    phoneAuthBtn: document.querySelector('.phone-auth-button'),
    phoneResendBtn: document.querySelector('.resend-button'),
    phoneAuthInput: document.querySelector('.phone-auth-number'),
    phoneAuthConfirmBtn: document.querySelector('.confirm-button'),
    checkSelectInfo: document.querySelector('.check-select-info'),
    zipCode: document.querySelectorAll('.zip-code'),
    addressInput: document.querySelectorAll('.address-input'),
    addressSearchBtn: document.querySelector('.address-search-btn'),
    addressText: document.querySelector('.address-text'),
    addressDetailText: document.querySelector('.address-detail-text'),

    checkAllTerm: document.querySelector('.check-all-term'),
    checkNecessaryList: document.querySelector('.check-necessary-list'),
    checkAdAgree: document.querySelector('.check-ad-agree'),
};

const VALIDATION_MESSAGES = {
    INITIALIZER: "",
    ID_LENGTH: "아이디는 4글자 이상 20글자 이하로 사용 가능합니다",
    ID_GENERAL: "아이디는 소문자와 숫자만 사용 가능합니다",
    ID_CONFIRM: "입력하신 아이디로 사용 가능합니다",
    NAME_GENERAL: "이름에 특수문자, 숫자는 입력하실 수 없습니다. 다시 입력해주세요",
    PASSWORD_GENERAL: "비밀번호는 영문과 숫자를 포함하 8~20자로 입력해 주세요",
    PASSWORD_NOT_SAME: "위 비밀번호와 일치하지 않습니다. 다시 입력해 주세요",
    EMAIL_INVALID: "이메일 주소를 올바르게 입력해주세요",
    PHONE_INVALID: "핸드폰 번호의 형식이 잘못되었습니다.",
    PHONE_AUTH_NUM: "인증번호는 6자리의 숫자입니다",
}

const VALIDATION_LENGTHS = {
    ID_MIN_VALUE: 4,
    ID_MAX_VALUE: 20,
    PHONE_AUTH_NUM: 6
}

signUpSelectors.id.addEventListener('focusout', (e) => {
    e.preventDefault();
    isValidatedId();
})

signUpSelectors.name.addEventListener('focusout', (e) => {
    e.preventDefault();
    isValidatedName();
})

signUpSelectors.password.addEventListener('focusout', (e) => {
    e.preventDefault();
    isValidatedPassword();
})

signUpSelectors.password2.addEventListener('focusout', (e) => {
    e.preventDefault();
    isValidatedSamePassword();
})

signUpSelectors.emailTop.addEventListener('focusout', (e) => {
    e.preventDefault();
    isValidEmail();
})

signUpSelectors.emailBottom.addEventListener('focusout', (e) => {
    e.preventDefault();
    isValidEmail();
})

signUpSelectors.emailSelect.addEventListener('change', (e) => {
    const value = e.target.value;

    signUpSelectors.emailBottom.value = value;
    signUpSelectors.emailBottom.disabled = !!value;
    isValidEmail();
})

signUpSelectors.phone.addEventListener('focusout', (e) => {
    e.preventDefault();
    isValidPhoneNumber();
})

signUpSelectors.phoneAuthBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.resend-button').style.display = 'inline';
    document.querySelector('.phone-auth-button').style.display = 'none';
    document.querySelector('.auth-input').style.display = 'flex';
    document.querySelector('.auth-input').style.flexDirection = 'column';
    document.querySelector('.auth-input-wrapper').style.display = 'flex';
    alert("인증번호를 확인해 주세요");

    setTimers();
})

signUpSelectors.phoneResendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert("인증번호를 확인해 주세요");

    clearTimers();
    setTimers();
})

signUpSelectors.phoneAuthInput.addEventListener('focusout', (e) => {
    e.preventDefault();
    isValidPhoneAuthNumber();
})

signUpSelectors.phoneAuthConfirmBtn.addEventListener('click', (e) => {
    clearTimers();
    alert('인증이 완료되었습니다.');

    signUpSelectors.phoneResendBtn.disabled = true;
    signUpSelectors.phoneAuthInput.disabled = true;
    signUpSelectors.phoneAuthConfirmBtn.disabled = true;
})

// 주소 옵션박스 체크시 주소창 열림
signUpSelectors.checkSelectInfo.addEventListener('click', (e) => {
    isSelectedAddressCheckbox()
})

signUpSelectors.addressSearchBtn.addEventListener('click', () => {
    execDaumPostcode()
})


// 동의 체크박스 클릭시 다른 항목들 자동체크
signUpSelectors.checkAllTerm.addEventListener('click', (e) => {
    checkAllAgreeList();
})

// 둘중 한개 클릭시 전체 동의 체크
signUpSelectors.checkNecessaryList.addEventListener('click', (e) => {
    checkControlOtherList()
})

// 둘중 한개 클릭시 전체 동의 체크
signUpSelectors.checkAdAgree.addEventListener('click', (e) => {
    checkControlOtherList()
})

signUpSelectors.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = `${signUpSelectors.emailTop.value}@${signUpSelectors.emailBottom.value}`;
    const userObj = {
        id: signUpSelectors.id.value,
        password: signUpSelectors.password.value,
        email: email,
        name: signUpSelectors.name.value,
        phone: signUpSelectors.phone.value,
        postCode: signUpSelectors.zipCode.value,
        address: signUpSelectors.addressText.value,
        detailAddress: signUpSelectors.addressDetailText.value,
        adAgree: signUpSelectors.checkAdAgree.value,
    };


    httpRequest.post('/signup', userObj).then((res) => {
        if(res.signUpSuccess) {
            window.location.href = `/complete?id=${userObj.id}&name=${userObj.name}&email=${userObj.email}&phone=${userObj.phone}`;
        }
        // todo: 여기서 이제 complete페이지로 리다이렉트 시키기.
    })
})

function setTimers() {
    let time = 2 * 60 * 1000;
    const div = document.querySelector('.auth-timer');
    div.innerHTML = convertTimeFormatter(time / 1000);
    document.authInterval = setInterval(() => {
        time -= 1000;
        div.innerHTML = convertTimeFormatter(time / 1000);
    }, 1000);
    document.authTimeout = setTimeout(() => {
        clearInterval(document.authInterval);
        div.innerHTML = '';
    }, 2 * 60 * 1000);
}

function clearTimers() {
    clearInterval(document.authInterval);
    clearTimeout(document.authTimeout);

    const div = document.querySelector('.auth-timer');
    div.innerHTML = '';
}

function isValidatedId() {
    const idValue = signUpSelectors.id.value.trim();
    const generalRegExpId = /^[0-9a-z-_]+$/;
    const isGeneralRegEx = generalRegExpId.test(idValue);
    const label = document.querySelector('.id-msg');

    if (idValue.length < VALIDATION_LENGTHS.ID_MIN_VALUE || idValue.length > VALIDATION_LENGTHS.ID_MAX_VALUE) {
        signUpSelectors.id.classList.add("invalid");
        label.classList.add("invalid");
        label.textContent = VALIDATION_MESSAGES.ID_LENGTH;
    } else if (!isGeneralRegEx) {
        signUpSelectors.id.classList.add("invalid");
        label.classList.add("invalid");
        label.textContent = VALIDATION_MESSAGES.ID_GENERAL;
    } else {
        signUpSelectors.id.classList.remove("invalid");
        label.classList.remove("invalid");
        label.textContent = VALIDATION_MESSAGES.ID_CONFIRM;
    }
}

function isValidatedName() {
    const nameValue = signUpSelectors.name.value.trim();
    const regExpName = /[ㄱ-ㅎ|가-힣|a-z|A-Z|\*]+$/;
    const isRegEx = regExpName.test(nameValue);
    const label = document.querySelector('.name-msg');

    if (!isRegEx) {
        signUpSelectors.name.classList.add("invalid");
        label.classList.add("invalid");
        label.textContent = VALIDATION_MESSAGES.NAME_GENERAL;
    } else {
        signUpSelectors.name.classList.remove("invalid");
        label.textContent = VALIDATION_MESSAGES.INITIALIZER;
    }
}

function isValidatedPassword() {
    const passwordValue = signUpSelectors.password.value.trim();
    const regExpPassword = /^[a-zA-Z0-9]{8,20}$/;
    const isRegEx = regExpPassword.test(passwordValue);
    const label = document.querySelector('.password-msg');

    if(!isRegEx) {
        signUpSelectors.password.classList.add("invalid");
        label.classList.add("invalid");
        label.textContent = VALIDATION_MESSAGES.PASSWORD_GENERAL;
    } else {
        signUpSelectors.password.classList.remove("invalid");
        label.textContent = VALIDATION_MESSAGES.INITIALIZER;
    }
}

function isValidatedSamePassword() {
    const passwordValue = signUpSelectors.password.value.trim();
    const password2Value = signUpSelectors.password2.value.trim();
    const label = document.querySelector('.password2-msg');

    if (passwordValue !== password2Value) {
        signUpSelectors.password2.classList.add("invalid");
        label.classList.add("invalid");
        label.textContent = VALIDATION_MESSAGES.PASSWORD_NOT_SAME;
    } else {
        signUpSelectors.password2.classList.remove("invalid");
        label.textContent = VALIDATION_MESSAGES.INITIALIZER;
    }
}

function isValidEmail() {
    const emailTopValue = signUpSelectors.emailTop.value.trim();
    const emailBottomValue = signUpSelectors.emailBottom.value.trim();
    const label = document.querySelector('.email-msg');
    const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    const email = emailTopValue + '@' + emailBottomValue;

    if (!regExpEmail.test(email)) {
        signUpSelectors.emailTop.classList.add("invalid");
        signUpSelectors.emailBottom.classList.add("invalid");
        label.classList.add("invalid");
        label.textContent = VALIDATION_MESSAGES.EMAIL_INVALID;
    } else {
        signUpSelectors.emailTop.classList.remove("invalid");
        signUpSelectors.emailBottom.classList.remove("invalid");
        label.textContent = VALIDATION_MESSAGES.INITIALIZER;
    }
}

function isValidPhoneNumber() {
    const phone = signUpSelectors.phone.value.trim();
    const label = document.querySelector('.phone-msg');
    const regExpPhone = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;

    if (!regExpPhone.test(phone)) {
        signUpSelectors.phone.classList.add("invalid");
        label.classList.add("invalid");
        label.textContent = VALIDATION_MESSAGES.PHONE_INVALID;
    } else {
        signUpSelectors.phoneAuthBtn.disabled = false;
        signUpSelectors.phone.classList.remove("invalid");
        label.textContent = VALIDATION_MESSAGES.INITIALIZER;
    }
}

function isValidPhoneAuthNumber() {
    const phoneAuthInput = signUpSelectors.phoneAuthInput;
    const phoneAuthNumber = signUpSelectors.phoneAuthInput.value.trim();
    const label = document.querySelector('.phone-auth-msg');

    if (phoneAuthNumber.length < VALIDATION_LENGTHS.PHONE_AUTH_NUM) {
        phoneAuthInput.classList.add("invalid");
        label.classList.add("invalid");
        label.textContent = VALIDATION_MESSAGES.PHONE_AUTH_NUM;
    } else {
        signUpSelectors.phoneAuthConfirmBtn.disabled = false;
        phoneAuthInput.classList.remove("invalid");
        label.textContent = VALIDATION_MESSAGES.INITIALIZER;
    }
}

// 주소 옵션박스 체크시 주소창 열림 cb
function isSelectedAddressCheckbox() {
    if(signUpSelectors.checkSelectInfo.checked === true) {
        signUpSelectors.addressInput.forEach((val) => {
            val.removeAttribute('readonly')
        })
        signUpSelectors.addressSearchBtn.removeAttribute('disabled')
    } else {
        signUpSelectors.addressInput.forEach((val) => {
            val.setAttribute('readonly', '')
        })
        signUpSelectors.addressSearchBtn.setAttribute('disabled', '')
    }
}

// 검색주소 결과 input-value에 가져오기 cb
function execDaumPostcode() {
    const zipCodeInput = document.querySelector('.zip-code');
    const roadAddress = document.querySelector('.address-text');
    new daum.Postcode({
        oncomplete: function (data) {
            zipCodeInput.value = data.zonecode;
            roadAddress.value = data.roadAddress;
        },
    }).open();
}

// 동의 체크박스 로직구현 cb
function checkAllAgreeList (){
    if(signUpSelectors.checkAllTerm.checked) {
        signUpSelectors.checkNecessaryList.checked = true;
        signUpSelectors.checkAdAgree.checked = true;
    } else {
        signUpSelectors.checkNecessaryList.checked = false;
        signUpSelectors.checkAdAgree.checked = false;
    }
}

// 둘중 한개 클릭시 전체 동의 체크 cb
function checkControlOtherList() {
    signUpSelectors.checkAllTerm.checked = signUpSelectors.checkNecessaryList.checked && signUpSelectors.checkAdAgree.checked;
}
