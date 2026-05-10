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
    for( let day=1; day<=month_days; day++) {
        const day_cell=document.createElement("div");
        day_cell.classList.add("day");
        day_cell.innerHTML=`<div class="date"> ${day}</div>`;

        //uses padding to get the correct format (DDMMYYYY)
        const convertdate_to_string= `${current_year}-${String(current_month +1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        day_cell.setAttribute("data-date", convertdate_to_string);

        //Adds event listener for when they click on the specific date
        day_cell.addEventListener("click", () => {
            OpenEditor(day, current_month, current_year, convertdate_to_string);
        })


        grid.appendChild(day_cell);
    }


    //Finding any Filled entries given by user(id 1 by default)
    const entries=await fetchMongoEntries();
    entries.forEach(entry => {
        const entry_retrieved_date= entry.date
        const given_date=document.querySelector(`[data-date="${entry_retrieved_date}"]`)
        if(given_date) {
            given_date.classList.add("existing-entry");

        }    
    });

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

async function OpenEditor(day, month, year,date_string) {
    const Editor=document.getElementById("Editor");
    Editor.style.visibility="visible";
    Editor.classList.remove("hidden");
    console.log("Chosen Date:", day);
    const time=new Date();
    const date=new Date(year, month, day, time.getHours(), time.getMinutes(), time.getSeconds());
    console.log("Clicked Date:",date);

    const format_date= date.toLocaleDateString("en-GB", {
        "weekday": "long",
        "day": "numeric",
        "month": "long",
        "year": "numeric"
    });

    //Uses Geolocation API automatically, (no user input)(apart from them allowing access)
    if( "geolocation" in navigator ) {
        navigator.geolocation.getCurrentPosition( position => {
            const latitude= position.coords.latitude;
            const longitude= position.coords.longitude;

            const return_planets_visible=getVisiblePlanets(latitude, longitude, date);
            const planets_visible=return_planets_visible.visible_planets.map (planet => {
                //Converts to title case
                planet.planet_name= planet.planet_name.charAt(0).toUpperCase() + planet.planet_name.slice(1);
                return planet;
            })
            
            console.log(planets_visible);

            const planet=document.getElementById("planet-view-tags");
            planet.innerHTML = "";
            for (let i=0; i<planets_visible.length;i++) {
                const planet_option=document.createElement("option");
                planet_option.innerHTML=planets_visible[i].planet_name;
                planet.appendChild(planet_option);
            }

        });
    }

    //Fills data in if there is a record in MongoDB
    window.selectedDate=date_string;
    const entries=await fetchMongoEntries();
    const entry_for_date=entries.find(entry => {
        MongoDB_date=new Date(entry.date);
        const entry_date_to_string= MongoDB_date.toISOString().split("T")[0];
        return entry_date_to_string===date_string;

    });
    if(entry_for_date) {
        document.getElementById("planet-view-tags").value=entry_for_date.planet_observed || entry_for_date.planet_viewed || "";
        document.getElementById("equipment-used").value=entry_for_date.equipment_used|| "";
        document.getElementById("viewing-location").value=entry_for_date.viewing_location || "";
        document.getElementById("user-notes").value=entry_for_date.user_notes|| "";
    }
    else {
        document.getElementById("planet-view-tags").value="";
        document.getElementById("equipment-used").value="";
        document.getElementById("viewing-location").value="";
        document.getElementById("user-notes").value="";
    }

}
//Addds to MongoDB when submitting information
document.getElementById("submit-information").addEventListener("click", () => {
    const planet_selected=document.getElementById("planet-view-tags").value;
    const equipment_used=document.getElementById("equipment-used").value;
    const viewing_location=document.getElementById("viewing-location").value;
    const user_notes=document.getElementById("user-notes").value;

    createNewEntry();
});

document.getElementById("close-editor").addEventListener("click", () => {
    const Editor=document.getElementById("Editor");
    Editor.style.visibility="hidden";
    Editor.classList.add("hidden");
});

document.getElementById("delete-entry").addEventListener("click", () => {
    deleteEntry(window.selectedDate);
});

document.getElementById("update-entry").addEventListener("click", () => {
    updateEntry(window.selectedDate);
});

//MongoDB Functions/Requests
async function fetchMongoEntries() {
    const response= await fetch("/api/entries");
    const entries= await response.json();
    console.log("Entries Retrieved:", entries);
    return entries;
}

async function createNewEntry() {
    const entry_body= {
        user_id: "1",
        date: window.selectedDate,
        planet_observed: document.getElementById("planet-view-tags").value,
        equipment_used: document.getElementById("equipment-used").value,
        viewing_location: document.getElementById("viewing-location").value,
        user_notes: document.getElementById("user-notes").value
    };
    await fetch("/api/entries", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry_body)
    });
    location.reload();
}

async function updateEntry(entry_id) {
    const entry_body= {
        user_id: "1",
        date: window.selectedDate,
        planet_observed: document.getElementById("planet-view-tags").value,
        equipment_used: document.getElementById("equipment-used").value,
        viewing_location: document.getElementById("viewing-location").value,
        user_notes: document.getElementById("user-notes").value
    };
    await fetch(`/api/entries/${entry_id}`, {
        method:"PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry_body)
    });
    location.reload();
}

async function deleteEntry(entry_id) {
    await fetch(`/api/entries/${entry_id}`, {
        method:"DELETE"
    });
    location.reload();
}
//
