function saveData(){
    const newTitle = document.getElementById("businessName").value;
    const newSlogan = document.getElementById("businessSlogan").value;

    localStorage.setItem("title",newTitle);
    localStorage.setItem("slogan",newSlogan);
    alert("Business information successfully updated!")
}   

document.getElementById("businessName").value = localStorage.getItem("title");
document.getElementById("businessSlogan").value = localStorage.getItem("slogan");



