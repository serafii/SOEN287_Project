function saveData(){
    let newTitle = document.getElementById("businessName").value;
    let newSlogan = document.getElementById("businessSlogan").value;

    localStorage.setItem("newTitle",newTitle);
    localStorage.setItem("newSlogan",newSlogan);
    alert("Business information successfully updated!")
}   

    document.getElementById("businessName").value = localStorage.getItem("newTitle");
    document.getElementById("businessSlogan").value = localStorage.getItem("newSlogan");

    

