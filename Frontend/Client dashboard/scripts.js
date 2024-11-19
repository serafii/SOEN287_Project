localStorage.setItem("loggedIn", true); //Execute if the login form was submitted and the error message is not displayed meaning successful login

window.onload = ()=>{
    const url = new URLSearchParams(window.location.search);
    if (url.has('name')) {
      document.getElementById("clientName").innerHTML = `Welcome, ${url.get('name')}`;
    }
  };