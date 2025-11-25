document.addEventListener('DOMContentLoaded', () => {

  const allDays = [
    'Mon W1', 'Tue W1', 'Wed W1', 'Thu W1', 'Fri W1', 'Sat W1', 'Sun W1',
    'Mon W2', 'Tue W2', 'Wed W2', 'Thu W2', 'Fri W2', 'Sat W2', 'Sun W2',
    'Mon W3', 'Tue W3', 'Wed W3', 'Thu W3', 'Fri W3', 'Sat W3', 'Sun W3',
    'Mon W4', 'Tue W4', 'Wed W4', 'Thu W4', 'Fri W4', 'Sat W4', 'Sun W4'
  ];

  // Default placeholder data (28 days = 4 weeks)
  const allWeightLossData = [
    190, 189, 188, 187, 186, 186, 185,
    184, 184, 183, 182, 182, 181, 181,
    180, 179, 179, 178, 178, 177, 177,
    176, 176, 175, 175, 174, 174, 173
  ];

  const allMoodData = [
    7, 6, 8, 5, 7, 6, 7,
    8, 7, 7, 6, 7, 8, 7,
    6, 6, 7, 5, 6, 7, 6,
    7, 8, 7, 6, 7, 7, 8
  ];

  const allWorkoutTimeData = [
    30, 40, 35, 45, 50, 0, 0,
    30, 30, 40, 45, 50, 20, 0,
    35, 40, 40, 50, 60, 30, 0,
    40, 45, 50, 55, 60, 35, 20
  ];

  // User-entered data
  const userWeightDates = [];
  const userWeightValues = [];

  const userMoodDates = [];
  const userMoodValues = [];

  const userWorkoutDates = [];
  const userWorkoutValues = [];

  // Chart setup
  const ctx = document.getElementById('myLineChart').getContext('2d');

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          borderColor: '#000',
          borderWidth: 3,
          tension: 0.3,
          pointRadius: 4,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          title: {
            display: true,
            text: '',
            color: '#000',
            font: { size: 14, weight: 'bold' }
          },
          grid: { display: false },
          ticks: {
            color: '#000',
            font: { size: 12 }
          }
        },
        y: {
          title: {
            display: true,
            text: '',
            color: '#000',
            font: { size: 14, weight: 'bold' }
          },
          grid: {
            color: 'rgba(0,0,0,0.08)'
          },
          ticks: {
            color: '#000',
            font: { size: 12 }
          },
          beginAtZero: false
        }
      }
    }
  });

  // UI elements
  const weightLossBtn = document.getElementById('btnWeightLoss');
  const moodBtn = document.getElementById('btnMoodLevel');
  const workoutTimeBtn = document.getElementById('btnWorkoutTime');
  const runReportBtn = document.querySelector('.run-report');
  const graphTitle = document.getElementById('graphTitle');
  const timeRangeSelect = document.getElementById('timeRange');

  const dateInput = document.getElementById('dateInput');
  const valueInput = document.getElementById('valueInput');
  const addEntryBtn = document.getElementById('addEntry');

  const dataStatus = document.getElementById('dataStatus');

  let activeMetric = null;
  let selectedRange = parseInt(timeRangeSelect.value, 10); // 7, 14, 21, 28

  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  // ---- Status helpers ----
  function showError(msg) {
    if (!dataStatus) return;
    dataStatus.textContent = msg;
    dataStatus.style.color = '#ff6b6b'; // visible red
  }

  function setExampleStatus(usingExample) {
    if (!dataStatus) return;
    if (usingExample) {
      dataStatus.textContent = 'Example Data';
      dataStatus.style.color = '#bbbbbb';
    } else if (dataStatus.textContent === 'Example Data') {
      dataStatus.textContent = '';
    }
  }

  function clearStatusIfError() {
    if (!dataStatus) return;
    // If it was an error, clear it when user successfully adds data
    if (dataStatus.style.color === 'rgb(255, 107, 107)' || dataStatus.style.color === '#ff6b6b') {
      dataStatus.textContent = '';
    }
  }

  // ---- Input placeholder ----
  function updateInputPlaceholder() {
    if (activeMetric === 'weight') valueInput.placeholder = "Weight (lbs)";
    else if (activeMetric === 'mood') valueInput.placeholder = "Mood (0–10)";
    else if (activeMetric === 'workout') valueInput.placeholder = "Workout time (minutes)";
    else valueInput.placeholder = "Select a metric first";
  }

  // ---- Metric buttons (do NOT auto-run chart) ----
  weightLossBtn.addEventListener('click', () => {
    activeMetric = 'weight';
    graphTitle.textContent = 'Weight Change';
    updateInputPlaceholder();
  });

  moodBtn.addEventListener('click', () => {
    activeMetric = 'mood';
    graphTitle.textContent = 'Mood Level';
    updateInputPlaceholder();
  });

  workoutTimeBtn.addEventListener('click', () => {
    activeMetric = 'workout';
    graphTitle.textContent = 'Workout Time';
    updateInputPlaceholder();
  });

  // ---- Helper to filter user entries by date window ----
  // selectedRange is in days: 7, 14, 21, 28 → 1–4 weeks
  function getFilteredUserEntries(dateArr, valueArr) {
    if (!dateArr.length || !valueArr.length) return null;

    const entries = [];
    for (let i = 0; i < dateArr.length; i++) {
      const d = new Date(dateArr[i]); // expects YYYY-MM-DD
      const t = d.getTime();
      if (isNaN(t)) continue;
      entries.push({ dateStr: dateArr[i], time: t, value: valueArr[i] });
    }

    if (!entries.length) return null;

    // sort by date ascending
    entries.sort((a, b) => a.time - b.time);

    const earliestTime = entries[0].time;
    const windowMs = selectedRange * ONE_DAY_MS;           // e.g., 7 days, 14 days, etc.
    const maxTime = earliestTime + windowMs;               // [earliest, earliest+window)

    // Keep only entries whose date is within the first N days from earliest
    const filtered = entries.filter(e => e.time < maxTime);

    if (!filtered.length) return null;

    return filtered;
  }

  // ---- Add entry button ----
  addEntryBtn.addEventListener('click', () => {
    if (!activeMetric) {
      showError("Choose a metric first.");
      return;
    }

    const dateVal = dateInput.value;
    const numVal = parseFloat(valueInput.value);

    if (!dateVal || isNaN(numVal)) {
      showError("Please enter a valid date and number.");
      return;
    }

    if (activeMetric === 'mood' && (numVal < 0 || numVal > 10)) {
      showError("Mood must be between 0 and 10.");
      return;
    }

    if (activeMetric === 'workout' && numVal < 0) {
      showError("Workout time cannot be negative.");
      return;
    }

    // Store valid data
    if (activeMetric === 'weight') {
      userWeightDates.push(dateVal);
      userWeightValues.push(numVal);
    } else if (activeMetric === 'mood') {
      userMoodDates.push(dateVal);
      userMoodValues.push(numVal);
    } else if (activeMetric === 'workout') {
      userWorkoutDates.push(dateVal);
      userWorkoutValues.push(numVal);
    }

    valueInput.value = '';
    clearStatusIfError(); // clear any old error once they successfully add
  });

  // ---- Run Report button ----
  runReportBtn.addEventListener('click', () => {
    if (!activeMetric) {
      showError("Select a metric first.");
      return;
    }
    updateChart();
  });

  // ---- Week dropdown ----
  timeRangeSelect.addEventListener('change', () => {
    selectedRange = parseInt(timeRangeSelect.value, 10); // 7, 14, 21, 28
    // If chart currently has something, re-run with new range
    if (activeMetric && chart.data.labels.length > 0) {
      updateChart();
    }
  });

  // ---- Main chart update ----
  function updateChart() {
    if (!activeMetric) return;

    let usingExample = false;

    if (activeMetric === 'weight') {
      chart.options.scales.y.title.text = 'Weight (lbs)';
      chart.options.scales.y.beginAtZero = false;
      chart.options.scales.y.ticks.stepSize = 1;
      chart.options.scales.x.title.text = 'Date';

      const filtered = getFilteredUserEntries(userWeightDates, userWeightValues);

      if (filtered && filtered.length) {
        usingExample = false;
        chart.data.labels = filtered.map(e => e.dateStr);
        chart.data.datasets[0].data = filtered.map(e => e.value);
        chart.data.datasets[0].label = "Weight (lbs) - Your Entries";
      } else {
        usingExample = true;
        // Example data still uses the same "weeks" idea, but via index since it's fake
        chart.data.labels = allDays.slice(0, selectedRange);
        chart.data.datasets[0].data = allWeightLossData.slice(0, selectedRange);
        chart.data.datasets[0].label = "Weight (lbs)";
      }
    }

    if (activeMetric === 'mood') {
      chart.options.scales.y.title.text = 'Mood (0–10)';
      chart.options.scales.y.beginAtZero = true;
      chart.options.scales.y.ticks.stepSize = 1;
      chart.options.scales.x.title.text = 'Date';

      const filtered = getFilteredUserEntries(userMoodDates, userMoodValues);

      if (filtered && filtered.length) {
        usingExample = false;
        chart.data.labels = filtered.map(e => e.dateStr);
        chart.data.datasets[0].data = filtered.map(e => e.value);
        chart.data.datasets[0].label = "Mood - Your Entries";
      } else {
        usingExample = true;
        chart.data.labels = allDays.slice(0, selectedRange);
        chart.data.datasets[0].data = allMoodData.slice(0, selectedRange);
        chart.data.datasets[0].label = "Mood";
      }
    }

    if (activeMetric === 'workout') {
      chart.options.scales.y.title.text = 'Minutes';
      chart.options.scales.y.beginAtZero = true;
      chart.options.scales.y.ticks.stepSize = 10;
      chart.options.scales.x.title.text = 'Date';

      const filtered = getFilteredUserEntries(userWorkoutDates, userWorkoutValues);

      if (filtered && filtered.length) {
        usingExample = false;
        chart.data.labels = filtered.map(e => e.dateStr);
        chart.data.datasets[0].data = filtered.map(e => e.value);
        chart.data.datasets[0].label = "Workout Time - Your Entries";
      } else {
        usingExample = true;
        chart.data.labels = allDays.slice(0, selectedRange);
        chart.data.datasets[0].data = allWorkoutTimeData.slice(0, selectedRange);
        chart.data.datasets[0].label = "Workout Time";
      }
    }

    setExampleStatus(usingExample);
    chart.update();
  }

  // Initial placeholder text
  updateInputPlaceholder();

});
