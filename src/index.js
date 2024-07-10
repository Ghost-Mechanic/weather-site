import { Project } from './todo';
import { addProjectToDOM, displayTodos } from './dom';
import { createProject, createTodo } from './buttons';
import './style.css';
import { loadFromLocalStorage } from './storage';

// initialize webpage with a default project for any generic task
let defaultProject = new Project("Default Project", "This is the default project for any generic tasks", "No due date");

// load in array of projects from local storage
let projects = loadFromLocalStorage();

// if it is the first time using the webpage, the projects array is
// just the default project, but if the default project has saved content,
// set the default project to the first index of the local storage projects
if (projects.length == 0) {
    projects = [defaultProject];
}
else {
    defaultProject = projects[0];
}

// create variable currProject to keep track of current project
let currProject = { current: null };
currProject.current = defaultProject;

const defaultProjectDiv = document.querySelector(".projects .project");

// load in each project from the local storage onto the DOM
projects.forEach((project, index) => {
    addProjectToDOM(project, currProject);
    if (index == 0) {
        displayTodos(defaultProject, defaultProjectDiv)
    }
});

currProject.current = defaultProject;

// add a listener to the new project div that will open up the form to make a new project
const projectDialog = document.querySelector(".new-project-dialog");
const newProjectBtn = document.querySelector("#add-project");
newProjectBtn.addEventListener("click", () => {
    projectDialog.showModal();
});

// add a listener to the new project button to submit the form to create a new project
const newProjectSubmitBtn = document.querySelector("#submit-project");
newProjectSubmitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    createProject(currProject);
    projectDialog.close();
});

// add a listener to the new todo button to submit the form to create a new project
const todoDialog = document.querySelector(".new-todo-dialog");
const newTodoSubmitBtn = document.querySelector("#submit-todo");
newTodoSubmitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    createTodo(currProject.current);
    todoDialog.close();
});

export { currProject, defaultProject, projects };
