sessionStorage.clear()

//glabal variables 
let setWord = ""
let setPlace = ""
const loginButton = document.getElementById("login-form")
const getYellowstone  = document.getElementById("Yellowstone National Park")
const namePlacement = document.getElementById("name")
const statePlacement = document.getElementById("state")
const descPlacement = document.getElementById("park-description")
const photoPlacement = document.getElementById("photos_Url")
let newLi = document.createElement("li")
const getList = document.getElementById("memories-text")
const getMountRainer = document.getElementById("Mt Rainier National Park")
const getNorthCascades = document.getElementById("North Cascades National Park")
const getSmokyMountains = document.getElementById("Great Smoky Mountains National Park")
const getForm = document.getElementById("form")
const hiddenElement = document.getElementById("memories-submit-container-hidden")

//event listeners 
getForm.addEventListener("submit", postNote)
loginButton.addEventListener("submit", setUser)
getYellowstone.addEventListener("click", getPostInfo)
getMountRainer.addEventListener("click",getPostInfo)
getNorthCascades.addEventListener("click",getPostInfo)
getSmokyMountains.addEventListener("click",getPostInfo)


//grab the user's login name
function setUser(event){
    event.preventDefault()
    setWord = event.target[0].value
    loginButton.reset()
    getUsers()
}

//query database for all users in order to check if user exist
function getUsers() {
    fetch(`http://localhost:3000/user`)
    .then(res => res.json())
    .then(word => checkUser(word))
}

//check if user is a valid user and login, else create new account
function checkUser(array) {
    let test = array.filter( word => word.name == setWord)
    for(i=0; i<array.length; i++){
            if (array[i].name == setWord){
                 setUserSession(array[i])
            }
         }
         if (test.length == 0){
            postUser()
         }
}

//for a valid user, create a session, i.e. "log in"
function setUserSession(element){
    sessionStorage.setItem(element.name , element.id)
    
    if (setPlace!= ""){
        let newHash = {id: parseInt(sessionStorage.getItem(setPlace))} 
        getNotes(newHash)
    }
}

//if no valid user is found, create a new user off the login name
function postUser(){
    let data = {name: setWord}
    fetch(`http://localhost:3000/user`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
    getUsers()
}

//query database for park description information
function getPostInfo(event){
    fetch(`http://localhost:3000/parks/${event.target.id}`)
    .then( res => res.json())
    .then( word => setInfo(word))
}

//render park description to screen 
function setInfo(hash){
    setPlace = hash.name
    getList.innerHTML = " "
    namePlacement.innerText = hash["name"]
    statePlacement.innerText = `Location: ${hash["state"]}`
    descPlacement.innerText = hash["description"]
    photoPlacement.src = hash["photos_Url"]
    sessionStorage.setItem(setPlace, hash.id)
    if(setWord != ""){
        getNotes(hash)
    }
}

//query database to get all notes and send to render
function getNotes(hash){
    getList.innerHTML = ""
    fetch(`http://localhost:3000/notes/${hash.id}`)
    .then( res => res.json())
    .then( res => res.forEach(element => { displayNotes(element)}))
}

//render a single note to screen 
function displayNotes(element){
    if(element.User_id == parseInt(parseInt(sessionStorage.getItem(setWord)))){
        hiddenElement.id = "memory-submit-container" // show the submit memory form once park is clicked

        let newLi = document.createElement("li")
        newLi.innerText = element.text
        getList.appendChild(newLi)
      
        deleteButton = document.createElement("button")
        deleteButton.innerText = "delete"
        deleteButton.className = "delete-edit-button"
        divElement = document.createElement('div') //
        divElement.appendChild(deleteButton) //
        newLi.append(divElement) //
        newLi.id = element.id
        deleteButton.addEventListener("click", deleteNote) //
               
        editButton = document.createElement("button")
        divElement.appendChild(editButton) //
        editButton.innerText ="edit"
        editButton.className = element.id
        editButton.addEventListener("click",patchComment)
    }

}

function postNote(event){
    event.preventDefault()
    if( setWord && setPlace != ""){
        let data ={ 
            text: event.target[0].value,
            User_id: parseInt(sessionStorage.getItem(setWord)),
            id: parseInt(sessionStorage.getItem(setPlace))
        }
        fetch(`http://localhost:3000/notes`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
        })
        
        displayNotes(data)
    }
    getForm.reset()

}

function deleteNote(){
    fetch(`http://localhost:3000/notes/${event.path[2].id}`,{  //
        method: `DELETE`
    })
    event.path[2].remove()//delete the div and the approprite li content
    
}

function patchComment(event){
        let data = {
            text: "This comment is approved by the Park, thanks for commenting",
            id: parseInt(sessionStorage.getItem(setPlace))
        }
    fetch(`http://localhost:3000/notes/${event.target.className})`,{
       method: `PATCH`,
       headers: {'Content-Type':'application/json'},
       body: JSON.stringify(data)
    }) 
    .then(resp => resp.json())
    .then(json => {
        console.log(json)
        getNotes(data)
    })
}

