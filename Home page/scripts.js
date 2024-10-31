    const title = document.getElementById("businessTitle");
    const slogan = document.getElementById("businessSlogan");

    if(title===localStorage.getItem("title") && slogan ===localStorage.getItem("slogan")){
    localStorage.setItem("title",title.textContent);
    localStorage.setItem("slogan",slogan.textContent);
    }
    title.textContent = localStorage.getItem("title");
    slogan.textContent = localStorage.getItem("slogan");
