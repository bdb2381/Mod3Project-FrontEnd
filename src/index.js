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



// clears session storage for fresh login
sessionStorage.clear()
const getHeader = document.getElementsByClassName("header")[0]
sessionStorage.setItem("testpark", 1)
sessionStorage.setItem("User_id", 1)
// user login start //
// need to change memoryForm to whatever the login button is 
const memoryForm = document.getElementById("form")
memoryForm.addEventListener("submit",patchNote)
// fetch request for all current users, changes set word so it can be used in checkUsers
// function something(event){
//     event.preventDefault()
//     setWord = event.target[0].value
//     fetch(`http://localhost:3000/user`)
//     .then(res => res.json())
//     .then(word => checkUsers(word))
// }
// checks id new user or old user, if new, calles postUser if old then call get user
// function checkUsers(array){
//     // debugger
//     for(i=0; i<array.length; i++){
//         if(array[i].name == setWord){
//             getUsers(array[i])
//            break 
//         }
//     }
//    postUser()
// }
// puts the current user and user id in session storage, can call on in latter fucntions
// function getUsers(element){
//     sessionStorage.setItem(element.name , element.id)
//     debugger
// }
// makes post request to and adds user to data base
// function postUser(){
//     let data = {name: setWord}
//     // debugger
//     fetch(`http://localhost:3000/user`,{
//         method: "POST",
//         headers: {'Content-Type':'application/json'},
//         body: JSON.stringify(data)
//     })
// }
//user login end 

// notes process start 
getNotes()

function patchNote(event){
    event.preventDefault()
    // debugger
    let data ={text: event.target[0].value,
               Park_id: sessionStorage.getItem("testpark"),
               User_id: sessionStorage.getItem("User_id")
    }
    fetch(`http://localhost:3000/notes`,{
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then (json =>console.log(json))
            debugger
    }


//test park notes may have to run through all the notes 
// match up park to to match note Park id 
function getNotes(){
    fetch(`http://localhost:3000/notes/1`)
    .then(res => res.json())
    .then(res => setMemories(res))
    // debugger
}

const grabOl = document.getElementById("memories holder")
// const newLi = document.createElement("li")

// note process end 

// sets li items to be notes text
function setMemories(element){
    let newLi = document.createElement("li")
    newLi.innerText = element["text"]
    grabOl.appendChild(newLi)
    // debugger
}
