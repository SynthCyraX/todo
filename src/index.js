import "./styles/main.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Storage from "./modules/Storage";
import UI from "./modules/UI";

UI.displayProjects();
UI.displayTasks();
UI.renderButton();
UI.deleteButton();

// Eventlistener
const showProjectForm = document.getElementById("showProjectForm");
showProjectForm.addEventListener("click", UI.displayAddProject);

const modalButton = document.getElementById("addTaskModal");
modalButton.addEventListener("click", UI.displayModal);

const overlay = document.getElementById("overlay");
overlay.addEventListener("click", UI.hideModal);

const addProjectButton = document.getElementById("addProjectButton");
addProjectButton.addEventListener("click", Storage.addProject);

const projectContainer = document.getElementById("projectContainer");
projectContainer.addEventListener("click", Storage.deleteProject);

const addTaskButton = document.getElementById("addTaskButton");
addTaskButton.addEventListener("click", Storage.addTask);
