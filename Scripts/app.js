import { ExerciseItem } from './ExerciseItem.js';
import { SessionItem } from './SessionItem.js';
const stackContainer = document.getElementsByClassName('exerciseStack');
const addExerciseBtn = document.getElementsByClassName('addExerciseBtn');
const exerciseForm = document.getElementsByClassName('exerciseForm');

function main() {

//Add a new exercise each time the button is clicked
addExerciseBtn.addEventListener('click', () => {
  // Create a new exercise-item element in the html
  const exerciseItem = document.createElement('exercise-item');
  const exerciseData = {
      name: exerciseForm.exerciseName.value,
      reps: exerciseForm.reps.value,
      time: exerciseForm.time.value,
      weight: exerciseForm.weight.value,
    };




  
  // Reset the form
  exerciseForm.reset();
});

  main();
}
