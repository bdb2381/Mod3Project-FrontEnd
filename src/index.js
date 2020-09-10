



//////////////////
// function calls



//////////////////
// listening functions 






//////////////////
//handling functions 





//////////////////
// Manipulate the DOM Functionsgut 

      


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
