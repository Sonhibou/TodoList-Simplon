// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCycGM19JuDtWN5S9ulcxQaOKBbyo8awqk",
  authDomain: "todo-4ca38.firebaseapp.com",
  projectId: "todo-4ca38",
  storageBucket: "todo-4ca38.appspot.com",
  messagingSenderId: "444673911498",
  appId: "1:444673911498:web:55269589c856e5376b6233"
};
  // Initialize Firebase
 // const app = initializeApp(firebaseConfig);

 firebase.initializeApp(firebaseConfig);

 let tacheInfo = firebase.database().ref("liste");


var taskInput=document.querySelector("#new-task");//Ajouter nouveau taches.
var taskDescription=document.querySelector("#new-task-description");
var taskEtat=document.querySelector("#new-task-etat");
var taskDate=document.querySelector("#new-task-deadline");
var taskPriorite=document.querySelector("#priorite");


document.querySelector(".task").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

   let taskInput=document.querySelector("#new-task").value;
   let taskDescription=document.querySelector("#new-task-description").value;
   let taskEtat=document.querySelector("#new-task-etat").value;
   let taskDate=document.querySelector("#new-task-deadline").value;
   let taskPriorite=document.querySelector("#priorite").value;

  console.log(taskInput, taskDescription, taskEtat, taskPriorite, taskDate);

  saveTaskInfo(taskInput, taskDescription, taskEtat, taskPriorite, taskDate);

  document.querySelector(".task").reset();
}

// Save infos to Firebase
function saveTaskInfo(taskInput, taskDescription, taskEtat, taskPriorite, taskDate) {
  let newContactInfo = tacheInfo.push();

  newContactInfo.set({
    titre: taskInput,
    etat: taskEtat,
    description: taskDescription,
    priorite: taskPriorite,
    daate: taskDate,
  });
}

document.querySelector(".all-task").addEventListener("click", readTaskInfo);

// Read infos to Firebase
function readTaskInfo(){

       
        tacheInfo.once('value').then((snapshot) => {
                Object.keys(snapshot.val()).forEach((key) => {
                    let details = document.querySelector(".details-task");
                    let p = document.createElement("h4");
                    let editTaches = document.createElement("button");
                    editTaches.innerText="Modifier";
                    editTaches.className="edit";
                    editTaches.style.border = 0
                    editTaches.style.margin = "20px";

                    p.innerText=('Taches:' +'  '+ `Titre: ${snapshot.val()[key].titre}` +'  '+ `Description: ${snapshot.val()[key].description}` +'  '+ `Etat: ${snapshot.val()[key].etat}` +'  '+ `Priorite: ${snapshot.val()[key].priorite}`+'  '+ `Date: ${snapshot.val()[key].daate}`);
                    p.appendChild(editTaches);
                    details.appendChild(p);
                    
                });
            });
            

}

function readTaskFinish(){
      
}
