function selectOption(optionText){
    let x = document.getElementById("basicDropdown");
    x.innerHTML = optionText;
}
function selectOption2(optionText){
    let x = document.getElementById("basicDropdown2");
    x.innerHTML = optionText;
}
function addConfirmation(event){
    if (confirm("Are you sure you want to add this service?") == true) {
        window.location.href = "/Manager dashboard/manager.html";
        alert("Service successfully added!")
    } else {
        event.preventDefault();
    }
}
function modConfirmation(event){
    if (confirm("Are you sure you want to modify this service?") == true) {
        window.location.href = "/Manager dashboard/manager.html";
        alert("Service successfully modified!")
    } else {
        event.preventDefault();
    }
}
function delConfirmation(event){
    if (confirm("Are you sure you want to delete this service? This action cannot be undone later.") == true) {
        window.location.href = "/Manager dashboard/manager.html";
        alert("Service successfully removed!")
    } else {
        event.preventDefault();
    }
}