let addTask = () => {
    let input = document.getElementById('taskInput').value;
    let html = ' <input type="checkbox" class="task-complete form-check-input">\n' +
        '<label class="task-content form-check-label">' + input + '</label>\n' +
        '<div class="task-pri">\n' +
        '<input type="checkbox" class="task-pri-check">\n' +
        '<div class="bi bi-star"></div>\n' +
        '</div>';;
    document.getElementById('task-main').appendChild(document.createElement("div"));
    document.getElementById('task-main').lastElementChild.classList.add("task-item", "form-check");
    document.getElementById('task-main').lastElementChild.innerHTML = html;
    document.getElementById('taskInput').value = '';
    updateTaskList();
    updateTaskDone();
}
var taskPriCheck;
var taskDone;

updateTaskList = () => {
    //Chose all proritised checkbox
    taskPriCheck = document.querySelectorAll(".task-pri-check");
    //Grant event when click to each proritised checkbox
    taskPriCheck.forEach(check => check.addEventListener('change', ($event) => {
        if ($event.target.checked === true) {
            //if proritised checkbox is clicked then star icon bootstrap class will be changed to filled icon
            $event.target.nextElementSibling.className = 'bi bi-star-fill'
            const div = $event.target.parentElement;
            const checkInput = div.parentElement.firstElementChild;
            if (checkInput.checked === true) {
                //if task is done then move this task to field "done tasks" at the first position
                document.getElementById('task-done').insertBefore(div.parentElement, document.getElementById('task-done').firstElementChild)
            } else {
                //if task is not done then move this task to field "to do tasks" at the first position
                document.getElementById('task-main').insertBefore(div.parentElement, document.getElementById('task-main').firstElementChild)
            }
        } else {
            //if proritised checkbox is unclicked then star icon bootstrap class will be changed to normal icon
            $event.target.nextElementSibling.className = 'bi bi-star'
            const div = $event.target.parentElement;
            const checkInput = div.parentElement.firstElementChild;
            if (checkInput.checked === true) {
                //if task is done then move this task to field "done tasks" at the last position
                document.getElementById('task-done').appendChild(div.parentElement);
            } else {
                //if task is not done then move this task to field "to do tasks" at the last position
                document.getElementById('task-main').appendChild(div.parentElement);
            }
        }
    }))
}


updateTaskDone = () => {
    //Chose all done checkbox
    taskDoneCheck = document.querySelectorAll(".task-complete");
    //Grant event when click to each done checkbox
    taskDoneCheck.forEach(check => check.addEventListener('change', ($event) => {
        if ($event.target.checked === true) {
            const label = $event.target.nextElementSibling;
            const div = label.nextElementSibling;
            const star = div.lastElementChild
            if (star.className === 'bi bi-star-fill') {
                //if the task is done and prioritised then move this task to the field "done tasks" at the first position
                document.getElementById('task-done').insertBefore($event.target.parentElement, document.getElementById('task-done').firstElementChild)
            } else {
                //if the task is done and not prioritised then move this task to the field "done tasks" at the last position
                document.getElementById('task-done').appendChild($event.target.parentElement)
            }
        } else {
            const label = $event.target.nextElementSibling;
            const div = label.nextElementSibling;
            const star = div.lastElementChild
            if (star.className === 'bi bi-star-fill') {
                //if the task is not done and prioritised then move this task to the field "to do tasks" at the first position
                document.getElementById('task-main').insertBefore($event.target.parentElement, document.getElementById('task-main').firstElementChild)
            } else {
                //if the task is not done and not prioritised then move this task to the field "to do tasks" at the last position
                document.getElementById('task-main').appendChild($event.target.parentElement)
            }
        }
    }))
}

const btnAdd = document.getElementById("add");
btnAdd.addEventListener('click', addTask)

const addInput = document.getElementById('taskInput');
addInput.addEventListener("keypress", (_event) => {
    if (_event.key === 'Enter') {
        _event.preventDefault();
        btnAdd.click();
    }
})