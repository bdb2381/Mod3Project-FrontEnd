const MapsKey = config.GOOGLE_KEY;
// config relates to the config{} in configAPI.js

//////////////////
//  functions calls
loadApiSource()
getParkData()



//////////////////
// listening functions 




//////////////////
// handling functions 
function handleMapMarkers(park){
  let marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.Drop,
    position: { lat: parseFloat(park.latitude), lng: parseFloat(park.longitude) },
    title: park.name,
    label: park.name
  });
}

// load the Google Maps API
function loadApiSource(){
  const apiKey = document.querySelector('head')
  const newTag = document.createElement('script')
  
  newTag.src = `https://maps.googleapis.com/maps/api/js?key=${MapsKey}&callback=initMap`
  
  apiKey.append(newTag)
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
    parks.forEach(park => handleMapMarkers(park))
    
  })
}
