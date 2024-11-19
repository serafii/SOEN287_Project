document.querySelectorAll(".request-link").forEach(() => {   
    if(localStorage.getItem("loggedIn") === "false"){
        document.getElementById("request-link").href = "../Login page/SignIn.html";   
    }
});