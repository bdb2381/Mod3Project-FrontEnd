const MapsKey = config.GOOGLE_KEY;
// config relates to the config{} in configAPI.js


//////////////////
// function calls
loadApiSource()
renderMap()




//////////////////
// listening functions 


//////////////////
//handling functions 

// load the Google Maps API
function loadApiSource(){
  const apiKey = document.querySelector('head')
  const newTag = document.createElement('script')
  
  newTag.src = `https://maps.googleapis.com/maps/api/js?key=${MapsKey}&callback=initMap`
  
  apiKey.append(newTag)
}






//////////////////
// Manipulate the DOM Functions

// render the Google Map to screen
function renderMap(){
  const mapElement = document.getElementById('map')
  const mapScriptTag = document.createElement('script')
  
  mapScriptTag.text = `            
  let map;

  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 44.59824417, lng: -110.5471695 },
      zoom: 8
    });
  }
    `
    
  
    mapElement.append(mapScriptTag)   
}