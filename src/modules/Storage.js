import Project from "./Project";
import Task from "./Task";
import UI from "./UI";

export default class Storage {
  //get and set items from the local storage

  static addProject(e) {
    e.preventDefault();

    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    let inputProjectName = document.getElementById("projectName").value;

    if (projects.some((project) => project.name === inputProjectName)) {
      alert("This project already exists. Choose another name, please.");
      return;
    }
    const project = new Project(inputProjectName);

    projects.push(project);

    localStorage.setItem("projects", JSON.stringify(projects));

    UI.displayProjects(inputProjectName);
    UI.displayAddProject();
    UI.renderButton();
  }
  static deleteProject(e) {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    if (e.target.closest(".delete-project-button")) {
      const index = parseInt(
        e.target.closest(".delete-project-button").getAttribute("data-index")
      );

      if (index >= 0 && index < projects.length) {
        projects.splice(index, 1);

        localStorage.setItem("projects", JSON.stringify(projects));

        UI.displayProjects();
        UI.displayTasks();
        UI.renderButton();
      }
    }
  }
  static addTask(e) {
    e.preventDefault();

    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    let inputTaskName = document.getElementById("taskName").value.trim();
    let inputTaskDescription = document
      .getElementById("taskDescription")
      .value.trim();
    let inputTaskDate = document.getElementById("taskDate").value;
    let inputTaskPriority = document.getElementById("taskPriority").value;
    let inputTaskProject = document.getElementById("projectTitle").innerHTML;

    let selectedProjectIndex = projects.findIndex(
      (project) => project.name === inputTaskProject
    );

    const task = new Task(
      inputTaskName,
      inputTaskDescription,
      inputTaskDate,
      inputTaskPriority,
      inputTaskProject
    );

    if (selectedProjectIndex !== -1) {
      projects[selectedProjectIndex].tasks.push(task);

      localStorage.setItem("projects", JSON.stringify(projects));

      UI.displayProjects();
      UI.displayTasks(inputTaskProject);
      UI.renderButton();
      UI.deleteButton();
      UI.hideModal();
    } else {
      console.error("Selected project not found");
    }
  }
  static deleteTask(e) {
    const projectName = e.target.getAttribute("data-project");
    const taskName = e.target.getAttribute("data-task");

    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    projects = projects.map((project) => {
      if (project.name === projectName) {
        project.tasks = project.tasks.filter((task) => task.name !== taskName);
      }
      return project;
    });

    localStorage.setItem("projects", JSON.stringify(projects));

    UI.displayProjects();
    UI.displayTasks();
    UI.renderButton();
    UI.deleteButton();
  }
}
