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
              
        let priorite = ['Important', 'Moyenne', 'Faible'];
        let etat = ['Terminé','En Cours'];

        document.querySelector(".finish-task").addEventListener("click", ()=>{
          readEtat(etat[0]);
        });


        document.querySelector(".doing-task").addEventListener("click", ()=>{
          readEtat(etat[1]);
        });;


        document.querySelector(".task-important").addEventListener("click", ()=>{
          read(priorite[0]);
          });

        document.querySelector(".task-moyen").addEventListener("click", ()=>{
          read(priorite[1]);
          });
        
        document.querySelector(".task-faible").addEventListener("click", ()=>{
          read(priorite[2]);
        });

        let forte = document.querySelector(".priorite-forte");
        //forte.value = read(read(priorite[0]))
        

        let creatTask = document.querySelector(".all-task-doing");
   
        function read(Niveau){
          document.querySelector(".details-task").innerHTML = ""; 
          tacheInfo.once('value').then((snapshot) => {
              Object.keys(snapshot.val()).forEach((key) => {
                if (`${snapshot.val()[key].priorite}` == Niveau){
                    let details = document.querySelector(".details-task");
                    
                    console.log(creatTask)
                    let p = document.createElement("h4");
                    
                    let editTaches = createButton(bouton[0]); 
                    let deleteTaches = createButton(bouton[1]);


          
                    deleteTaches.addEventListener('click', ()=>{
                      firebase.database().ref('liste/' + key).remove(); 
                      alert("l'element a été bien supprimer")
                    });

                    editTaches.addEventListener('click', ()=>{
                      let taskInput=document.querySelector("#new-task").value;
                      let taskDescription=document.querySelector("#new-task-description").value;
                      let taskEtat=document.querySelector("#new-task-etat").value;
                      let taskDate=document.querySelector("#new-task-deadline").value;
                      let taskPriorite=document.querySelector("#priorite").value;
                      document.querySelector(".task").reset();
                      let updates = {
                        titre: taskInput,
                        etat: taskEtat,
                        description: taskDescription,
                        priorite: taskPriorite,
                        daate: taskDate,
                      }
                      firebase.database().ref('liste/' + key).update(updates); 

                      alert("l'element a été bien modifier")
                    });
       
                    
                    p.innerText=('Taches:' +'  '+ `Titre: ${snapshot.val()[key].titre}` +'  '+ `Description: ${snapshot.val()[key].description}` +'  '+ `Etat: ${snapshot.val()[key].etat}` +'  '+ `Priorite: ${snapshot.val()[key].priorite}`+'  '+ `Date: ${snapshot.val()[key].daate}`);
                    p.appendChild(editTaches);
                    p.appendChild(deleteTaches);
                    details.appendChild(p);
                  }
                    
              });
            });
        }
        let bouton =['Modifier', 'Supprimer'];

        function readEtat(Niveau){
          document.querySelector(".details-task").innerHTML = ""; 
          tacheInfo.once('value').then((snapshot) => {
              Object.keys(snapshot.val()).forEach((key) => {
                if (`${snapshot.val()[key].etat}` == Niveau){
                    let details = document.querySelector(".details-task");
                    let p = document.createElement("h4");

                    let editTaches = createButton(bouton[0]);
                    let deleteTaches = createButton(bouton[1]);
                    console.log(deleteTaches)
                    
                    p.innerText=('Taches:' +'  '+ `Titre: ${snapshot.val()[key].titre}` +'  '+ `Description: ${snapshot.val()[key].description}` +'  '+ `Etat: ${snapshot.val()[key].etat}` +'  '+ `Priorite: ${snapshot.val()[key].priorite}`+'  '+ `Date: ${snapshot.val()[key].daate}`);
                    p.appendChild(editTaches);
                    p.appendChild(deleteTaches);
                    details.appendChild(p);
                  }
                    
              });
            });
        }

      // Read infos to Firebase
      function readTaskInfo(){
        
         document.querySelector(".details-task").innerHTML = ""; 
           for(let i=0; i<3; i++){
           read(priorite[i]);
          }
      }


      function createTask(titre, description, modifier, supprimer, date){
         let div = document.createElement("div");
         div.className = "col-3"
         div.style.border = "15px"
         let h = document.createElement("h6");
         let p = document.createElement("p");
         let span = document.createElement("span");
         h.innerText = titre;
         p.innerText = description;
         span.innerText = date;
         h.appendChild(p);
         p.appendChild(span);
         span.appendChild(modifier);
         span.appendChild(supprimer);
         div.appendChild(h);

      }
      

      function createButton(NameButton){
        let buttonTaches = document.createElement("button");
        buttonTaches.innerText=NameButton;
        buttonTaches.className="edit";
        buttonTaches.style.border = 0
        buttonTaches.style.margin = "20px";

        return buttonTaches; 
      }

        