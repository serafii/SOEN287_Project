function addService() {
    $('#serviceRequestModal').modal('show');
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today); // Set the min attribute to today's date
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

