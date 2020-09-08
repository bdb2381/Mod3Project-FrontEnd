const MapsKey = config.GOOGLE_KEY;
// config relates to the config{} in configAPI.js

loadApiSource()
renderMap()


function loadApiSource(){
  const apiKey = document.querySelector('head')
  const newTag = document.createElement('script')
  
  newTag.src = `https://maps.googleapis.com/maps/api/js?key=${MapsKey}&callback=initMap`
  
  apiKey.append(newTag)
}


function renderMap(){
  const mapElement = document.getElementById('map')
  const mapScriptTag = document.createElement('script')
  
  mapScriptTag.text = `            
  let map;

  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  }
    `
  
    mapElement.append(mapScriptTag)   
}