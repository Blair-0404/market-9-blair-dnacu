const form = document.querySelector('form')
const id = document.querySelector('.id')
const label = document.querySelector('label')

const password = document.querySelector('.password')
const password2 = document.querySelector('.password2')
const emailBtn = document.querySelector('.email-bottom')
const emailSelect = document.querySelector('#email-select')
const name = document.querySelector('.name')
const phone = document.querySelector('.phone')

const phoneAuthBtn = document.querySelector('.phone-auth-button')
const checkSelectInfo = document.querySelector('.check-select-info')


form.addEventListener('onChange', (e) => {
    e.preventDefault();
    checkInputs();
})


function checkInputs() {
    const idValue = id.value.trim();

    if ((idValue.length > 4 || idValue.length < 20)) {
        // id.classList.add("error");
        let label = document.createElement('label');
        label.innerText = '입력하신 아이디로 사용이 가능합니다.'

    }
}


// let newDiv = document.createElement('div');
// // Add class name
// newDiv.className= 'hello';
//
// // Add id name
// newDiv.id= 'hello1';
//
// // Add attribute - 태그 속성 추가
// newDiv.setAttribute('title', 'Hello Div');