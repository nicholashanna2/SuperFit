import { ExerciseItem } from './ExerciseItem.js';

// Select the container that holds all library exercises
const container = document.querySelector('.exerciseList');
const stackContainer = document.querySelector('.exerciseStack');
// Select all "+" buttons inside the exercise library
const addExerciseBtn= document.querySelectorAll('.exerciseLibraryAddBtn');


export class ExerciseLibraryList {
  constructor() {
    this.items = [];
  }
}


document.querySelector('.exerciseList').addEventListener('click', (e) => {
    // Only run when the EXACT target is the add button
  if (!e.target.classList.contains('exerciseLibraryAddBtn')) {
    return; // ignore all other clicks
  }
      // Get the name that belongs to THIS specific library item
    const exerciseName = e.target.previousElementSibling.textContent.trim();
    // handle adding a new ExerciseItem
    const exerciseItem = document.createElement('exercise-item');
    exerciseItem.setAttribute('exercise-name', exerciseName);
    exerciseItem.setAttribute('sets', '');
    exerciseItem.setAttribute('reps', '');
    exerciseItem.setAttribute('time', '');
    exerciseItem.setAttribute('exerciseTime', '0');
    exerciseItem.setAttribute('weight', '');

    stackContainer.appendChild(exerciseItem);
  
});


 