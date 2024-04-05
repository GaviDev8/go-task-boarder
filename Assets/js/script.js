// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// This function is to generate a unique task id
const generateTaskId = () => {
    const id = nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId +1));
    return id;
};

// This function creates a task card
const createTaskCard = (task) => {
    const taskCard = $("<div>")
    .addClass("card w-75 task card draggable my-3")
    .attr("data-task-id", task.id)

    const cardHeader = $("div")
    .addClass("card-header h4")
    .text(task.title);

    const cardBody = $("div")
    .addClass("card-body");

    const cardDescription = $("<p>")
    .addClass("card-text")
    .text(task.description);

    const cardDueDate = $("<p>")
    .addClass("card-text")
    .text(task.dueDate);

    const cardDeleteButton = $("<button>")
    .addClass("btn btn-danger delete")
    .text("Delete")
    .attr("data-task-id", task.id)
    .on("click", handleDeleteTask);

    cardDeleteButton.on("click", handleDeleteTask);

    if(task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, "DD/MM/YYYY");
        if(now.isSame(taskDueDate, 'day')) {
            taskCard.addClass("bg-warning text white"); 
        } else if(now.isAfter(taskDueDate)) {
            taskCard.addClass("bg-warning text white");
            cardDeleteButton.addClass("border-light")
        }
    }
    cardBody.append(cardDescription, cardDueDate, cardDeleteButton);
    taskCard.append(cardHeader, cardBody);

    return taskCard;
}

// A function to render the task list and make cards draggable
const renderTaskList = () => {
    if (!taskList) {
        taskList = [];
    }
    const toDoList = $("#todo-cards");
    toDoList.empty();

    const inProgressList = $("#in-progress-cards");
    inProgressList.empty();

    const doneList = $("#done-cards");
    doneList.empty();

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].status === "to-do") {
            toDoList.append(createTaskCard(taskList[i]));
        } else if (taskList[i].status === "in-progress") {
            inProgressList.append(createTaskCard(taskList[i]));
        } else if (taskList[i].status === "done") {
            doneList.append(createTaskCard(taskList[i]));
        }
    }

    $(".draggable").draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function(event) {
            const original = $(event.target).hasClass("ui-draggable");
            if (original) {}
        }
    });
}

// Creates a function to handle adding a new task
const handleAddTask= (event) => {
    event.preventDefault();

    // Get form input values
    const taskTitle = $("#taskTitle").val();
    const taskDueDate = $("#taskDueDate").val();
    const taskDescription = $("#taskDescription").val();

    // Create task object
    const task = {
        id: generateTaskId(),
        title: taskTitle,
        dueDate: taskDueDate,
        description: taskDescription,
        status: "to-do" 
    };

    // Add the task to the task list
    taskList.push(task);

    // Save updated task list to localStorage
    localStorage.setItem("tasks", JSON.stringify(taskList));

    // Render the updated task list
    renderTaskList();

    // Reset form fields and close the modal
    document.getElementById("taskForm").reset();
    $("#formModal").modal("hide"); // Hides the modal
};


// Creates a function to handle deleting a task
const handleDeleteTask = (event) => {
    event.preventDefault();
    const taskId = $(event.currentTarget).attr("data-task-id");

    taskList = taskList.filter(task => task.id !== parseInt(taskId));
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
};

// This function handles dropping a task into a new status lane
const handleDrop = (event, ui) => {
    const taskId = ui.draggable.attr("data-task-id");
    const newStatus = event.target.id; // Corrected new status extraction

    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == parseInt(taskId)) {
            taskList[i].status = newStatus;
            break;
        }
    }
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
};

// This renders the task list, event listeners, makes lanes droppable, and makes the due date field a date picker
$(document).ready(() => {
    renderTaskList();

    $("#taskForm").on("submit", handleAddTask);

    $(".lane").draggable({
        accept: ".draggable",
        drop: handleDrop
    });

    $("#taskDueDate").datepicker({
        changeMonth: true,
        changeYear: true

    });

});
