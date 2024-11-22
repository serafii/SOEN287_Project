function selectOption(optionText){
    let x = document.getElementById("basicDropdown");
    x.innerHTML = optionText;
    document.getElementById("selectedService").value = optionText;
}
function selectOption2(optionText){
    let x = document.getElementById("basicDropdown2");
    x.innerHTML = optionText;
    document.getElementById("selectedService2").value = optionText;
}
function selectOption3(optionText){
    let x = document.getElementById("basicDropdown3");
    x.innerHTML = optionText;
    document.getElementById("selectedService3").value = optionText;
}
function addConfirmation(event){
    if (confirm("Are you sure you want to add this service?") == true) {
        alert("Service successfully added!")
    } else {
        event.preventDefault();
    }
}
function modConfirmation(event){
    if (confirm("Are you sure you want to modify this service?") == true) {
        alert("Service successfully modified!")
    } else {
        event.preventDefault();
    }
}
function delConfirmation(event){
    if (confirm("Are you sure you want to delete this service? This action cannot be undone later.") == true) {
        alert("Service successfully removed!")
    } else {
        event.preventDefault();
    }
}

