localStorage.setItem("loggedIn", true); //Execute if the user is logged in

window.onload = ()=>{
    const url = new URLSearchParams(window.location.search);
    if (url.has('name')) {
      document.getElementById("clientName").innerHTML = `Welcome, ${url.get('name')}`;

      //Testing for delete account function
      //Store the client's username in local storage to identify which client is making requests
      localStorage.setItem("username",url.get('name'));
    }
  };