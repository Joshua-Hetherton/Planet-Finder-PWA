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
    const retrieved_date=document.getElementById("date-input").value;
    const retrieved_time=document.getElementById("time-input").value;
    const retrieved_latitude= parseFloat(document.getElementById("lat-input").value);
    const retrieved_longitude= parseFloat(document.getElementById("long-input").value);

    //Merging date and time into single Date object for Planet position calcs
    const retrieved_date_time= new Date(`${retrieved_date}T${retrieved_time}`);

    console.log ("Date Time:", retrieved_date_time, "Latitude:", retrieved_latitude, "Longitude:", retrieved_longitude);


    if(planetName!="moon"){
        console.log("Loading planet data for:", planetName);

        //Loads and logs Planet Position Data
        const planet_position=getPlanetPosition(retrieved_latitude, retrieved_longitude, retrieved_date_time,planetName);
        console.log(planet_position);

        const planet_observable_time= getPlanetObservableTime(retrieved_latitude, retrieved_longitude, retrieved_date_time, planetName);
        console.log(planet_observable_time);

        // Reformats the data for easier viewing ond display page
        const rephrased_planet_position= {
            "At Date: ": `${retrieved_date_time}`,
            "Alitude: ": `${planet_position["altitude"].toFixed(2)} °`,
            "Azimuth ": `${planet_position["azimuth"].toFixed(5)} °`,
            "Current Visible: ": `${ planet_position["is_visible"] ? "yes" : "no" }`,
            "Current AU Distance:": `${planet_position["AU_distance"].toFixed(2)} AU`,
            
            };

        const rephrased_planet_Observable_time= {
            "At Date": `${retrieved_date_time}`,
            "Rise Time: ": (ReformatDateTime(planet_observable_time["rise_time"]) ? planet_observable_time["rise_time"]: "N/A"),
            "Set Time: ": (ReformatDateTime(planet_observable_time["set_time"]) ? planet_observable_time["set_time"]: "N/A"),
            "Transit Time: ": (ReformatDateTime(planet_observable_time["transit_time"]) ? planet_observable_time["transit_time"] : "N/A"),
            "Culmination Time: ": (ReformatDateTime(planet_observable_time["culmination_time"]) ?planet_observable_time[ "culmination_time"]: "N/A"),
        };




        await UniversalGridUpdate("PlanetOrbit", rephrased_planet_position);
        await UniversalGridUpdate("Rise-And-Set", rephrased_planet_Observable_time);
        /*Todo Universal Grid Update for Fun Facts. Possibly use a Nasa API for fun facts about a selected planet
        Either Use:
            -https://api.le-systeme-solaire.net/en/ Lots of facts
            -https://api-ninjas.com/api/planets Less facts but easier

        Use the nasas API to get a potential Image of the planet, or to display pictures from that planet. Could also use the Mars Weather Data.
        */
        /*Use the API to fill in the orbital information, Planet Characteristics, and Fun Facts */
        const API_planet_data=await GetPlanetCharacteristics(planetName);
        const cleaned_planet_data=await CleanPlanetCharacteristics(API_planet_data.le_solaire);
            console.log(API_planet_data);
            console.log(cleaned_planet_data);
            await UniversalGridUpdate("Orbital-Information", cleaned_planet_data.cleaned_data);

        
        switch (planetName.toLowerCase()) {
            case "mercury":
                await UniversalGridUpdate("Fun-Facts", {GetRandomPlanetImage: API_planet_data.nasa_images_data.collection.items[0].links[0].href});
                break;
            case "venus":
                await UniversalGridUpdate("Fun-Facts", {});
                break;
            case "mars":
                await UniversalGridUpdate("Fun-Facts", {});
                break;
            case "jupiter":
                await UniversalGridUpdate("Fun-Facts", {});
                break;
            case "saturn":
                await UniversalGridUpdate("Fun-Facts", {});
                break;
            case "uranus":
                await UniversalGridUpdate("Fun-Facts", {});
                break;
            case "neptune":
                await UniversalGridUpdate("Fun-Facts", {});
                break;
            default:
                console.log(`No additional information for ${planetName}`);
        }

    }
    else {
        console.log("Loading planet data for: moon");
        const moon_position= getPlanetPosition(retrieved_latitude,retrieved_longitude, retrieved_date_time, planetName);
        console.log(moon_position);

        const moon_observable_time= getPlanetObservableTime(retrieved_latitude, retrieved_longitude, retrieved_date_time, planetName);
        console.log(moon_observable_time);

        const current_moon_phase= moonPhase(retrieved_date_time);
        console.log("Current Moon Phase:", current_moon_phase);

        const next_5_lunar_eclipse= findNextEclipse(retrieved_date_time);
        console.log("Next 5 Lunar Eclipses:", next_5_lunar_eclipse);

        const planet_position=getPlanetPosition(retrieved_latitude, retrieved_longitude, retrieved_date_time,planetName);
        console.log(planet_position);

        const planet_observable_time= getPlanetObservableTime(retrieved_latitude, retrieved_longitude, retrieved_date_time, planetName);
        console.log(planet_observable_time);

        // Reformats the data for easier viewing ond display page
        const rephrased_planet_position= {
            "At Date: ": `${retrieved_date_time}`,
            "Alitude: ": `${planet_position["altitude"].toFixed(2)} °`,
            "Azimuth ": `${planet_position["azimuth"].toFixed(5)} °`,
            "Current Visible: ": `${ planet_position["is_visible"] ? "yes" : "no" }`,
            "Current AU Distance:": `${planet_position["AU_distance"].toFixed(2)} AU`,
            
            };

        const rephrased_planet_Observable_time= {
            "At Date": `${retrieved_date_time}`,
            "Rise Time: ": (ReformatDateTime(planet_observable_time["rise_time"]) ? planet_observable_time["rise_time"]: "N/A"),
            "Set Time: ": (ReformatDateTime(planet_observable_time["set_time"]) ? planet_observable_time["set_time"]: "N/A"),
            "Transit Time: ": (ReformatDateTime(planet_observable_time["transit_time"]) ? planet_observable_time["transit_time"] : "N/A"),
            "Culmination Time: ": (ReformatDateTime(planet_observable_time["culmination_time"]) ?planet_observable_time[ "culmination_time"]: "N/A"),
        };

        const API_planet_data=await GetPlanetCharacteristics(planetName);
        const cleaned_planet_data=await CleanPlanetCharacteristics(API_planet_data.le_solaire);
            console.log(API_planet_data);
            console.log(cleaned_planet_data);
            await UniversalGridUpdate("Orbital-Information", cleaned_planet_data.cleaned_data);

        await UniversalGridUpdate("PlanetOrbit", rephrased_planet_position);
        await UniversalGridUpdate("Rise-And-Set", rephrased_planet_Observable_time);
        // Adds the next moon phase and lunar eclipses with the cleaned_planet_date from le solaire

        await UniversalGridUpdate("Orbital-Information", { "Current Moon Phase": current_moon_phase, "Next 5 Lunar Eclipses": next_5_lunar_eclipse, ...cleaned_planet_data.cleaned_data});
        // await UniversalGridUpdate("Orbital-Information", next_5_lunar_eclipse);
        


    }
}

