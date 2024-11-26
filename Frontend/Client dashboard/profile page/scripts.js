function deleteConfirmation(){
    if (confirm("Are you sure you want to delete your account?") == true) {
        window.location.href = "../Client dashboard/profile page/deleteAccount.html";
    }
}
function showDelete(){
    document.getElementById("deleteAccount").style.display = "block";
}

function accountDeleted(){
    localStorage.setItem("loggedIn", false);
    alert("Account deleted successfully");
}

//Add username of the client to the submission of the form
document.getElementById("usernameInput").value = localStorage.getItem("username");

window.addEventListener('storage', (event) => {
    if (event.key === "loggedIn" && event.newValue === "false") {
        // Logout detected in another tab
        localStorage.removeItem("username");
        window.location.href = "/"; // Redirect to home page
    }
  });