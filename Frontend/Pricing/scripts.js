if(localStorage.getItem("state") === "manager"){
    alert("You are not authorized to access this page, please log in as a user to access this page");
}else{
        document.querySelectorAll(".request-link").forEach(link => {   
        if(localStorage.getItem("loggedIn") === "true"){
            link.href = "../Service Request/servicereq.html";   
        }
    });
}