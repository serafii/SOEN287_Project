window.addEventListener('storage', (event) => {
    if (event.key === "loggedIn" && event.newValue === "false") {
        // Logout detected in another tab
        localStorage.removeItem("username");
        window.location.href = "/"; // Redirect to home page
    }
  });

localStorage.setItem("loggedIn", true); //Execute if the user is logged in

window.onload = () => {
    const url = new URLSearchParams(window.location.search);
    console.log(url);
    if (url.has('link') && url.get('link') === 'manager') {
        console.log("Manager dashboard");
        localStorage.setItem("state", "manager"); // Save the state
    }
};