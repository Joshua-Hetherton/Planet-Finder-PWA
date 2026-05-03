require('dotenv').config();

const app = require('./app');
const chalk = require('chalk');
const debug = require('debug')('app');
// const fetch= require("node-fetch");
const PORT = process.env.PORT || 5000;

app.get("/api/planet-info", async (request, resp) => {
    const planetName=request.query.planetName;

    if (!planetName)
        return resp.status(400).json({ error:" Missing Planet Name. Required Field planetName"});
    try{
        const response= await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${planetName.toLowerCase()}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.LE_SYSTEME_SOLAIRE_API_KEY}`}
        });
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        const gathered_data=await response.json();
        resp.json(gathered_data);

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

    