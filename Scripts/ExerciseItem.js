export class ExerciseItem extends HTMLElement {
  constructor() {
    super();
  }




  connectedCallback() {
    // Read values from attributes
    const exerciseName = this.getAttribute('exercise-name') || "Unnamed";
    const sets = this.getAttribute('sets') || "_________";
    const reps = this.getAttribute('reps') || "_________";
    const time = this.getAttribute('time') || "_________";
    const exerciseTime = this.getAttribute("exerciseTime")||"00:00:00";
    const weight = this.getAttribute('weight') || "_________";

  this.innerHTML = `
  <div class="ExerciseItem">
    <div class="exercise-field">
      <div class="label">Exercise</div>
      <span class="exercise-name">${exerciseName}</span>
    </div>
    <div class="exercise-field">
      <div class="label">Sets</div>
      <span contenteditable="true" class="exercise-sets">${sets}</span>
    </div>
    <div class="exercise-field">
      <div class="label">Reps</div>
      <span contenteditable="true" class="exercise-reps">${reps}</span>
    </div>
    <div class="exercise-field">
      <div class="label">Time</div>
      <span contenteditable="true" class="exercise-time">${time}</span>min
    </div>
    <div class="exercise-field">
      <div class="label">Weight</div>
      <span contenteditable="true" class="exercise-weight">${weight} </span>lb
    </div>


    <div class="exercise-field">
        <div class="label">Note</div>
        <span contenteditable="true" class="exercise-note">______</span>
      </div>
      
      <div class="exercise-field">
        <button class="completeBtn"">Start Exercise</button>
        <span class ="exerciseTime">${exerciseTime}</span> 
      </div>

      <div class="exercise-field">
        <button class="deleteBtn">Remove</button>
      </div>
     
    
  </div>
`;

  }
}

customElements.define('exercise-item', ExerciseItem);
