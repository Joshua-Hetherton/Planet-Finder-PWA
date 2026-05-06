let current_date=new Date();
let current_month=current_date.getMonth();
let current_year=current_date.getFullYear();

async function updateCalendarMonthTitle() {
    const month_title=document.getElementById("Calendar-title");
    const month_name= current_date.toLocaleString("default", {month:"long"});

    month_title.textContent= `${month_name}, ${current_year}`;
}

async function generateCalendar() {
    const grid=document.getElementById("grid-calendar");
    grid.innerHTML="";
    //Gets days in month by using getDate() to look at first day of new month
    const month_days= new Date(current_year, current_month + 1, 0).getDate();
    const first_day= new Date(current_year, current_month, 1);

    //Adjusts start day to match calendar format, putting blank spaces in before first day of the month
    let start_day_index=(first_day.getDay()+6 )% 7;

    for(i=0; i<start_day_index; i++) {
        const empty_cell=document.createElement("div");
        empty_cell.classList.add("day", "empty");
        grid.appendChild(empty_cell);
    }

    //Filling calendar with days
    for( day=1; day<=month_days; day++) {
        const day_cell=document.createElement("div");
        day_cell.classList.add("day");
        day_cell.innerHTML=`<div class="date"> ${day} </div>`;
        grid.appendChild(day_cell);
    }

    updateCalendarMonthTitle();
}


document.getElementById("Previous-Month").addEventListener("click", () => {
    current_month--;
    if (current_month <0) {
        current_month=11;
        current_year--;
    }
    generateCalendar();
});

document.getElementById("Next-Month").addEventListener("click", () => {
    current_month++;
    if (current_month >11) {
        current_month=0;
        current_year++;
    }
    generateCalendar();
});

document.getElementById("Today").addEventListener("click", () => {
    current_date=new Date()
    current_Month=current_date.getMonth();
    current_year=current_date.getFullYear();

    generateCalendar();
});

document.getElementById("submit-information").addEventListener("click", () => {

});

document.getElementById("close-editor").addEventListener("click", () => {

});

