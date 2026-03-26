import * as Astronomy from 'astronomy-engine';

const planet_names= {
    'Mercury': Astronomy.Body.Mercury,
    'Venus': Astronomy.Body.Venus,
    'Earth': Astronomy.Body.Earth,
    'Mars': Astronomy.Body.Mars,
    'Jupiter': Astronomy.Body.Jupiter,
    'Saturn': Astronomy.Body.Saturn,
    'Uranus': Astronomy.Body.Uranus,
    'Neptune': Astronomy.Body.Neptune,
}
/*
Gets the current position of the planet, when given a time and location. 
Returns the position as an Azmiuth and Altitude to allow easy telescope pointing.
*/

function getPlanetPosition(latitude, longitude, date, planet_name) {
    /*Creates an observer, calculates the rest of the code given the users location.
    Height is set to 0 by default, unless a user wants to see planets high above sea level*/
    const observer= new Astronomy.Observer( latitude, longitude, height=0);

    const body= bodyMap[planet_name.tolowerCase()];

}

/*
gets rise, set and transit time when given a planet, date and location
*/
function getPlanetPositionTime(latitude, longitude, date, planet_name) {

    const observer= new Astronomy.Observer( latitude, longitude, height=0);

    const body= bodyMap[planet_name.tolowerCase()];

    /*Gets rise time 
    direction=1 refers to the east*/
    const rise_time= Astronomy.SearchRiseSet(body, observer, datestart=date, direction=1, horizon=0);
    /*Gets rise time 
    direction=-1 refers to the west*/
    const set_time=Astronomy.SearchRiseSet(body, observer, datestart=date, direction=-1, horizon=0);

    /*Gets transit time, how long it will be visible*/
   const transit_time=Astronomy.SearchHourAngle(body, observer, datestart=date, direction=1, horizon=0);

   //Finding culmination time, when it will be at its highest point in the sky (when the hour angle is 0)
   const culmination_time= Astronomy.SearchHourAngle(body, observer,hourAngle=0, datestart=date);

}

/*
Gets all currently visible planets from a given location

*/
function getVisiblePlanets(latitude, longitude, date) {

    const observer= new Astronomy.Observer( latitude, longitude, height=0);

    const body= bodyMap[planet_name.tolowerCase()];
}

function moonPhase(date) {
    const moon_phase_number= Astronomy.MoonPhase(date);
    switch (moon_phase_number)
    {
        case 0:
            return"New Moon";
        case 90:
            return"First Quarter";
        case 180:
            return"Full Moon";
        case 270:
            return"Third Quarter";
    }
}

/*
Finds the next 5 lunar eclipses from a given date
*/
function findNextEclipse(date) {
    eclipses_date=[];
    eclipses_date.push(Astronomy.SearchLunarEclipse(date));
    for (let i=0; i<5; i++) {
        eclipses_date.push(Astronomy.NextLunarEclipse(eclipses_date[i]));
    }
}

