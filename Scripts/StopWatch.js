export class StopWatch  {
  constructor() {
    this.timerInterval = null;
    this.elapsedSeconds = 0;
  }
      startTimer(){

        clearInterval(this.timerInterval);
      


        const timer = document.querySelector(".timerDisplay");
        const hrEl = document.getElementById("hr");
        const minEl = document.getElementById("min");
        const secEl = document.getElementById("sec");


        
        // Update timer every second
        this.timerInterval = setInterval(() => {
        this.elapsedSeconds++;

        // Convert seconds to days, hours, minutes, seconds
                    
        const hr = Math.floor((this.elapsedSeconds % (60 * 60 * 24)) / (60 * 60));
        const min = Math.floor((this.elapsedSeconds % (60 * 60)) / 60);
        const sec = this.elapsedSeconds % 60;

        // Update display
        hrEl.textContent = hr.toString().padStart(2, "0");
        minEl.textContent = min.toString().padStart(2, "0");
        secEl.textContent = sec.toString().padStart(2, "0");

        }, 1000);
      }
    

      stopTimer(){
          clearInterval(this.timerInterval);
          this.timerInterval = 0;



      }

      resetTimer(){
          clearInterval(this.timerInterval);
          this.elapsedSeconds = 0;

          document.getElementById("sec").innerHTML = "00";
          document.getElementById("min").innerHTML = "00";
          document.getElementById("hr").innerHTML = "00";


          

      }
      
}



