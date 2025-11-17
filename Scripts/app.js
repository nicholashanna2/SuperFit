import { ExerciseItem } from './ExerciseItem.js';
import {SessionItem} from "./SessionItem.js";
import {SessionList} from "./SessionList.js";
import {StopWatch} from "./StopWatch.js";
import { ExerciseLibraryList } from './ExerciseLibraryList.js';

//get html elements
const stackContainer = document.querySelector('.exerciseStack');
const addExerciseBtn = document.querySelector('.addExerciseBtn');
const deleteExerciseBtn = document.querySelector(".deleteBtn");
const saveSessionBtn = document.querySelector('.saveSessionBtn');
const personalRecordBtn = document.querySelector(".pr");
const exerciseForm = document.querySelector('.exerciseForm');
const statusField = document.querySelector('.statusField');
const sessionBox = document.querySelector('.SessionBox');
const timer = document.querySelector('.timerGradient');
const startBtn = document.querySelector('.startSessionBtn');
const TimerText = document.getElementById("Timer");
const deleteSessionBtn = document.getElementById("deleteSessionBtn");
const timerStartBtn = document.querySelector(".timerStartBtn");
const timerStopBtn = document.querySelector(".timerStopBtn");
const timerResetBtn = document.querySelector(".timerResetBtn");
const datePicker = document.querySelector('.workout-date');

//initialize sessionslist, library list, and stopwatch
const sessionList = new SessionList();
const exerciseLibraryList = new ExerciseLibraryList();
const stopWatch = new StopWatch(60);
let activeState = false;



//timer constants
let timerInterval;
let elapsedSeconds = 0;




//main app
function main() {
  timerStartBtn.addEventListener('click', (e) => {
  stopWatch.startTimer();

})
 timerStopBtn.addEventListener('click', (e) => {
  stopWatch.stopTimer();

})
 timerResetBtn.addEventListener('click', (e) => {
  stopWatch.resetTimer();

})

  
   saveSessionBtn.addEventListener('click',(e)=>{
    e.preventDefault();

    // Read the selected date from the datepicker
    const selectedDate = document.querySelector('.workout-date').value;

    if (!selectedDate) {
        alert("Please select a date for your session.");
        return;
    }

    const savedSession = new SessionItem(selectedDate);
    alert(`Session saved for ${savedSession.sessionDate}`);
    sessionList.addSession(savedSession);

    // ADD each exercise to library if missing
    const allExercises = stackContainer.querySelectorAll("exercise-item");

    allExercises.forEach((item) => {
      const name = item.getAttribute("exercise-name");

      if (!exerciseLibraryList.items.includes(name)) {
        exerciseLibraryList.items.push(name);
      }
    });

    populateExerciseLibrary();
});
  

 function populateExerciseLibrary() {
    const container = document.querySelector('.exerciseList');
    container.innerHTML = '';

    exerciseLibraryList.items.forEach((exerciseName) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('exerciseLibraryItem');

      const nameDiv = document.createElement('div');
      nameDiv.textContent = exerciseName;

      const addBtn = document.createElement('button');
      addBtn.classList.add('exerciseLibraryAddBtn');
      addBtn.textContent = '+';

      addBtn.addEventListener('click', () => {
        console.log(`Added ${exerciseName}`);
      });

      itemDiv.appendChild(nameDiv);
      itemDiv.appendChild(addBtn);
      container.appendChild(itemDiv);
    });
  }

  addExerciseBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const name = exerciseForm.exerciseName.value;
    const sets = exerciseForm.sets.value;
    const reps = exerciseForm.reps.value;
    const time = exerciseForm.time.value;
    const exerciseTime = 0;
    const weight = exerciseForm.weight.value;

    // Check required fields
    if (!name) {
      alert("Please enter an exercise name.");
      return;
    }
    if (!reps) {
      alert("Please enter the number of reps.");
      return;
    }

    // Create and configure custom element
    const exerciseItem = document.createElement('exercise-item');
    exerciseItem.setAttribute('exercise-name', name);
    exerciseItem.setAttribute('sets',sets);
    exerciseItem.setAttribute('reps', reps);
    exerciseItem.setAttribute('time', time);
    exerciseItem.setAttribute("exerciseTime",exerciseTime);
    exerciseItem.setAttribute('weight', weight);
  
    // Add to stack
    stackContainer.append(exerciseItem);

    // Reset form
    exerciseForm.reset();
  });

  stackContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteBtn')) {
      const exerciseItem = e.target.closest('exercise-item');
      if (exerciseItem) {
        const confirmDelete = confirm('Are you sure you want to delete this exercise?');
        if (confirmDelete) exerciseItem.remove();
      }
    }
    if (e.target.classList.contains('completeBtn')) {
      const exerciseItem = e.target.closest('exercise-item');
      if (!exerciseItem) return;

      const sessionIsActive = sessionBox.classList.contains("activeSession");
      const btn = e.target;
      
      if(activeState == true){
        btn.textContent = "Complete";

      } else if (activeState == false){
          btn.textContent = "Start Exercise";
      }
    }

   
  });
 


  
  startBtn.addEventListener('click', (e) => {
      const isActive = sessionBox.classList.contains('activeSession');
       clearInterval(timerInterval);
    if (!isActive) {
        // Start session
        sessionBox.classList.add('activeSession');
        timer.classList.add('activeSession');
        startBtn.textContent = "End Session";
        statusField.textContent = "Active"
        activeState = true;

        
        // Reset counter
        elapsedSeconds = 0;

        // Update timer every second
        timerInterval = setInterval(() => {
            elapsedSeconds++;

            // Convert seconds to days, hours, minutes, seconds
            const days = Math.floor(elapsedSeconds / (60 * 60 * 24));
            const hours = Math.floor((elapsedSeconds % (60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((elapsedSeconds % (60 * 60)) / 60);
            const seconds = elapsedSeconds % 60;

            // Display timer
            timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);


    } else {
        // End session
        clearInterval(timerInterval);
        sessionBox.classList.remove('activeSession');
        timer.classList.remove('activeSession');
        startBtn.textContent = "Start Session";
        statusField.textContent = "Inactive"
        activeState = false;
       
    }
  
});


document.addEventListener('DOMContentLoaded', () => {
  const stackContainer = document.querySelector('.exerciseStack');
  const deleteSessionBtn = document.querySelector('.deleteSessionBtn');

  deleteSessionBtn.addEventListener('click', () => {
    const confirmDelete = confirm('Delete all exercises from this session?');
    if (!confirmDelete) return;

    // Clear only the session stack
    stackContainer.innerHTML = '';
  });
});


}

main();
