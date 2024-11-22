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

  window.onload = ()=>{
    const url = new URLSearchParams(window.location.search);
    if (url.has('error') && url.get('error') === 'invalidUsername') {
      document.getElementById("wrongUsername").innerHTML = "Username already taken";
    }
};

  window.onload = ()=>{
    const url = new URLSearchParams(window.location.search);
    if (url.has('error') && url.get('error') === 'invalidEmail') {
      document.getElementById("wrongEmail").innerHTML = "Email address already linked to an existing account";
    }
  };

  window.onload = ()=>{
    const url = new URLSearchParams(window.location.search);
    if (url.has('username')) {
      document.getElementById("welcomeTitle").innerHTML = "Welcome " + url.get('username') + "!";
    }
  };
 
function formValidity(){
  if (samePassword()) {
      return true; 
  } else {
      return false;
  }
}


