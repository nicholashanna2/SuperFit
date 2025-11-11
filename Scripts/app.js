import { ExerciseItem } from './ExerciseItem.js';
import {SessionItem} from "./SessionItem.js";
import {SessionList} from "./SessionList.js";
import {StopWatch} from "./StopWatch.js";

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


const sessionList = new SessionList();
const stopWatch = new StopWatch();
let timerInterval;
let elapsedSeconds = 0;

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
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; 
    const savedSession = new SessionItem(formattedDate);
    alert(`Session saved for ${savedSession.sessionDate.toString()}`);
    sessionList.addSession(savedSession);



})


  addExerciseBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const name = exerciseForm.exerciseName.value;
    const sets = exerciseForm.sets.value;
    const reps = exerciseForm.reps.value;
    const time = exerciseForm.time.value;
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
     if (e.target.classList.contains('.pr')) {
      const exerciseItem = e.target.closest('exercise-item');
      if (exerciseItem) {
        search 
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
       
    }
  
});


deleteSessionBtn.addEventListener('click',(e)=>{
    e.preventDefault(); // Prevent form submission or reload
  const confirmDelete = confirm('Delete all exercises from this session?');
  if (!confirmDelete) return;

  // Clear all exercise items
  stackContainer.innerHTML = '';
})




}

main();
