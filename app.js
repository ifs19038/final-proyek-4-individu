if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  console.log("Geolocation is not supported by this browser.");
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  // console.log(lat,long);
  generateWeatherByLatLong(lat,long);
  generateMap(lat, long);
}

let input = document.querySelector('.input_text');
let main = document.querySelector('#name');
let temp = document.querySelector('.temp');
let temp2 = document.querySelector('.temp2');
let desc = document.querySelector('.desc');
let desc2 = document.querySelector('.desc2');
let wind = document.querySelector('.wind');
let wind2 = document.querySelector('.wind2');
let button= document.querySelector('.submit');
let icon = document.querySelector('.icon');
let humidity = document.querySelector('.humidity');
let visibility = document.querySelector('.visibility');
let pressure = document.querySelector('.pressure');


button.addEventListener('click', function(name){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&units=metric&appid=e90f275d13c352884256251aa2132b1a')
.then(response => response.json())
.then(data => 
  // console.log(data))
  {
  let tempValue = data['main']['temp'];
  let nameValue = data['name'];
  let negaraValue = data['sys']['country']
  let descValue = data['weather'][0]['description'];
  let windValue = data['wind']['speed'];
  // let tempCelciusValue ;
  // = tempValue - 273.15;
  let iconValue = data['weather'][0]['icon'];
  let humidityValue = data ['main']['humidity'];
  let visibilityValue = data['visibility'];
  let pressureValue = data ['main']['pressure'];
  let visibilityKmValue = visibilityValue / 1000;


  main.innerHTML = nameValue + ", " + negaraValue;
  desc.innerHTML = descValue;
  desc2.innerHTML = descValue;
  temp.innerHTML = tempValue.toFixed(0) + "&deg" +"C";
  temp2.innerHTML = tempValue.toFixed(0) + "&deg" +"C";
  wind.innerHTML = windValue.toFixed(0) +" km/h";
  wind2.innerHTML = windValue.toFixed(0) +" km/h";
  humidity.innerHTML = humidityValue + "%";
  visibility.innerHTML = visibilityKmValue + " km";
  pressure.innerHTML = pressureValue + " hPa";
  icon.src = "http://openweathermap.org/img/wn/" + iconValue + "@2x.png";
  input.value ="";

})

.catch(err => nameFalse());
})

function nameFalse(){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Nama kota yang anda masukkan tidak ditemukan',
  })
}

function generateWeatherByLatLong(lat,long){
  fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon=' + long + '&units=metric&appid=e90f275d13c352884256251aa2132b1a')
.then(response => response.json())
.then(data => 
  // console.log(data))
  {
  let tempValue = data['main']['temp'];
  let nameValue = data['name'];
  let negaraValue = data['sys']['country']
  let descValue = data['weather'][0]['description'];
  let windValue = data['wind']['speed'];
  // let tempCelciusValue ;
  // = tempValue - 273.15;
  let iconValue = data['weather'][0]['icon'];
  let humidityValue = data ['main']['humidity'];
  let visibilityValue = data['visibility'];
  let visibilityKmValue = visibilityValue / 1000;
  let pressureValue = data ['main']['pressure'];

  main.innerHTML = nameValue + ", " + negaraValue;
  desc.innerHTML = descValue;
  desc2.innerHTML = descValue;
  temp.innerHTML = tempValue.toFixed(0) + "&deg" +"C";
  temp2.innerHTML = tempValue.toFixed(0) + "&deg" +"C";
  wind.innerHTML = windValue.toFixed(0) +" km/h";
  wind2.innerHTML = windValue.toFixed(0) +" km/h";
  humidity.innerHTML = humidityValue + "%";
  visibility.innerHTML = visibilityKmValue + " km";
  pressure.innerHTML = pressureValue + " hPa";
  icon.src = "http://openweathermap.org/img/wn/" + iconValue + "@2x.png";
  input.value ="";

})

.catch(err => nameFalse());
}



function generateMap(lat, long){
  // Initialize the map and assign it to a variable for later use
// there's a few ways to declare a VARIABLE in javascript.
// you might also see people declaring variables using `const` and `let`
var map = L.map('map', {
  // Set latitude and longitude of the map center (required)
  center: [lat, long],
  // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
  zoom: 11
});


// Create a Tile Layer and add it to the map
var tiles = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
minZoom: '8'}).addTo(map);

var marker = L.marker(
[lat, long],
{ 
  draggable: true,
  title: "",
  opacity: 0.75
});

marker.addTo(map);
marker.on('dragend', function(e){
  // console.log(e);
let lat = e.target._latlng.lat;
let long = e.target._latlng.lng;

generateWeatherByLatLong(lat,long);
})

}
