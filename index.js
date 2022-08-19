const container = document.querySelector('.container'),
    inputPart = document.querySelector('.input-part'),
    infoText = document.querySelector('.info-text'),
    inputField = document.querySelector('input'),
    locationBtn = document.querySelector('button');

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
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=2c8ae0e4d681e5776f924bea40f17466`
    fetchData();
};

function onError(error) {
    infoText.innerText = error.message;
    infoText.classList.add('error');
};

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c8ae0e4d681e5776f924bea40f17466`;
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
        infoText.innerText = `${inputField.value} isn't a valid city name`
        infoText.classList.replace('pending', 'error')
    }
    console.log(info);
}