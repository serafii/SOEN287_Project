function addService() {
    $('#serviceRequestModal').modal('show');
}

document.getElementById('serviceRequestForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Handle form submission logic here
    alert('Form submitted!');
    $('#serviceRequestModal').modal('hide');


});

document.getElementById('serviceType').value=localStorage.getItem('username')