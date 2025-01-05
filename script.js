function addTask() {
    const taskInput = document.getElementById('newTask');
    const descriptionInput = document.getElementById('newDescription');
    const deadlineInput = document.getElementById('deadline');
    const taskText = taskInput.value.trim();
    const descriptionText = descriptionInput.value.trim();
    const deadlineText = deadlineInput.value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${taskText}</span>
        <span>${descriptionText}</span>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.onclick = function() {
        taskList.removeChild(listItem);
        clearTimeout(listItem.timer);
    };

    listItem.appendChild(deleteButton);
    listItem.onclick = function() {
        listItem.classList.toggle('completed');
    };

    if (deadlineText) {
        const deadline = new Date(deadlineText);
        const now = new Date();
        const difference = deadline - now;

        if (difference > 0) {
            listItem.timer = setTimeout(function() {
                playAlarm();
                alert(`Deadline reached for task: ${taskText}`);
            }, difference);
        }
    }

    taskList.appendChild(listItem);
    taskInput.value = '';
    descriptionInput.value = '';
    deadlineInput.value = '';
}

function toggleNightMode() {
    document.body.classList.toggle('night-mode');
}

function playAlarm() {
    const alarmSound = document.getElementById('alarmSound');
    alarmSound.play();
}
