document.addEventListener('DOMContentLoaded', function() {
    const storedActivities = JSON.parse(localStorage.getItem('activities')) || [];
    const todoList = document.getElementById('todolist');
    let currentFilter = 'all';

    function renderList() {
        todoList.innerHTML = "";
        storedActivities.forEach((activity, index) => {
            if (currentFilter === 'all' || activity.status.toLowerCase() === currentFilter) {
                const activityItem = document.createElement('div');
                activityItem.innerHTML = `
                    <label class="activity-row">
                        <input type="checkbox" onchange="toggleStatus(${index})" ${activity.status === 'Done' ? 'checked' : ''}>
                        <span>${activity.name} - ${activity.status}</span>
                        <button onclick="removeActivity(${index})">Remove</button>
                    </label>
                `;
                todoList.appendChild(activityItem);
            }
        });
    }

    renderList();

    document.getElementById('addActivity').addEventListener('click', function() {
        const activityName = document.getElementById('activity').value;
        if (activityName.trim() !== "") {
            const newActivity = {
                name: activityName,
                status: "Incomplete"
            };

            storedActivities.push(newActivity);
            localStorage.setItem('activities', JSON.stringify(storedActivities));
            renderList();
            document.getElementById('activity').value = "";
        }
    });

    window.toggleStatus = function(index) {
        storedActivities[index].status = storedActivities[index].status === "Incomplete" ? "Done" : "Incomplete";
        localStorage.setItem('activities', JSON.stringify(storedActivities));
        renderList();
    };

    window.removeActivity = function(index) {
        storedActivities.splice(index, 1);
        localStorage.setItem('activities', JSON.stringify(storedActivities));
        renderList();
    };

    window.applyFilter = function() {
        currentFilter = document.getElementById('statusFilter').value;
        renderList();
    };
});

