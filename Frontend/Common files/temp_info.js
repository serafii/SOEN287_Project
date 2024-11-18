
window.onload = ()=>{
    const url = new URLSearchParams(window.location.search);
    if (url.has('error') && url.get('error') === 'invalid') {
        document.getElementById("check").innerHTML = "Invalid username or password. Please try again";
    }
};