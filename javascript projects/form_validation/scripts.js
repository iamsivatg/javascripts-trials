const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");


//Error display on function 
function showError(input,message){
    const formContorl = input.parentElement;
    formContorl.className = 'form-control error';
    const small = formContorl.querySelector('small')
    small.innerText = message
}


//success on function 
function showSuccess(input){
    const formContorl = input.parentElement;
    formContorl.className = 'form-control success';
}


// Check email valid

function checkemail(input){
    const re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
    if (re.test(input.value.trim())){
        showSuccess(input)
    }else{
        showError(input,'Email is not valid')
    }
}

//check input length

function checklength(input, min,max){
    if (input.value.length < min){
        showError(input,`${input.id} must be atleast ${min} characters`)
    }else if (input.value.length > max){
        showError(input,`${input.id} must be less than ${max} characters`)
    }else{
        showSuccess(input)
    }
}

// check password match

function checkpasswordmatch(input1, input2){
    if (input1.value !== input2.value){
        showError( input2, 'Password doesnt match')
    }
}

//check required

function checkRequired(inputArr){
 inputArr.forEach(function(input){
     if (input.value.trim() === ''){
        showError(input, `${input.id} is required`)
     }else{
         showSuccess(input)
     }
 })
}

// EVENT LISTENER
form.addEventListener('submit', function(e){
    e.preventDefault();
    
    checkRequired([username,email,password,password2]);
    checklength(username,3,5)
    checklength(password,6,45)
    checkemail(email)
    checkpasswordmatch(password,password2)

})