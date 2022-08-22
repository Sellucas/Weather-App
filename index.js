const container = document.querySelector('.container'),
    inputPart = document.querySelector('.input-part'),
    infoText = document.querySelector('.info-text'),
    inputField = document.querySelector('input'),
    locationBtn = document.querySelector('button'),
    weatherIcon = container.querySelector('.weather-part img'),
    arrowBack = container.querySelector('header i');

let api;

inputField.addEventListener("keyup", e => {
    // if user pressed enter button and input value isn't empty
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) { //if browser support geolocation API
        navigator.geolocation.getCurrentPosition(onSucess, onError);
    } else {
        alert('Your browser not support geolocation API');
    }
});

function onSucess(position) {
    const { latitude, longitude } = position.coords; // getting latitude and longitude of the user
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=2c8ae0e4d681e5776f924bea40f17466`
    fetchData();
};

function onError(error) {
    infoText.innerText = error.message;
    infoText.classList.add('error');
};

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2c8ae0e4d681e5776f924bea40f17466`;
    fetchData();
};

function fetchData() {
    infoText.innerText = "Getting weather details ...";
    infoText.classList.add('pending');
    // getting API response and returning it with parsing into JS object
    // weatherDetails function with passing API result as an argument
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    if (info.cod == "404") {
        infoText.innerText = `${inputField.value} isn't a valid city name`;
        infoText.classList.replace('pending', 'error');
    } else {
        // Getting required properties value from the info object
        const city = info.name,
            country = info.sys.country,
            { description, id } = info.weather[0],
            { feels_like, humidity, temp } = info.main;

        // Using weather icons acording to the id which API return
        if (id == 800) {
            weatherIcon.src = "images/day.svg"
        } else if (id >= 200 && id <= 232) {
            weatherIcon.src = "images/thunder.svg"
        } else if (id >= 600 && id <= 622) {
            weatherIcon.src = "images/snowy-5.svg"
        } else if (id >= 701 && id <= 781) {
            weatherIcon.src = ".imagesweather.svg"
        } else if (id >= 801 && id <= 804) {
            weatherIcon.src = "images/cloudy-day-3.svg"
        } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            weatherIcon.src = "images/rainy-7.svg"
        }

        // Passing these values to HTML
        container.querySelector('.temp .numb').innerHTML = Math.floor(temp);
        container.querySelector('.weather').innerHTML = description;
        container.querySelector('.location span').innerHTML = `${city}, ${country}`;
        container.querySelector('.temp .numb-2').innerHTML = Math.floor(feels_like);
        container.querySelector('.humidity span').innerHTML = `${humidity}%`;

        infoText.classList.remove('pending', 'error');
        container.classList.add('active');
        console.log(info);
    }
};

arrowBack.addEventListener('click', () => {
    container.classList.remove('active');
});