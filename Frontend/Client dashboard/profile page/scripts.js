function deleteConfirmation(){
    if (confirm("Are you sure you want to delete your account?") == true) {
        window.location.href = "deleteAccount.html";
    }
}
function showDelete(){
    document.getElementById("deleteAccount").style.display = "block";
}

//Add username of the client to the submission of the form
document.getElementById("usernameInput").value = localStorage.getItem("username");