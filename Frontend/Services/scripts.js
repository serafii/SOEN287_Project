if (localStorage.getItem("loggedIn") == "true") {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("signUp").classList.add("hidden");
    document.getElementById("signOut").classList.remove("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
} else {
    document.getElementById("login").classList.remove("hidden");
    document.getElementById("signUp").classList.remove("hidden");
    document.getElementById("signOut").classList.add("hidden");
    document.getElementById("dashboard").classList.add("hidden");
}