async function UniversalGridUpdate(id, data) {
    const grid_update= document.getElementById(id);
    grid_update.innerHTML="";

    for (let key in data) {
        tile= document.createElement("div");
        tile.classList.add ("info-tile");
        tile.innerHTML=`<strong> ${key}: </strong> ${data[key]}`;
        
        grid_update.appendChild(tile);
    }

}

async function ReformatDateTime(date_time) {
    const date= new Date(date_time);
    const new_date={year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"};

    return date.toLocaleDateString("en-GB", new_date);
}

async function GetPlanetCharacteristics(planetName) {
    const response= await fetch(`/api/planet-info?planetName=${planetName}`);
    return response.json();
}
async function CleanPlanetCharacteristics(planet_Data) {
    cleaned_data= {
        "Gravity": `${planet_Data.gravity} m/s²`,
        "Density": `${planet_Data.density} g/cm³`,
        "Mass": planet_Data.mass ? `${planet_Data.mass.massValue}x 10^${planet_Data.mass.massExponent}` : "N/A",
        "Mean Radius": `${planet_Data.meanRadius} km`,
        "Polar Radius": `${planet_Data.polarRadius} km`,
        "Equatorial Radius": `${planet_Data.equaRadius} km`,
        "Aphelion": `${planet_Data.aphelion} km`,
        "Perihelion": `${planet_Data.perihelion} km`,
        "Inclination": `${planet_Data.inclination} °`,
        "Eccentricity": `${planet_Data.eccentricity}`,
        "Sideral Orbit Period": `${planet_Data.sideralOrbit} days`,
        "Rotation Period": `${planet_Data.sideralRotation} hours`,
        "Average Temperature": `${planet_Data.avgTemp} K`,
        "Moons": `${planet_Data.moons ? planet_Data.moons.length :"No Moons"}`,
        "Discovered By": `${planet_Data.discoveredBy || "N/A"}`,
        "Discovery Date": `${planet_Data.discoveryDate || "N/A"}`,
        "Escape Velocity": `${planet_Data.escape} m/s`,
        
    }
    return {
        cleaned_data
    }
}

async function GetRandomPlanetImage(planetName) {
    const response= await fetch(`/api/planet-info?planetName=${planetName}`).nasa_images_data.collection.items;

    //Finds random image by selecting random index of array in collection images from nasa_images_data
    const pick_random_image= response[Math.floor(Math.random() * response.length)].links[0].href
    const random_image_response =await fetch(pick_random_image);
    const random_image= await random_image_response.json();

    return random_image;




}