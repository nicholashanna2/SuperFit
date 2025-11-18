document.addEventListener('DOMContentLoaded', () => {
    const monthYearDisplay = document.getElementById('monthYear');
    const calendarDays = document.getElementById('calendarDays');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const workoutButton = document.getElementById("workoutButton");
    

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    function renderCalendar() {
        calendarDays.innerHTML = '';
        monthYearDisplay.textContent = `${months[currentMonth]} ${currentYear}`;

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.appendChild(document.createElement('div'));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;

            if (
                day === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
            ) {
                dayDiv.classList.add('current-date');
            }

            calendarDays.appendChild(dayDiv);
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });


    function getExerciseStats(sessionList, exerciseName) {
  const allExercises = [];

  sessionList.forEach(session => {
    session.exercises.forEach(ex => {
      if (ex.exerciseName === exerciseName) {
        allExercises.push({
          sets: parseInt(ex.sets) || 0,
          reps: parseInt(ex.reps) || 0,
          weight: parseFloat(ex.weight) || 0
        });
      }
    });
  });

  if (!allExercises.length) return null;

  const totalSets = allExercises.reduce((sum, e) => sum + e.sets, 0);
  const totalReps = allExercises.reduce((sum, e) => sum + e.reps, 0);
  const totalWeight = allExercises.reduce((sum, e) => sum + e.weight, 0);

  return {
    averageSets: (totalSets / allExercises.length).toFixed(1),
    averageReps: (totalReps / allExercises.length).toFixed(1),
    averageWeight: (totalWeight / allExercises.length).toFixed(1)
  };
}

function personalizedWorkoutRecommendation(sessionList, userHeight, userWeight) {
  const bmi = (userWeight / (userHeight * userHeight)) * 703;

  const exerciseList = ["Squat", "Bench Press", "Deadlift", "Shoulder Press", "Row"];

  const plan = exerciseList.map(name => {
    const stats = getExerciseStats(sessionList, name);
    if (!stats) {
      return {
        exerciseName: name,
        sets: 3,
        reps: "10–12",
        weight: "5–20 lbs"
      };
    }
    const newWeight = parseFloat(stats.averageWeight) + 5;
    return {
      exerciseName: name,
      sets: stats.averageSets,
      reps: stats.averageReps,
      weight: `${newWeight} lbs`
    };
  });

  return {
    difficulty: bmi < 25 ? "Intermediate" : "Beginner",
    exercises: plan,
    notes: "Plan adjusted based on your past performance."
  };
}

// Button and popup logic
const btn = document.getElementById("recommendBtn");
const box = document.getElementById("recommendationBox");

btn.addEventListener("click", () => {
  const user = JSON.parse(localStorage.getItem("superFitUser")) || {};
  const sessionList = JSON.parse(localStorage.getItem("superFitSessions")) || [];

  if (!user.Height || !user.Weight) {
    box.innerHTML = "<p>Please enter height and weight first.</p>";
    box.style.display = "block";
    return;
  }

  const recommendation = personalizedWorkoutRecommendation(
    sessionList,
    parseFloat(user.Height),
    parseFloat(user.Weight)
  );

  let html = `<button class="closeBtn">&times;</button><h3>Recommended Plan</h3>`;
  html += `<p><strong>Difficulty:</strong> ${recommendation.difficulty}</p>`;
  recommendation.exercises.forEach(ex => {
    html += `<p>${ex.exerciseName}: ${ex.sets} sets × ${ex.reps} reps @ ${ex.weight}</p>`;
  });
  html += `<p><em>${recommendation.notes}</em></p>`;

  box.innerHTML = html;
  box.style.display = "flex";

  // Close button
  box.querySelector(".closeBtn").addEventListener("click", () => {
    box.style.display = "none";
  });
});

    

   
    

    renderCalendar();
});
