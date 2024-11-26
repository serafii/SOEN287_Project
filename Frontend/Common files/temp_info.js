
window.onload = ()=>{
    const url = new URLSearchParams(window.location.search);
    if (url.has('error') && url.get('error') === 'invalid') {
        document.getElementById("check").innerHTML = "Invalid username or password. Please try again";
        localStorage.setItem("loggedIn", false);
    }
};

window.addEventListener('storage', (event) => {
    if (event.key === "loggedIn" && event.newValue === "false") {
        // Logout detected in another tab
        localStorage.removeItem("username");
        window.location.href = "/"; // Redirect to home page
    }
  });
  