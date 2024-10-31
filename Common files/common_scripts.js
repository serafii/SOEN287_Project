//Very basic generic search bar to navigate through every major page

function searchFor(){
    let x = document.getElementById("search").value.toLowerCase();
    
    if (x.includes("acc") || x.includes("log"))
        window.location.href = "../Login page/SignIn.html";
    else if (x.includes("create"))
        window.location.href = "../Create account page/Account.html";
    else if(x.includes("ser"))
        window.location.href = "../Services/services.html";
    else if(x.includes("pric")||x.includes("cost"))
        window.location.href = "../Pricing/Pricing.html";
    else if(x.includes("compan"))
        window.location.href = "../Home page/Index.html#about-us";
    else if(x.includes("forgot") && x.includes("passw"))
        window.location.href = "../Login page/password.html";
    else if ((x.includes("add")||x.includes("reque")) && x.includes("service"))
        window.location.href = "../Service Request/servicereq.html";
    else
        alert("Nothing was found.");

        return false;
}