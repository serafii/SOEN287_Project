localStorage.setItem("loggedIn", true); //Execute if the user is logged in

window.onload = () => {
    const url = new URLSearchParams(window.location.search);
    console.log(url);
    if (url.has('link') && url.get('link') === 'manager') {
        console.log("Manager dashboard");
        localStorage.setItem("state", "manager"); // Save the state
    }
};