export class SessionItem{
    constructor(sessionDate){
        this.sessionDate = sessionDate;
        this.sessionList = [];
    }

    // Add an exercise to the session
    addExercise(exerciseData) {
    this.sessionList.push(exerciseData);
  }

}