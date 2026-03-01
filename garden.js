// Initialize garden tasks from local storage
let gardenTasks = JSON.parse(localStorage.getItem('grimoire_garden')) || [
    { id: 1, text: "Water the Roses", completed: false, subtasks: ["Fill can", "Check soil"] },
    { id: 2, text: "Prune the Hedges", completed: false, subtasks: [] }
];

function renderGarden() {
    const listElement = document.getElementById('task-list');
    if (!listElement) return;

    listElement.innerHTML = ''; // Clear current list

    gardenTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        // Create the task HTML
        let subtaskHTML = task.subtasks.map(sub => `<li><small>- ${sub}</small></li>`).join('');
        
        li.innerHTML = `
            <div class="task-header">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${task.id})">
                <strong>${task.text}</strong>
            </div>
            <ul class="subtask-list">${subtaskHTML}</ul>
        `;
        listElement.appendChild(li);
    });
}

function toggleTask(id) {
    const task = gardenTasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('grimoire_garden', JSON.stringify(gardenTasks));
        renderGarden();
    }
}

// Initial render
renderGarden();
