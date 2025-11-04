//populating chart
const ctx = document.getElementById('myLineChart').getContext('2d');
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weightLossData = [190, 189, 188, 187, 186, 186, 185];

// Empty chart
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: days,
    datasets: [{
      label: 'Weight (lbs)',
      data: [], // start empty
      borderColor: '#000',
      borderWidth: 3,
      tension: 0.3,
      pointRadius: 4,
      fill: false
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        title: { display: true, text: 'Days', color: '#000', font: { size: 14, weight: 'bold' } },
        grid: { display: false },
        ticks: { color: '#000', font: { size: 12 } }
      },
      y: {
        title: { display: true, text: 'Weight (lbs)', color: '#000', font: { size: 14, weight: 'bold' } },
        grid: { color: 'rgba(0,0,0,0.08)' },
        ticks: { color: '#000', font: { size: 12 }, stepSize: 1 },
        beginAtZero: false
      }
    }
  }
});

// ====== Button logic ======
let weightLossSelected = false;
const weightLossBtn = document.getElementById('btnWeightLoss');
const runReportBtn = document.querySelector('.run-report');
const graphTitle = document.getElementById('graphTitle');

weightLossBtn.addEventListener('click', () => {
  weightLossSelected = true;
  graphTitle.textContent = 'Weight Loss';
});

runReportBtn.addEventListener('click', () => {
  if (!weightLossSelected) {
    alert('Click a button first!');
    return;
  }
  chart.data.datasets[0].data = weightLossData; // fill data
  chart.update();                               // refresh chart
});


