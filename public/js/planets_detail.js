import {getPlanetPosition, getPlanetPositionTime, getVisiblePlanets, moonPhase, findNextEclipse} from "./astronomy-calc.js";

//Get the planet name from URL to load correct data
const URL_Planet_Name= window.location.pathname.split("/").pop();



//Uses async functions to load the data to display on the Page while still working in the background

async function LoadPlanetData(lat, long) {
    const planetName= URL_Planet_Name;

}


/*Calculates the users position/location
Either it can be inputted manually (lat and long, incase they arent are that location yet)
Or Done automaitcally with an API
*/

//Self Inputted location from the planet-info page
manualLocationButton.addEventListener("click", () => {
    const latitude= parseFloat(document.getElementById("latitude").value);
    const longitude= parseFloat(document.getElementById("longitude").value);

    if (isNaN(latitude) || isNaN(longitude)) {
        alert("Enter a valid latitude and Longitude");
        return;
    }
    LoadPlanetData(latitude, longitude)
});


//Automatic Location with API

