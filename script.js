
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

var API_KEY = "Z9G4UcTMnsu5PmaUes8zvAlCRB52JooGMkanIgoD";
var NUM_PICTURES = 2;

var pictureOfTheDayURL = "https://api.nasa.gov/planetary/apod?api_key="; // + API_KEY
var imageSearchURL = "https://images-api.nasa.gov/search?q="; // + query

// Gets the data from the API, then passes it to the data handler function
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

    for (var i = 0; i < NUM_PICTURES; i++) {
        // Get the next Item:
        // var currentItem = items[i];

        // Get the random Item:
        var randomIndex = Math.floor(Math.random() * length); // 0 -> length; // Math.ceil(#) - rounds up
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

// Calls the APIs with the handler for the first time
fetchDPData();
fetchNASAData('Earth');

// Adds click handlers for every planet name
mercuryName.addEventListener('click', () => {
    fetchNASAData('Mercury');
    document.querySelector('.current').className = '';
    mercuryName.className = 'current';
    console.log('Clicked Mercury');
});

venusName.addEventListener('click', () => {
    fetchNASAData('Venus');
    document.querySelector('.current').className = '';
    venusName.className = 'current';
    console.log('Clicked Venus');
});

earthName.addEventListener('click', () => {
    fetchNASAData('Earth');
    document.querySelector('.current').className = '';
    earthName.className = 'current';
    console.log('Clicked Earth');
});

marsName.addEventListener('click', () => {
    fetchNASAData('Mars');
    document.querySelector('.current').className = '';
    marsName.className = 'current';
    console.log('Clicked Mars');
});

jupiterName.addEventListener('click', () => {
    fetchNASAData('Jupiter');
    document.querySelector('.current').className = '';
    jupiterName.className = 'current';
    console.log('Clicked Jupiter');
});

saturnName.addEventListener('click', () => {
    fetchNASAData('Saturn');
    document.querySelector('.current').className = '';
    saturnName.className = 'current';
    console.log('clicked Saturn');
});

uranusName.addEventListener('click', () => {
    fetchNASAData('Uranus');
    document.querySelector('.current').className = '';
    uranusName.className = 'current';
    console.log('clicked Uranus');
});

neptuneName.addEventListener('click', () => {
    fetchNASAData('Neptune');
    document.querySelector('.current').className = '';
    neptuneName.className = 'current';
    console.log('clicked Neptune');
});



