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