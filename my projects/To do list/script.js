const taskList = document.querySelector('.tasks')
const oneTask = document.getElementsByClassName('task')
const taskText = document.getElementsByClassName('taskText')
const taskInput = document.getElementById('taskInput')
const taskCheckBox = document.querySelectorAll('.task input')

console.log(taskList)
console.log(oneTask)
console.log(taskText)
console.log(taskInput)
console.log(taskCheckBox)

//setTask
//showTask
//deleteAll
//deleteEnded
//endTask
let allTasks;
if(localStorage.tasks != null){
    allTasks = JSON.parse(localStorage.tasks)
} else {
    allTasks = []
}

function setTask (){
    if(taskInput.value != ''){
        let taskCont = {
            taskContent: taskInput.value,
            completed: false
        }
        allTasks.push(taskCont)
        localStorage.setItem('tasks',JSON.stringify(allTasks))
        document.getElementById('error').style.display = 'none'
        taskInput.value = ''
    } else {
        document.getElementById('error').style.display = 'block'
    }
    showTask()
    console.log()
    scroll({
        top: 100000
    })
}

function showTask(){
    let tasksHTML = ''
    for(let i = 0; i<allTasks.length; i++){
        if(JSON.parse(localStorage.tasks)[i].completed){
            tasksHTML += `<li class="task">
            <p class="taskText" style="text-decoration: line-through; color: #0005;">${allTasks[i].taskContent}</p>
            <input type="checkbox" onclick="endTask(${i})" checked>
            </li>`
        } else {
            tasksHTML += `<li class="task">
            <p class="taskText">${allTasks[i].taskContent}</p>
            <input type="checkbox" onclick="endTask(${i})">
            </li>`
        }
    }
    taskList.innerHTML = tasksHTML
}

function deleteAll(){
    localStorage.clear('tasks')
    allTasks.splice(0)
    showTask()
}
showTask()

function endTask(i){
    if(oneTask[i].lastElementChild.checked){
        allTasks[i].completed = true
    } else {
        allTasks[i].completed = false
    }
    localStorage.setItem('tasks',JSON.stringify(allTasks))
    if(JSON.parse(localStorage.tasks)[i].completed){
        oneTask[i].firstElementChild.style.textDecoration = 'line-through'
        oneTask[i].firstElementChild.style.color = '#0005'
        oneTask[i].lastElementChild.setAttributeNode(document.createAttribute("checked"))
    } else {
        oneTask[i].firstElementChild.style.textDecoration = 'none'
        oneTask[i].firstElementChild.style.color = '#000'
    }
}
for(let i = 0; i<allTasks.length; i++){
if(JSON.parse(localStorage.tasks)[i].completed){
    oneTask[i].firstElementChild.style.textDecoration = 'line-through'
    oneTask[i].firstElementChild.style.color = '#0005'
    oneTask[i].lastElementChild.setAttributeNode(document.createAttribute("checked"))
} else {
    oneTask[i].firstElementChild.style.textDecoration = 'none'
    oneTask[i].firstElementChild.style.color = '#000'
}
}

function deleteEnded(){
    for (let i = 0; i < allTasks.length; i++) {
        if (JSON.parse(localStorage.tasks)[i].completed) {
            allTasks = allTasks.filter(tempfilter)
        }
    }
    console.log(allTasks)
    localStorage.setItem('tasks',JSON.stringify(allTasks))
    showTask()
}
showTask()

console.log()

function tempfilter(arr){
    return arr.completed == false
}