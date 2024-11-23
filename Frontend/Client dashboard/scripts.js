localStorage.setItem("loggedIn", true); //Execute if the user is logged in

window.onload = ()=>{
    const url = new URLSearchParams(window.location.search);
    if (url.has('name')) { 
      localStorage.setItem("username",url.get('name'));  //Store the client's username in local storage to identify which client is making requests
    }
    if(localStorage.getItem("username")){
      document.getElementById("clientName").innerHTML = `Welcome, ${localStorage.getItem("username")}`; //Display the client's name on the dashboard
      document.getElementById("profile-link").href = `/profile?name=${localStorage.getItem("username")}`; //Pass the username if client accesses the profile page

      const username = localStorage.getItem('username');
      document.getElementById('myServicesLink').href = `/myServices/${username}`; //Prepare link for my services
      document.getElementById('myBillsLink').href = `/myBills/${username}`;
    }
  };
