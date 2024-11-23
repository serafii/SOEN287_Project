function filterByDate() {
    const filterDate = new Date(document.getElementById('filter-date').value);
    const rows = document.querySelectorAll('.table-row');
  
    rows.forEach(row => {
      const dateText = row.querySelector('.col-3').textContent;
      const [day, month, year] = dateText.split('/');
      const rowDate = new Date(`${year}-${month}-${day}`);
  
      if (rowDate >= filterDate || isNaN(filterDate.getTime())) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  document.querySelectorAll(".btns2").forEach(btn => {   
    if(btn.textContent === "Unpaid"){
        btn.style.backgroundColor = "#b22222";
        btn.style.color = "white";
    }else{
        btn.style.backgroundColor = "green";
        btn.style.color = "white";
    }
});

function confirmService(billId){
  if(confirm("Are you sure you want to confirm that this service has been paid?") === true){
    console.log(billId);

    fetch('/confirmBill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ billId }) 
    });
  }
  window.location.reload();
}