class horizontalDatePicker{
    constructor(currentMonth,currentWeekday,currentDay){
        this.currentMonth = currentMonth;
        this.currentWeekday = currentWeekday;
        this.currentDay = currentDay;
        this.date = new Date();
        this.date.setMonth(this.currentMonth);
        this.date.setDate(this.currentDay);

    
  // DOM references
        this.monthLabel = document.querySelector('.monthLabel');
        this.prevMonthBtn = document.querySelector('.prevMonthBtn');
        this.nextMonthBtn = document.querySelector('.nextMonthBtn');
        this.dayPicker = document.querySelector('.dayPicker');
    }



}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const currentMonth = today.getMonth(); // 0-11
const currentWeekday = today.getDay(); // 0-6
const currentDay = today.getDate(); //
const date = new Date();
const datePicker = new horizontalDatePicker(currentMonth,currentWeekday,currentDay); // November 9
