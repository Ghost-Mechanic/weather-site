import { addProjectToDOM, displayTodos, addTodoToDOM } from './dom';
import { Project } from './todo';
import { currProject, defaultProject, projects } from './index.js';
import { saveToLocalStorage } from './storage.js';

// function to create a new project and add it to the dom through form input
function createProject(currProject) {
    const titleField = document.querySelector("#project-title");
    const descriptionField = document.querySelector("#project-description");
    const dueDateField = document.querySelector("#project-due-date");

    // create new project attributes with values given by user in the form
    let newTitle = titleField.value;
    let newDescription = descriptionField.value;
    let newDueDate = dueDateField.value

    // add default values to fields if none are given
    if (titleField.value == "") {
        newTitle = "Untitled";
    }
    if (descriptionField.value == "") {
        newDescription = "No description given";
    }
    if (dueDateField.value == "") {
        newDueDate = "No due date given";
    }
    else {

        // create date formatted as month day, year
        let dateArray = newDueDate.split('-');
        let year = dateArray[0];
        let month = dateArray[1];
        let day = dateArray[2];

        let dateObject = new Date(`${year}-${month}-${day}`);

        let months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        newDueDate = `${months[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
    }

    // create a new project object with constructor
    let newProject = new Project(newTitle, newDescription, newDueDate);

    // reset fields back to empty
    titleField.value = "";
    descriptionField.value = "";
    dueDateField.value = "";

    // save to storage after project is created
    projects.push(newProject);
    saveToLocalStorage(projects);

    // add the project that was just made to the DOM
    addProjectToDOM(newProject, currProject);
}

// this function will display a project's todos on the DOM
function displayProject(project, projectDiv) {
    
    // begin by clearing the section
    const todoSection = document.querySelector(".todos");
    todoSection.innerHTML = "";

    // call displayTodos for the given project to display its todos
    displayTodos(project, projectDiv);
}

// this function will create a todo for a project
function createTodo(project) {
    const titleField = document.querySelector("#todo-title");
    const descriptionField = document.querySelector("#todo-description");
    const dueDateField = document.querySelector("#todo-due-date");

    // create new todo attributes with values given by user in the form
    let newTitle = titleField.value;
    let newDescription = descriptionField.value;
    let newDueDate = dueDateField.value

    // add default values to fields if none are given
    if (titleField.value == "") {
        newTitle = "Untitled";
    }
    if (descriptionField.value == "") {
        newDescription = "No description given";
    }
    if (dueDateField.value == "") {
        newDueDate = "No due date given";
    }
    else {

        // create date formatted as month day, year
        let dateArray = newDueDate.split('-');
        let year = dateArray[0];
        let month = dateArray[1];
        let day = dateArray[2];

        let dateObject = new Date(`${year}-${month}-${day}`);

        let months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        newDueDate = `${months[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
    }

    // create a new todo object and add it to the project's todo list
    project.todoListClass.addTodo(newTitle, newDescription, newDueDate);

    // reset fields back to empty
    titleField.value = "";
    descriptionField.value = "";
    dueDateField.value = "";

    let todoIndex = project.todoListClass.todoList.length - 1;

    addTodoToDOM(project.todoListClass.todoList[todoIndex], project, todoIndex);

    // save to storage after todo is created
    saveToLocalStorage(projects);
}

// this function will remove a project from the DOM and project list
function removeProject(projectDiv) {
    
    // set current project to be the default project after a project is removed
    const defaultProjectDiv = document.querySelector(".projects .project");
    currProject.current = defaultProject;
    displayProject(defaultProject, defaultProjectDiv);

    // remove project from projects array
    const projectIndex = projectDiv.dataset.index;
    projects.splice(projectIndex,  1);

    // update dataset index for remaining projects
    const allProjects = document.querySelectorAll(".projects .project");
    allProjects.forEach((project, index) => {
        project.dataset.index = index; // Update dataset index
    });

    projectDiv.remove();
    
    saveToLocalStorage(projects);
}

export { createProject, displayProject, createTodo, removeProject };