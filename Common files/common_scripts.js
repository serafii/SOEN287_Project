function searchFor(){
    let x = document.getElementById("search").value.toLowerCase();
    
    if (x.includes("acc"))
        window.location.href = "/Login page/SignIn.html";
    else if(x.includes("ser"))
        window.location.href = "/Home page/Index.html#serv";
    else if(x.includes("reg") || x.includes("inter"))
        window.location.href = "/Services/services.html#regular";
    else if(x.includes("maj"))
        window.location.href = "/Services/services.html#major";
    else if(x.includes("ext"))
        window.location.href = "/Services/services.html#exterior";
    else if(x.includes("compr"))
        window.location.href = "/Services/services.html#comprehensive";
    else if(x.includes("clean"))
        window.location.href = "/Home page/Index.html#about-us";
    else if(x.includes("pric")||x.includes("cost"))
        window.location.href = "/Pricing/Pricing.html";
    else
        alert("Nothing was found.");

        return false;
}