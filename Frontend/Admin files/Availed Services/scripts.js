function removeService(button){
    if (confirm("Are you sure you want to cancel this service?") == true) {
       const row = button.closest('tr');
       row.remove();
   } else {
   
   }
 }

 function confirmService(button){
  if (confirm("Are you sure you want to confirm this service?") == true) {
     const serviceId = button.closest('tr').querySelector('.service-id').dataset.serviceId;
     const row = button.closest('tr');
     row.remove();
     fetch('/confirmService', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ serviceId }) 
    });
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
    
    for (let i = 0; i < 5; i++) { 
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


  function filterByDate() {
    const filterDate = new Date(document.getElementById('filter-date').value);
    
    if (isNaN(filterDate.getTime())) {
        alert("Please select a valid date.");
        return;
    }
    const rows = document.querySelectorAll('#table tbody tr');
    rows.forEach(row => {
        const dateText = row.querySelector('.col-3').textContent.trim();    
        const rowDate = new Date(dateText);
        if (rowDate >= filterDate) {
            row.style.display = ''; 
        } else {
            row.style.display = 'none'; 
        }
    });
}

  