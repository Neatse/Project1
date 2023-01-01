
var topBlock = document.querySelector("#top-block");
var sideBlock = document.querySelector("#side-block");
var mainBlock = document.querySelector("#main-block");

var topTitle = document.querySelector('#top-block h5');
var topImage = document.querySelector('#top-block img');
var topExplanation = document.querySelector('#top-block p');

var mercuryName = document.querySelector('#mercury');
var venusName = document.querySelector('#venus');
var earthName = document.querySelector('#earth');
var marsName = document.querySelector('#mars');
var jupiterName = document.querySelector('#jupiter');
var saturnName = document.querySelector('#saturn');
var uranusName = document.querySelector('#uranus');
var neptuneName = document.querySelector('#neptune');
var backButton = document.querySelector('#previous');

var API_KEY = "Z9G4UcTMnsu5PmaUes8zvAlCRB52JooGMkanIgoD";

var pictureOfTheDayURL = "https://api.nasa.gov/planetary/apod?api_key="; // + API_KEY
var imageSearchURL = "https://images-api.nasa.gov/search?q="; // + query

// The date being shown
var currentDailyPictureDate = new Date(); // Subtract one day and save each time

// Gets the data from the API, then passes it to the "onDone" function
function fetchDPData() {
    // Promise style
    fetch(pictureOfTheDayURL + API_KEY) // + "&date=" + {Date in YYYY-MM-DD format}
        .then((response) => response.json()) // Or response.text()
        .then((data) => {
            handleDPData(data);
        });
}

// Handles data from the API
function handleDPData(data) {
    var title = data.title;
    var imageURL = data.url;
    var explanation = data.explanation.substr(0, 500) + "...";

    topTitle.textContent = title;
    topExplanation.textContent = explanation;
    topImage.src = imageURL;
}

function fetchNASAData(objectName) {
    fetch(imageSearchURL + objectName)
        .then((response) => response.json()) // Or response.text()
        .then((data) => {
            handleNASAImageData(data, objectName);
        });
}

function handleNASAImageData(data, objectName) {
    console.log(objectName, data);
    var collection = data.collection;
    var items = collection.items;
    var length = items.length;

    // Clear the previous elements
    mainBlock.innerHTML = `<h3>${objectName}</h3>`;

    for (var i = 0; i < 1; i++) {
        // Get the next Item:
        // var currentItem = items[i];

        // Get the random Item:
        var randomIndex = Math.floor(Math.random() * length); // 0 -> length;
        var currentItem = items[randomIndex];

        // Get the data we want:
        var title = currentItem.data[0].title;
        var secondaryCreator = currentItem.data[0].secondary_creator;
        var imageHref = currentItem.links[0].href;

        // Display that data:
        var titleElement = document.createElement('h6'); // Create an HTML element that is not on the page yet
        titleElement.textContent = title; // Modify the element to include the Title
        mainBlock.appendChild(titleElement); // Add the element to the page

        var secondaryCreatorElement = document.createElement('p');
        secondaryCreatorElement.textContent = secondaryCreator;
        mainBlock.appendChild(secondaryCreatorElement);

        var imageElement = document.createElement('img');
        imageElement.src = imageHref;
        imageElement.className = "spacepic";
        mainBlock.appendChild(imageElement);
    }
}

// Calls the API with the handler for the first time
fetchDPData();
fetchNASAData('Earth');

// Adds click handlers for every planet name
mercuryName.addEventListener('click', () => {
    fetchNASAData('Mercury');
    console.log('Clicked Mercury');
});

venusName.addEventListener('click', () => {
    fetchNASAData('Venus');
    console.log('Clicked Venus');
});

earthName.addEventListener('click', () => {
    fetchNASAData('Earth');
    console.log('Clicked Earth');
});

marsName.addEventListener('click', () => {
    fetchNASAData('Mars');
    console.log('Clicked Mars');
});

jupiterName.addEventListener('click', () => {
    fetchNASAData('Jupiter');
    console.log('Clicked Jupiter');
});

saturnName.addEventListener('click', () => {
    fetchNASAData('Saturn');
    console.log('clicked Saturn');
});

uranusName.addEventListener('click', () => {
    fetchNASAData('Uranus');
    console.log('clicked Uranus');
});

neptuneName.addEventListener('click', () => {
    fetchNASAData('Neptune');
    console.log('clicked Neptune');
});



