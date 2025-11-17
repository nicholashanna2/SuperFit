export class SessionItem{
    constructor(sessionDate){
        this.sessionDate = sessionDate;
        this.exerciseList = [];
        
    }

    // Add an exercise to the session
    addExercise(exerciseData) {
    this.exerciseList.push(exerciseData);
  }

}