window.addEventListener('storage', (event) => {
    if (event.key === "loggedIn" && event.newValue === "false") {
        // Logout detected in another tab
        window.location.href = "/"; // Redirect to home page
    }
  });

  function submitted(){
    alert("Business information successfully updated!");
  }
  