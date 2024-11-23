function addService() {
    $('#serviceRequestModal').modal('show');
}

document.getElementById('serviceRequestForm').addEventListener('submit', function(event) {
    // Handle form submission logic here
    alert('Servicce added! Check your dashboard for updates.');
    $('#serviceRequestModal').modal('hide');


});

document.getElementById('username').value = localStorage.getItem('username');

window.addEventListener('storage', (event) => {
    if (event.key === "loggedIn" && event.newValue === "false") {
        // Logout detected in another tab
        localStorage.removeItem("username");
        window.location.href = "/"; // Redirect to home page
    }
  });

