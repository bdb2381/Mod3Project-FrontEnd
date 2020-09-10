sessionStorage.clear()
let setWord = ""
const loginButton = document.getElementById("login-form")
loginButton.addEventListener("submit", setUser)

function setUser(event){
    sessionStorage.clear()
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
}

function postUser(){
    let data = {name: setWord}
    // debugger
    fetch(`http://localhost:3000/user`,{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
    getUsers()
}
