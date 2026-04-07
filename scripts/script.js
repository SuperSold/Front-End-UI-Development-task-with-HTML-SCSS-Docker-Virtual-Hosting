document.addEventListener("DOMContentLoaded", () => {
  console.log("App Loaded 🚀");

  // =========================
  // ICON HOVER EFFECT
  // =========================
  const iconBoxes = document.querySelectorAll(".icon-box");

  iconBoxes.forEach((box) => {
    box.addEventListener("mouseenter", () => {
      box.style.transform = "scale(1.2)";
    });

    box.addEventListener("mouseleave", () => {
      box.style.transform = "scale(1)";
    });
  });

  // =========================
  // TASK MANAGER
  // =========================

  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const searchInput = document.getElementById("searchInput");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks(filter = "") {
    taskList.innerHTML = "";

    tasks
      .filter(task => task.text.toLowerCase().includes(filter.toLowerCase()))
      .forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task-item");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
          span.style.textDecoration = "line-through";
          span.style.opacity = "0.5";
        }

        // Toggle complete
        span.addEventListener("click", () => {
          tasks[index].completed = !tasks[index].completed;
          saveTasks();
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";

        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();

          li.style.opacity = "0";
          li.style.transform = "translateX(50px)";

          setTimeout(() => {
            tasks.splice(index, 1);
            saveTasks();
          }, 300);
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(searchInput.value);
  }

  addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();

    if (text === "") return;

    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
  });

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTaskBtn.click();
  });

  searchInput.addEventListener("input", (e) => {
    renderTasks(e.target.value);
  });

  renderTasks();
});