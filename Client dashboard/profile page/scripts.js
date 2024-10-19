//From bootstrap
(function () {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
    
          form.classList.add('was-validated')
        }, false)
      })
    })()

function showPassword(){
    let x = document.getElementById("password");
    if(x.type=="password")
        x.type = "text";
    else
        x.type = "password";
}

function showPassword2(){
    let x = document.getElementById("passwordCheck");
    if(x.type=="password")
        x.type = "text";
    else
        x.type = "password";
}

function samePassword(){
    let x = document.getElementById("password");
    let y = document.getElementById("passwordCheck");

    if(x.value!=y.value){
        document.getElementById("check").innerHTML = "Passwords did not match";
        return false;
    }
    else{
        document.getElementById("check").innerHTML = "";
        return true;
    }
}


