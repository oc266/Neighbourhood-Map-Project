# Neighborhood Map Project
This project is part of Udacity's Front End Nanodegree Scholarship.
The project definition was to create a single page web application which would show locations of my choosing on a map of my choosing. The locations were required to be marked with markers which when clicked display infowindows, and to also be shown in a searchable list elsewhere on the page. The markers and the list are linked in that conducting a search of the list will filter both the items in the list and the markers and also in that clicking on a list item will display the infowindow of the corresponding marker.
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Installing from source
1. Clone the following repo:
 * https://github.com/oc266/Neighbourhood-Map-Project
2. Install all project dependencies with `npm install`
3. Start the development server with `npm start`

## What the app does
*The app shows a map (fetched from Google Maps API) of London with the location of football stadiums for teams currently in the Premier League or the Championship.
*When each of the markers showing these stadiums is clicked, it bounces once and an infowindow is brought up which provides a snippet of information, fetched from Wikipedia, about the stadium and a link to the main Wikipedia article about the stadium.
*As well as the markers on the map, there is also a list of the stadiums in a sidebar. The sidebar is always on show in large windows, but for small windows is hidden until the hamburger icon in the header is clicked.
*The sidebar contains a list of all the stadiums which the user can search over by typing into the search field at the top of the sidebar. As the user types, the list narrows and correspondingly the markers on display also narrow.
*If the user clicks on one of the items in the sidebar list, it is as if the user has clicked on the corresponding marker on the map: The marker bounces and the infowindow for that stadium shows. If the screen is sufficiently small that the sidebar is hidden until the user clicks the hamburger icon then the sidebar hides when a user clicks an item in the list.

## ServiceWorker
The app has an automatic service worker, thanks to Create React App.
The service worker works in production mode. To test it, simply run `npm install -g serve` and then `serve -s build` and open http://localhost:5000.

## Contributing
This repository is part of a project for Udacity's Front End Nanodegree Scholarship. Therefore, I will most likely will not accept pull requests.

## Built with the help of:
* The Udacity Project Webinar which gave an idea of how to go about approaching this project.
* The help of fellow students on the Nanodegree Slack channels.

## Author
* Oliver Critchfield
