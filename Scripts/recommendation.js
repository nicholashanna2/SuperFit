
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

  // List of exercises to recommend
  const exerciseList = ["Squat", "Bench Press", "Deadlift", "Shoulder Press", "Row"];

  const plan = exerciseList.map(name => {
    const stats = getExerciseStats(sessionList, name);

    if (!stats) {
      // Exercise not done before – recommend beginner weight
      return {
        exerciseName: name,
        sets: 3,
        reps: "10–12",
        weight: "5–20 lbs"
      };
    }

    // Increase load slightly if user is progressing
    const weight = parseFloat(stats.averageWeight);
    const newWeight = weight + 5; // progressive overload
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

const btn = document.getElementById("recommendBtn");
const box = document.getElementById("recommendationBox");

btn.addEventListener("click", () => {
  const user = JSON.parse(localStorage.getItem("superFitUser")) || {};
  const sessionList = JSON.parse(localStorage.getItem("superFitSessions")) || [];

  if (!user.Height || !user.Weight) {
    box.innerHTML = "<p>Please enter height and weight first.</p>";
    return;
  }

  const recommendation = personalizedWorkoutRecommendation(sessionList, parseFloat(user.Height), parseFloat(user.Weight));

  let html = `<button class="closeBtn">&times;</button><h3>Recommended Plan</h3>`;
  html += `<p><strong>Difficulty:</strong> ${recommendation.difficulty}</p>`;
  recommendation.exercises.forEach(ex => {
    html += `<p>${ex.exerciseName}: ${ex.sets} sets × ${ex.reps} reps @ ${ex.weight}</p>`;
  });
  html += `<p><em>${recommendation.notes}</em></p>`;

  box.innerHTML = html;
  box.style.display = "block";

  // Re-attach close event
  box.querySelector(".closeBtn").addEventListener("click", () => {
    box.style.display = "none";
  });
});

// Close button outside as backup
closeBtn.addEventListener("click", () => {
  box.style.display = "none";
});

