function removeService(button){
   if (confirm("Are you sure you want to cancel this service?") == true) {
      const row = button.closest('tr');
      row.remove();
  } else {
  
  }
}

document.getElementById('username').value = localStorage.getItem('username');

   function confirmService(serviceId){
     if(confirm("Are you sure you want to confirm that this service has been paid?") === true){
       fetch('/cancelService', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json', 
         },
         body: JSON.stringify({ serviceId }) 
       });
     }
     window.location.reload();
   }