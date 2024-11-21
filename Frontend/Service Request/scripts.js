// Show the modal
function addService() {
    const modal = document.getElementById('serviceRequestModal');
    modal.classList.add('show');
    modal.style.display = 'block';
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('serviceRequestModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
}

// Handle form submission
document.getElementById('serviceRequestForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    alert('Form submitted!'); // Example action
    closeModal(); // Close the modal
});

// Set the hidden input field's value from localStorage
document.getElementById('serviceType').value = localStorage.getItem('username');
