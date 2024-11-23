function addService() {
    $('#serviceRequestModal').modal('show');
}

document.getElementById('serviceRequestForm').addEventListener('submit', function(event) {
    // Handle form submission logic here
    alert('Service added! Check your dashboard for updates.');
    $('#serviceRequestModal').modal('hide');


});

document.getElementById('username').value = localStorage.getItem('username');

