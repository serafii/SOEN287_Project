function removeService(button){
    if (confirm("Are you sure you want to cancel this service?") == true) {
       const row = button.closest('tr');
       row.remove();
   } else {
   
   }
 }

 function confirmService(button){
  if (confirm("Are you sure you want to confirm this service?") == true) {
     const row = button.closest('tr');
     row.remove();
 } else {
 
 }
}

 document.getElementById('table-wrapper').addEventListener('scroll', () => {
    const tableWrapper = document.getElementById('table-wrapper');
    if (tableWrapper.scrollTop + tableWrapper.clientHeight >= tableWrapper.scrollHeight) {
      loadMoreRows();
    }
  });
  
  function loadMoreRows() {
    const tableBody = document.getElementById('table-body');
    
    for (let i = 0; i < 5; i++) { // Load 5 new rows at a time
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>New Customer ${Math.floor(Math.random() * 1000)}</td>
        <td>New Service</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td class="center-button">
          <button type="button" class="btn btn-danger btn-sm" onclick="removeService(this)">Cancel</button>
        </td>
      `;
      tableBody.appendChild(row);
    }
  }
  