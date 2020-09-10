sessionStorage.clear()
let setWord = ""
let setPlace = ""
const loginButton = document.getElementById("login-form")
const getYellowstone  = document.getElementById("Yellowstone National Park")
const namePlacement = document.getElementById("name")
const photoPlacement = document.getElementById("photos_Url")
let newLi = document.createElement("li")
const getList = document.getElementById("memories-text")
const getMountRainer = document.getElementById("Mt Rainier National Park")
const getForm = document.getElementById("form")

getForm.addEventListener("submit", postNote)
loginButton.addEventListener("submit", setUser)
getYellowstone.addEventListener("click", getPostInfo )
getMountRainer.addEventListener("click",getPostInfo)

function setUser(event){
    event.preventDefault()
    setWord = event.target[0].value
    loginButton.reset()
    getUsers()
}

function getUsers() {
    fetch(`http://localhost:3000/user`)
    .then(res => res.json())
    .then(word => checkUser(word))
}

function checkUser(array) {
    let test = array.filter( word => word.name == setWord)
    for(i=0; i<array.length; i++){
            if(array[i].name == setWord){
                 setUserSession(array[i])
            }
         }
         if( test.length == 0){
            postUser()
         }
}

function setUserSession(element){
    sessionStorage.setItem(element.name , element.id)
    if(setPlace!= ""){
    let newHash = {id: parseInt(sessionStorage.getItem(setPlace))} 
    getNotes(newHash)
    }


}

function postUser(){
    let data = {name: setWord}
    fetch(`http://localhost:3000/user`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
    getUsers()
}

function getPostInfo(event){
    fetch(`http://localhost:3000/parks/${event.target.id}`)
    .then( res => res.json())
    .then( word => setInfo(word))
}

function setInfo(hash){
    setPlace = hash.name
    getList.innerHTML = " "
    namePlacement.innerText = hash["description"]
    photoPlacement.src = hash["photos_Url"]
    sessionStorage.setItem(setPlace, hash.id)
    if(setWord != ""){
        getNotes(hash)
    }
}

function getNotes(hash){
    getList.innerHTML = ""
    fetch(`http://localhost:3000/notes/${hash.id}`)
    .then( res => res.json())
    .then( res => res.forEach(element => { displayNotes(element)}))
}

function displayNotes(element){
    if(element.User_id == parseInt(parseInt(sessionStorage.getItem(setWord)))){
        // debugger
        let newLi = document.createElement("li")
        newLi.innerText = element.text
        getList.appendChild(newLi)
        test = document.createElement("button")
        newLi.appendChild(test)
        test.innerText = "delete"
        newLi.className = element.id
        newLi.addEventListener("click", deleteNote)
        // debugger
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
        newLi.innerText = data.text
        getList.appendChild(newLi)
    }
    getForm.reset()

}

function deleteNote(){
    // debugger
    fetch(`http://localhost:3000/notes/${event.path[1].className}`,{
        method: `DELETE`
    })
    event.path[1].remove()
}



 