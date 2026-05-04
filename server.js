require('dotenv').config();

const app = require('./app');
const chalk = require('chalk');
const debug = require('debug')('app');
const PORT = process.env.PORT || 5000;

app.get("/api/planet-info", async (request, resp) => {
    const planetName=request.query.planetName;

    if (!planetName)
        return resp.status(400).json({ error:" Missing Planet Name. Required Field planetName"});
    try{
        //LE_SYSTEME_SOLAIRE_API
        const response= await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${planetName.toLowerCase()}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.LE_SYSTEME_SOLAIRE_API_KEY}`}
        });
        // Nasa API for Images
        const nasa_response=await fetch(`https://images-api.nasa.gov/search?q=${planetName}%20planet&page=1`); 

        if (!response.ok || !nasa_response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        const le_solaire=await response.json();
        const nasa_images_data=await nasa_response.json();

        resp.json({le_solaire, nasa_images_data });


    }
    catch (error)
    {
        console.error("Error gathering/fetching the data from Planet API:", error.message);
        resp.status(500).json({error: "Failed to fetch the planet chareristics data."})
    }

});



app.listen(PORT, () => {
    console.log(`Server is running on port ${chalk.green(PORT)}`);
    debug("Current:", process.env.NODE_ENV)
    console.log(chalk.blue(`http://localhost:${PORT}`));
});

    