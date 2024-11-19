localStorage.setItem("loggedIn", true); //Execute if the user is logged in

window.onload = ()=>{
    const url = new URLSearchParams(window.location.search);
    if (url.has('name')) {
      document.getElementById("clientName").innerHTML = `Welcome, ${url.get('name')}`;
    }
  };