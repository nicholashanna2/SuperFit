export class ExerciseItem extends HTMLElement{
    constructor(exerciseName,reps,time, weight, ){
        super();
        this.exerciseName = exerciseName;
        this.reps = reps;
        this.time = time;
        this.weight = weight;
    }
    connectedCallback() {
    // This method is called when the custom element is connected to the DOM
    // Define the component's HTML structure and content here
    this.innerHTML =  `
      <div class="ExerciseItem">
         <span class="exercise-name">${this.exerciseName || "Unnamed"}</span>
        <span class="exercise-reps">${this.reps || "-"}</span>
        <span class="exercise-time">${this.time || "-"}</span>
        <span class="exercise-weight">${this.weight || "-"}</span>
      </div>
    `;
  }
}



customElements.define('exercise-item', ExerciseItem);

