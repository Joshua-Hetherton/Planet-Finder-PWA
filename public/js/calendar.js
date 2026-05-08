let current_date=new Date();
let current_month=current_date.getMonth();
let current_year=current_date.getFullYear();

async function updateCalendarMonthTitle() {
    const month_title=document.getElementById("Calendar-title");
    const month_name= new Date(current_year, current_month).toLocaleDateString("default", {month: "long"});

    month_title.textContent= `${month_name}, ${current_year}`;
}

//Higghlighter function for when the user clicks "Today"
async function highlightCurrentDay() {
    const today=new Date();
    //Highlight exact day and year on calendar
    if (today.getMonth()== current_month && today.getFullYear()== current_year) {
        const day_cells=document.querySelectorAll(".day");

        day_cells.forEach(cell => {
            const day_cell=cell.querySelector(".date");
            if (day_cell) {
            const cell_day=parseInt(day_cell.textContent);
                

                if (cell_day === today.getDate()) {
                    cell.classList.add("highlight-today");
                    cell.id="today";

                }
                else {
                    cell.classList.remove("highlight-today");
                    if (cell.id== "today") {
                        cell.removeAttribute("id");
                    }
                }
            }
        })
    }
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
        day_cell.innerHTML=`<div class="date"> ${day}</div>`;

        //Adds event listener for when they click on the specific date
        day_cell.addEventListener("click", () => {
            OpenEditor(day, current_month, current_year);
        })


        grid.appendChild(day_cell);
    }

    updateCalendarMonthTitle();
    highlightCurrentDay();
}
// All buttons for Calendar navigation and editing the days

document.getElementById("Previous-Month").addEventListener("click", () => {
    current_month--;
    if (current_month <0) {
        current_month=11;
        current_year--;
    }
    generateCalendar();
    highlightCurrentDay();
});

document.getElementById("Next-Month").addEventListener("click", () => {
    current_month++;
    if (current_month >11) {
        current_month=0;
        current_year++;
    }
    generateCalendar();
    highlightCurrentDay();
});

document.getElementById("Today").addEventListener("click", () => {
    current_date=new Date()
    current_month=current_date.getMonth();
    current_year=current_date.getFullYear();

    generateCalendar();
    highlightCurrentDay();
});

generateCalendar();
// Editor Section

async function OpenEditor(day, month, year) {
    Editor.style.visbility = "visible";
    Editor.classList.remove("hidden");

    const date=new Date(year, month, day);

    const format_date= date.toLocaleDateString("en-GB", {
        "weekday": "long",
        "day": "numeric",
        "month": "long",
        "year": "numeric"
    });
    

}



document.getElementById("submit-information").addEventListener("click", () => {

});

document.getElementById("close-editor").addEventListener("click", () => {

});
