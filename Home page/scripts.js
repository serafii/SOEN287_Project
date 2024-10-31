    const title = document.getElementById("businessTitle");
    const slogan = document.getElementById("businessSlogan");

    if (!localStorage.getItem("title")) {
        localStorage.setItem("title", title.textContent);
    }
    if (!localStorage.getItem("slogan")) {
        localStorage.setItem("slogan",slogan.textContent);
    }
    title.textContent = localStorage.getItem("title");
    slogan.textContent = localStorage.getItem("slogan");

