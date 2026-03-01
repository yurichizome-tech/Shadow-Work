let gardenData = JSON.parse(localStorage.getItem('sov_garden')) || [];

function refreshGarden() {
    const container = document.getElementById('garden');
    if (!container) return;

    container.innerHTML = `
        <div style="padding: 20px; max-width: 500px; margin: auto;">
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="taskInput" placeholder="New Task..." style="flex: 2; background: #000; border: 1px solid #333; color: white; padding: 10px;">
                <input type="text" id="catInput" placeholder="Cat..." style="flex: 1; background: #000; border: 1px solid #333; color: white; padding: 10px;">
                <button onclick="plantTask()" style="background: #d4af37; color: black; border: none; padding: 10px; font-weight: bold; cursor: pointer;">PLANT</button>
            </div>
            <div id="garden-list">
                ${gardenData.map((task, i) => renderTask(task, i)).join('')}
            </div>
        </div>
    `;
}

function plantTask() {
    const name = document.getElementById('taskInput').value;
    const cat = document.getElementById('catInput').value || "General";
    if (name) {
        gardenData.push({ name, cat, subtasks: [], completed: false });
        saveGarden();
    }
}

function renderTask(task, i) {
    return `
        <div class="task-group" style="border: 1px solid #222; margin-bottom: 15px; padding: 15px; background: #0a0a0a; text-align: left;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <small style="color: #d4af37; letter-spacing: 2px;">${task.cat.toUpperCase()}</small>
                <div>
                    <button onclick="moveTask(${i}, -1)" style="background:none; border:none; color:#444; cursor:pointer;">▲</button>
                    <button onclick="moveTask(${i}, 1)" style="background:none; border:none; color:#444; cursor:pointer;">▼</button>
                </div>
            </div>
            <h3 style="margin: 10px 0;">${task.name}</h3>
            <button onclick="addSubtask(${i})" style="font-size: 0.7rem; background: #111; color: #666; border: 1px solid #333; padding: 5px; cursor: pointer;">+ ADD SUBTASK</button>
            <div style="margin-top: 10px;">
                ${task.subtasks.map((sub, si) => `
                    <div onclick="toggleSub(${i}, ${si})" class="subtask ${sub.done ? 'completed' : ''}" 
                         style="padding: 10px; border: 1px solid #222; margin-bottom: 5px; cursor: pointer; color: ${sub.done ? '#d4af37' : '#555'};">
                        ${sub.text}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function moveTask(index, direction) {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < gardenData.length) {
        const temp = gardenData[index];
        gardenData[index] = gardenData[newIndex];
        gardenData[newIndex] = temp;
        saveGarden();
    }
}

function addSubtask(i) {
    if (gardenData[i].subtasks.length >= 9) return alert("Limit of 9 reached.");
    const text = prompt("Enter subtask:");
    if (text) {
        gardenData[i].subtasks.push({ text, done: false });
        saveGarden();
    }
}

function toggleSub(ti, si) {
    gardenData[ti].subtasks[si].done = !gardenData[ti].subtasks[si].done;
    saveGarden();
}

function saveGarden() {
    localStorage.setItem('sov_garden', JSON.stringify(gardenData));
    refreshGarden();
}

// Ensure it loads when called
refreshGarden();
