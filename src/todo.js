import { projects } from "./index";
import { saveToLocalStorage } from "./storage";

// This class is responsible for the creation of projects
class Project {

    // constructor creates a new project with an array of todos, a title,
    // description, due date, and whether or not it is complete
    constructor(title, description, dueDate) {
        this.todoListClass = new TodoList();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.complete = false;
    }

    // mark a project complete by changing this.complete to true
    markComplete() {
        this.complete = !this.complete;
    }

    // create a new project object from a json file
    static fromJSON(json) {
        const project = new Project(json.title, json.description, json.dueDate);
        project.todoListClass = TodoList.fromJSON(json.todoListClass);
        return project;
    }
}

// This class is responsible for the creation of todos
class Todo {

    // constructor creates a new todo item given a title, description, and due date
    constructor(title, description, dueDate, complete = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.complete = complete;
    }

    // return a new todo object from a json file
    static fromJSON(json) {
        return new Todo(json.title, json.description, json.dueDate, json.completed);
    }

    // swap the completeness of a todo
    markComplete() {
        this.complete = !this.complete;
    }
}

// This class is responsible for the management of todo items in projects
class TodoList {

    // this constructor creates an empty array of todo items
    constructor() {
        this.todoList = [];
    }

    // add a todo item to the array of todos by calling the Todo constructor
    // and pushing the object to the array
    addTodo(title, description, dueDate, complete = false) {
        let newTodo = new Todo(title, description, dueDate, complete);
        this.todoList.push(newTodo);
    }

    // delete a todo item by a given index
    deleteTodo(index) {
        this.todoList.splice(index, 1);
        saveToLocalStorage(projects);
    }

    // fill a todo list from a json file
    static fromJSON(json) {
        const todoList = new TodoList();
        for (const todo of json.todoList) {
            todoList.todoList.push(Todo.fromJSON(todo));
        }
        return todoList;
    }
}

export { Project, Todo, TodoList };