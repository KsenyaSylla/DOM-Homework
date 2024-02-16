const tableShedule = document.querySelector(".shedule");

fetch("/schedule.json")
    .then(response => response.json())
    .then(result => {
        makeShedule(result, tableShedule);
    });

function makeShedule(result, container) {
    for (let i = 0; i < result.length; i++) {
        const task = result[i];
        const tRow = `<tr id="${task.id}">
        <th>${task.name}</th>
        <th>${task.time}</th>
        <th>
            <button onclick="signUp(${task.id})">Записаться</button>
            <button onclick="cancel(${task.id})">Отменить запись</button>
        </th>
      </tr>`;
        tableShedule.insertAdjacentHTML("beforeend", tRow);
        localStorage.setItem(task.id, JSON.stringify(task));//объект task в строку JSON 
    }
};

function signUp(id) {
    const task = JSON.parse(localStorage.getItem(id));
    let maxParticipants = task.maxParticipants;
    let currentParticipants = task.currentParticipants;
    if (maxParticipants == currentParticipants) {
        alert("Мест больше нет.");
    } else {
        currentParticipants++;
        task.currentParticipants = currentParticipants;
        localStorage.setItem(id, JSON.stringify(task));
        alert("Вы успешно записаны");
    }
};

function cancel(id) {
    const task = JSON.parse(localStorage.getItem(id));
    let currentParticipants = task.currentParticipants;
    currentParticipants--;
    task.currentParticipants = currentParticipants;
    localStorage.setItem(id, JSON.stringify(task));
    alert("Вы отменили занятие");
};