// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
const generateTaskId = () => {

}

// Todo: create a function to create a task card
const createTaskCard = (task) => {

}

// Todo: create a function to render the task list and make cards draggable
const renderTaskList = () => {
    if(!taskList) {
        taskList = [];
    }
    const toDoList = $("#todo-cards");
    toDoList.empty();

    const inProgressList = $("#in-progress-cards");
    inProgressList.empty();

    const doneList = $("#done-cards");
    doneList.empty()
    
    for(let i= 0; i < taskList.length; i++) {
        if(taskList[i].status === "to-do") {
            toDoList.append(createTaskCard(taskList[index]));
        }
        // else if ip and else if for done

    }

    $(".draggable").draggable({
        opacity: 0.7,
        zIndex: 100
        
        helper: function(event) {
            const original = $(event.target);
        }
    }

    )

}

// Todo: create a function to handle adding a new task
const handleAddTask= (event) => {

}

// Todo: create a function to handle deleting a task
const handleDeleteTask = (event) => {

}

// Todo: create a function to handle dropping a task into a new status lane
const handleDrop = (event, ui) => {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(() => {

});
