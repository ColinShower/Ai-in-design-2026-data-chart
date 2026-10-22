document.addEventListener("DOMContentLoaded", function() {

Papa.parse('data.csv', {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    console.log("running");
    console.log(results.data);

    const chartContainer = document.getElementById('chartContainer');
    const tbody = document.querySelector('#dataTable tbody');

    results.data.forEach(row => {
 
      const tr = document.createElement('tr');

      const useCase = row['Use Case'];
      const change = row['Change since 2025 (pts)'];
      const percentage = row['2026 Percentage (%)'];

      if (chartContainer) {
          const changeHtml = change ? `<span class="change-pts">${change}pts</span>` : '';
          const rowDiv = document.createElement('div');
          rowDiv.className = 'chart-row';
          
          rowDiv.innerHTML = `
            <div class="labels">
              <span class="use-case">${useCase}</span>
              ${changeHtml}
            </div>
            <div class="bar-area">
              <div class="bar" style="width: ${percentage}%;"></div>
              <span class="percentage">${percentage}%</span>
            </div>
          `;
          chartContainer.appendChild(rowDiv);
        }
 
      if (tbody) {
          const tr = document.createElement('tr');
          
          tr.innerHTML = `
            <td>${useCase || '-'}</td>
            <td>${change || '-'}</td>
            <td>${percentage ? percentage + '%' : '-'}</td>
          `;
          
          tbody.appendChild(tr);
        }
 
      tbody.appendChild(tr); 
    });
 
    
  },
 
  error: function(err) {
    console.error("FAILED");
    console.error(err);
  }
  });

});