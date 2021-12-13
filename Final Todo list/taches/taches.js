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


var taskInput=document.getElementById("new-task");//Ajouter nouveau taches.
var taskDescription=document.getElementById("new-task-description");
var taskEtat=document.getElementById("new-task-etat");
var taskDate=document.getElementById("new-task-deadline");
var taskPriorite=document.getElementById("#form");

var addButton=document.getElementsByTagName("button")[0];// button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//Nouvel élément de la liste des tâches
var createNewTaskElement=function(taskString){

	let listItem=document.createElement("li");

	var checkBox=document.createElement("input");//checkbx
	var label=document.createElement("label");//label
	var editInput=document.createElement("input");//text
	var editButton=document.createElement("button");//edit button
	var deleteButton=document.createElement("button");//delete button

	label.innerText=taskString;

	//Chaque élément doit être ajouté
	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Modifier";
	editButton.className="edit";
	deleteButton.innerText="Supprimer";
	deleteButton.className="delete";

	//et en annexe. 
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}



var addTask=function(){
	console.log("Add Task...");
	//Créez un nouvel élément de liste avec le texte de la #new-task
	var listItem=createNewTaskElement(taskInput.value);

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	 taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");


var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		//If class of the parent is .editmode
		if(containsClass){

		//switch to .editmode
		//label becomes the inputs value.
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}

		//toggle .editmode on the parent.
		listItem.classList.toggle("editMode");
}




//Delete task.
var deleteTask=function(){
		console.log("Delete Task...");

		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		//Remove the parent list item from the ul.
		ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
		console.log("Complete Task...");
	
	//Append the task list item to the #completed-tasks
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
		console.log("Incomplete Task...");
//Mark task as incomplete.
	//When the checkbox is unchecked
		//Append the task list item to the #incomplete-tasks.
		var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
	console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");
//select ListItems children
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");


			//Bind editTask to edit button.
			editButton.onclick=editTask;
			//Bind deleteTask to delete button.
			deleteButton.onclick=deleteTask;
			//Bind taskCompleted to checkBoxEventHandler.
			checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
	//for each list item
	for (var i=0; i<incompleteTaskHolder.children.length;i++){

		//bind events to list items chldren(tasksCompleted)
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}




//cycle over completedTasksHolder ul list items
	for (var i=0; i<completedTasksHolder.children.length;i++){
	//bind events to list items chldren(tasksIncompleted)
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}



function addTaches(event){
    event.preventDefault();
    /* let text = document.getElementById("todo-input"); */
    let newItem = db.collection("taches").add({
        titre: taskInput.value,
        etat: taskEtat.value,
		description: taskDescription.value,
		priorite: taskPriorite.value,
		deadline: taskDate.value
    })
    text.value = "";
	 taskInput.value = "";
	 taskEtat.value = "";
	 taskDescription.value = "";
	 taskPriorite.value = "";
	 taskDate.value = ""
}

addTaches();