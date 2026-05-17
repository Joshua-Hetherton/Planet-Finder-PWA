# Planet Finder PWA

Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [How to Navigate the App](#how-to-navigate-the-app)
- [Features](#features)

Overview
-------------
Planet Finder is a Progressive Web App (PWA) that allows users to learn and explore the planets in the solar system. The app provides detailed characteristics about each planet, as well as the relevant information to view the planet. To do this, users can input their desired date, time and location, and the app will show all available information. The app also has a calendar feature to allow users to log which planet they may have seen, as well as any additional notes. This PWA can work both offline and online, so users can still view important information at any location.

Prerequisites
-------------
- Node.js
- npm
- Express.js

Dependencies
-------------
- Chalk
- Debug
- Morgan
# APIs used:
- Astronomy Engine (https://github.com/cosinekitty/astronomy)
- GeoLocation API (https://developer.mozilla.org/en-US/docs/Web/API/Geolocation)
- Le Solaire Systeme API (https://api.le-systeme-solaire.net/en/)
- Nasa Image API (https://api.nasa.gov/)

Installation
-------------
1. Clone the Repo or Download the Zip file (WARNING: If you clone the repo, the .env is not included, so No API keys will be available!).
2. Before running the app, make sure to install any prerequisites
3. Run 'npm install' in the project directory to install any dependencies.
4. Run 'npm start' to start the server.
5. Navigate to 'http://localhost:5000' in any web browser

How to Navigate the App
-------------
- Home Page: From the Home page, you can navigate to any of the planets to view or get information about them. You can either use the image tiles to navigate to the planet info pages, or use the dropdown menu in the navigation bar.
- Planet Info Pages: Each planet has its own dynamic page that displays any information about the planet that is available from the Astronomy Engine API. Either input your location manually, or use the Geolocation API for your current location. Relevant information will then be displayed
- Calendar Page: The calendar page allows you to view which planets are visible in the sky at most given dates, times and locations. By clicking on any day, you can add to your viewing calendar, which will be saved to MongoDB and can be viewed on the calendar page. Information can be updated or deleted when reselecting. WARNING: If offline, the calendar will not be able to update or create new entries, but you can still view any existing calendar entries.


Features
-------------
- Ability to select a planet and view any information about it.
- Ability to input a date, time, and location to find out which planets are visible in the sky at that moment.
- Dynamic Rise/Set times, transit/culmination times, and azimuth/elevation angles for each planet based on the user's input.
- A Responsive design to work with both Desktop and Mobile devices
- Fun Facts
- Dynamic Calendar
- Offline functionality using Service Workers