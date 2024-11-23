function removeService(button){
   if (confirm("Are you sure you want to cancel this service?") == true) {
      const row = button.closest('tr');
      row.remove();
  } else {
  
  }
}
document.getElementById('username').value = localStorage.getItem('username');