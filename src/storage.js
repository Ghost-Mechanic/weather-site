import { Project } from "./todo";

// this function will save a list of projects to local storage in JSON form
function saveToLocalStorage(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// this function will load in a list of projects from local storage
function loadFromLocalStorage() {
    const projectsJSON = localStorage.getItem('projects');
    if (projectsJSON) {
        const projectsArray = JSON.parse(projectsJSON);
        return projectsArray.map(Project.fromJSON);
    }
    return [];
}

export { saveToLocalStorage, loadFromLocalStorage };