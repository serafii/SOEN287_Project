function samePassword(){
    let x = document.getElementById("password");
    let y = document.getElementById("passwordCheck");

    if(x.value!=y.value){
        document.getElementById("check").innerHTML = "Passwords did not match";
        return false;
    }
    else{
        document.getElementById("check").innerHTML = "";
        alert("Password successfully updated!")
        return true;
    }
}
