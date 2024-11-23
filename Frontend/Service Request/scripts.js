function addService() {
    $('#serviceRequestModal').modal('show');
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today); // Set the min attribute to today's date
}

document.getElementById('serviceRequestForm').addEventListener('submit', function(event) {
    // Handle form submission logic here
    alert('Service added! Check your dashboard for updates.');
    $('#serviceRequestModal').modal('hide');
});

document.getElementById('username').value = localStorage.getItem('username');
