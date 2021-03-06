const MapsKey = config.GOOGLE_KEY;
// config relates to the config{} in configAPI.js

let map;

//////////////////
//  functions calls
loadApiSource()
getParkData()

initMap()

//////////////////
// listening functions 




//////////////////
// handling functions 

// load markers to the map 
function handleMapMarkers(parks){
  parks.forEach(park => {
    let marker = new google.maps.Marker({
      map: map,
      draggable: true,
      animation: google.maps.Animation.Drop,
      position: { lat: parseFloat(park.latitude), lng: parseFloat(park.longitude) },  // parseFloat as json lat/long are stored as strings
      title: park.name,
      label: park.name
    });
    
 })
}


// load the Google Maps API
function loadApiSource(){
  const headElement = document.querySelector('head')
  const scriptTag = document.createElement('script')
  // debugger
  // keeps API out of git via interprolation 
  scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${MapsKey}&callback=initMap`
  headElement.append(scriptTag)
}





//////////////////
// DOM functions 

// render the base Google Map to screen
function initMap() {
  const myLatLng = { lat: 44.59824417, lng: -110.5471695 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: myLatLng,
  });
  
}  


//////////////////
// fetch functions 
function getParkData(){
  fetch('http://localhost:3000/parks')
  .then(resp => resp.json())
  .then(parks => {
    handleMapMarkers(parks)
  })
}

