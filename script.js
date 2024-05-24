document.addEventListener("DOMContentLoaded", function() {
    const add = document.querySelector("#add-btn");
    const newTaskInput = document.querySelector("#wrapper input");
    const taskContainer = document.querySelector("#tasks");
    const error = document.getElementById("error");
    const countValue = document.querySelector(".count-value");
    let taskCount = 0;

    const displayCount = (taskCount) => {
        countValue.innerText = taskCount;
    };

    const addTask = () => {
        const taskName = newTaskInput.value.trim();
        error.style.display = "none";
        if (!taskName) {
            setTimeout(() => {
                error.style.display = "block";
            }, 200);
            return;
        }
        const taskHTML = `<div class="task">
            <input type="checkbox" class="task-check">
            <span class="taskname">${taskName}</span>
            <input type="text" class="edit-input" style="display: none;">
            <button class="edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>`;
        taskContainer.insertAdjacentHTML("beforeend", taskHTML);
        taskCount++;
        displayCount(taskCount);
        newTaskInput.value = "";
    };

    const deleteTask = (task) => {
        task.remove();
        if (taskCount > 0) {
            taskCount--;
            displayCount(taskCount);
        }
    };

    const editTask = (button) => {
        const taskContainer = button.closest(".task");
        const taskNameSpan = taskContainer.querySelector(".taskname");
        const editInput = taskContainer.querySelector(".edit-input");
        
        if (editInput.style.display === "none" || editInput.style.display === "") {
            taskNameSpan.style.display = "none";
            editInput.value = taskNameSpan.textContent;
            editInput.style.display = "inline-block";
            editInput.focus();
        } else {
            taskNameSpan.textContent = editInput.value;
            taskNameSpan.style.display = "inline";
            editInput.style.display = "none";
        }
    };

    add.addEventListener("click", addTask);

    taskContainer.addEventListener("click", (event) => {
        const target = event.target;
        const task = target.closest(".task");
        if (target.classList.contains("delete")) {
            deleteTask(task);
        } else if (target.classList.contains("edit")) {
            editTask(target);
        } else if (target.classList.contains("task-check")) {
            const taskNameSpan = task.querySelector(".taskname");
            taskNameSpan.classList.toggle("completed", target.checked);
            if (target.checked && taskCount > 0) {
                taskCount--;
            } else if (!target.checked) {
                taskCount++;
            }
            displayCount(taskCount);
        }
    });
});
