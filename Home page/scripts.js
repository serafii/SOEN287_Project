    let title = document.getElementById("businessTitle");
    let slogan = document.getElementById("businessSlogan");

    title.innerHTML = localStorage.getItem("newTitle");
    slogan.innerHTML = localStorage.getItem("newSlogan");

