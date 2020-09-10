



//////////////////
// function calls



//////////////////
// listening functions 




<<<<<<< HEAD
=======
function displayNotes(element){
    if(element.User_id == parseInt(parseInt(sessionStorage.getItem(setWord)))){
        let newLi = document.createElement("li")
        newLi.innerText = element.text
        getList.appendChild(newLi)
      
        deleteButton = document.createElement("button")
        deleteButton.innerText = "delete"
 
        divElement = document.createElement('div') //
        divElement.appendChild(deleteButton) //
        newLi.append(divElement) //
        newLi.id = element.id
        deleteButton.addEventListener("click", deleteNote) //
               
        editButton = document.createElement("button")
        divElement.appendChild(editButton) //
        editButton.innerText ="edit"
        editButton.className = element.id
        // debugger
    }
>>>>>>> 4fbc7956dab2e92b2cfbd61f66266277906693db


//////////////////
//handling functions 





//////////////////
// Manipulate the DOM Functions

      


//////////////////
// // fetch functions 





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
function getNotes(){
}
getNotes()

<<<<<<< HEAD
function patchNote(event){
    event.preventDefault()
=======
function postNote(event){
    event.preventDefault()
    
    //  debugger  
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
        // debugger
        getNotes(data)
    }
>>>>>>> 4fbc7956dab2e92b2cfbd61f66266277906693db
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
