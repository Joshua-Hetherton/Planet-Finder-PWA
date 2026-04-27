

const planet_names= {
    'mercury' : Astronomy.Body.Mercury,
    'venus': Astronomy.Body.Venus ,
    'earth':  Astronomy.Body.Earth,
    'mars': Astronomy.Body.Mars,
    'jupiter': Astronomy.Body.Jupiter,
    'saturn': Astronomy.Body.Saturn,
    'uranus': Astronomy.Body.Uranus,
    'neptune' : Astronomy.Body.Neptune ,
}
/*
Gets the current position of the planet, when given a time and location. 
Returns the position as an Azmiuth and Altitude to allow easy telescope pointing.
*/
function getPlanetPosition(latitude, longitude, date, planet_name) {
    /*Creates an observer, calculates the rest of the code given the users location.
    Height is set to 0 by default, unless a user wants to see planets high above sea level*/
    const observer= new Astronomy.Observer( latitude, longitude, 0);

    const body= planet_names[planet_name.toLowerCase()];

    const equator=Astronomy.Equator(body, date, observer, true, true);
    const Horizon=Astronomy.Horizon(date, observer, equator.ra, equator.dec, 'normal');

    //Geo vector calculates position of selected planet relative to earths center, accounting for Aberration(either true or false)
    const position_Vecotr= Astronomy.GeoVector(body, date, true);

    //Calculates distance in KM then coverts to AU (Astronomical Units)
    const current_position=Math.sqrt(position_Vecotr.x**2 + position_Vecotr.y**2 + position_Vecotr.z**2)*Astronomy.KM_PER_AU;


    return {
        planet_name: planet_name,
        date: date.toISOString(),
        altitude: Horizon.altitude,
        azimuth: Horizon.azimuth,
        AU_distance: current_position,
        is_visible: Horizon.altitude > 0
    }

}

/*
gets rise, set and transit time when given a planet, date and location
*/
    function getPlanetObservableTime(latitude, longitude, date, planet_name) {

        const observer= new Astronomy.Observer( latitude, longitude, 0);

        const body= planet_names[planet_name.toLowerCase()];

        /*Gets rise time 
        direction=+1 refers to the east*/
        const rise_time= Astronomy.SearchRiseSet(body, observer, +1, date, 300, 0);
        /*Gets rise time 
        direction=-1 refers to the west*/
        const set_time=Astronomy.SearchRiseSet(body, observer, -1, date, 300, 0);

        /*Gets transit time, how long it will be visible*/
        const transit_time=Astronomy.SearchHourAngle(body, observer, +1, date);

        //Finding culmination time, when it will be at its highest point in the sky (when the hour angle is 0)
        const culmination_time= Astronomy.SearchHourAngle(body, observer,0, date);

        return {
            planet: planet_name,
            date: date.toISOString(),
            rise_time: rise_time,
            set_time: set_time,
            transit_time: transit_time,
            culmination_time: culmination_time

        }

    }

/*
Gets all currently visible planets from a given location

*/
function getVisiblePlanets(latitude, longitude, date) {

    const observer= new Astronomy.Observer( latitude, longitude, 0);


    const visible_planets= [];

    for (planet in planet_names) {
        const position= getPlanetPosition(latitude, longitude, date, planet)
        if (position.is_visible) {
            visible_planets.push(position);
        }

    }
    return{
        date:date.toISOString(),
        visible_planets: visible_planets,
    }
}

function moonPhase(date) {
    const moon_phase_number= Astronomy.MoonPhase(date);
    switch (moon_phase_number)
    {
        case moon_phase_number<45 || moon_phase_number>=310:
            return "New Moon";
        case  moon_phase_number>=45 && moon_phase_number<135:
            return"First Quarter";
        case  moon_phase_number>=135 && moon_phase_number<225:
            return"Full Moon";

        return "Third Quarter";
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
    //Add type of eclipse on eclipses
    return {
        eclipses: eclipses_date.map(eclipse => ({ date: eclipse.toISOString(),
             type: eclipses })),
    }
}


