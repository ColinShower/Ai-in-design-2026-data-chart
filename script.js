document.addEventListener("DOMContentLoaded", function() {

  Papa.parse('data.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      console.log("Data Success:", results.data);

      const labels = [];
      const values = [];
      
      const tbody = document.querySelector('#dataTable tbody');

      results.data.forEach(row => {

        const useCase = row['Use Case'];
        const percentage = row['2026 Percentage (%)'];
        const change = row['Change since 2025 (pts)']; 
        
        labels.push(useCase);
        values.push(cleanNumber(percentage));

        if (tbody) {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${useCase || '-'}</td>
            <td>${change || '-'}</td>
            <td>${percentage ? percentage + '%' : '-'}</td>
          `;
          tbody.appendChild(tr);
        }
      });

      const ctx = document.getElementById('revenueChart');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar', 
          data: {
            labels: labels, 
            datasets: [{
              label: '2026 Percentage (%)',
              data: values,
              backgroundColor: '#c9a7ff'
            }]
          },
          options: {
            scales: {
              y: {
                type: 'linear',
                title: {
                  display: true,
                  text: 'Percentage (%)'
                },
                max: 100 
              }
            }
          }
        });
      }

    },
    error: function(err) {
      console.error("PapaParse Load Failed:", err);
    }
  });

});

function cleanNumber(value) {
  if (!value) return 0;
  return Number(String(value).replace(/[^0-9.-]/g, ''));
}