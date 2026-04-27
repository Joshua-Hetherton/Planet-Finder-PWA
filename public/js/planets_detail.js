//import {getPlanetPosition, getPlanetPositionTime, getVisiblePlanets, moonPhase, findNextEclipse} from "./astronomy-calc.js";

//Get the planet name from URL to load correct data
const URL_Planet_Name= window.location.pathname.split("/").pop();

/*Calculates the users position/location
Either it can be inputted manually (lat and long, incase they arent are that location yet)
Or Done automaitcally with an API
*/

//Self Inputted location from the planet-info page
const ManualLocationButton= document.getElementById("submit-location")
ManualLocationButton.addEventListener("click", () => {
    const latitude= parseFloat(document.getElementById("lat-input").value);
    const longitude= parseFloat(document.getElementById("long-input").value);

    if (isNaN(latitude) || isNaN(longitude)) {
        alert("Enter a valid latitude and Longitude");
        return;
    }
    console.log ('Latitude:', latitude, 'longitude:', longitude);
    LoadPlanetData(latitude, longitude);
});


//Automatic Location with API
//Uses the Button id="Auto-Locate".
//Uses the Geolocation API to get the users position
const AutoLocationButton= document.getElementById("Auto-Locate");
AutoLocationButton.addEventListener("click", () => {
    if( "geolocation" in navigator ) {
        navigator.geolocation.getCurrentPosition( position => {
            const latitude= position.coords.latitude;
            const longitude= position.coords.longitude;
            console.log ('Latitude:', latitude, 'longitude:', longitude);
            document.getElementById("lat-input").value= latitude;
            document.getElementById("long-input").value= longitude;
            LoadPlanetData(latitude, longitude);
        });
    }
});

//Automatically sets the current date and time in the input field when the page loads
window.addEventListener("load", () => {
    const current_date_time=new Date();
    console.log(current_date_time);
    const date_time_arr=current_date_time.toISOString().split("T");
    document.getElementById("date-input").value=date_time_arr[0];
    document.getElementById("time-input").value=date_time_arr[1].split(".")[0];


});

//Uses async functions to load the data to display on the Page while still working in the background

async function LoadPlanetData(lat, long) {
    const planetName=URL_Planet_Name
    if(planetName!="moon"){
        console.log("Loading planet data for:", planetName);
        const retrieved_date=document.getElementById("date-input").value;
        const retrieved_time=document.getElementById("time-input").value;
        const retrieved_latitude= parseFloat(document.getElementById("lat-input").value);
        const retrieved_longitude= parseFloat(document.getElementById("long-input").value);

        //Merging date and time into single Date object for Planet position calcs
        const retrieved_date_time= new Date(`${retrieved_date}T${retrieved_time}`);

        console.log ("Date Time:", retrieved_date_time, "Latitude:", retrieved_latitude, "Longitude:", retrieved_longitude);

        //Loads and logs Planet Position Data
        const planet_position=getPlanetPosition(retrieved_latitude, retrieved_longitude, retrieved_date_time,planetName);
        console.log(planet_position);

        const planet_observable_time= getPlanetObserveableTime(retrieved_latitude, retrieved_longitude, retrieved_date_time, planetName);
        console.log(planet_observable_time);


    }
    else {
        console.log("Loading planet data for: moon");
    }
}

