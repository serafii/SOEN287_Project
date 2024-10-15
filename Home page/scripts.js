function searchFor(){
    let x = document.getElementById("search").value.toLowerCase();
    let serv = document.getElementById("serv");
    let us = document.getElementById("about-us");
   
    if (x.includes("acc"))
        window.location.href = "/Login page/SignIn.html";
    else if(x.includes("ser") || x.includes("maj")||x.includes("reg")||x.includes("ext"))
        serv.scrollIntoView();
    else if(x.includes("clean"))
        us.scrollIntoView();
    else
        alert("Nothing was found.");

        return false;
}
