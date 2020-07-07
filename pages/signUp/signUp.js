let id = document.querySelector('.id')

id.addEventListener('focusout', errorMessage)


function errorMessage(e) {
    let input = e.target.value;
    if(input < 4 && id.length > 20) {
        console.log(e.target.value)
    }

}