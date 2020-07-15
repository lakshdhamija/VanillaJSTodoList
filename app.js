// SELECT ITEMS 
const alert = document.querySelector('.alert');
const form = document.querySelector('.todo-form');

const displayTotal = document.querySelector('.total-tasks');
const displayComplete = document.querySelector('.complete-tasks');
const displayIncomplete = document.querySelector('.incomplete-tasks');
const totalTasks = document.querySelector('.total-tasks span');
const incompleteTasks = document.querySelector('.incomplete-tasks span');
const completeTasks = document.querySelector('.complete-tasks span');

const todo = document.getElementById('todo');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.todo-container');
const list = document.querySelector('.todo-list');
const deleteAllBtn = document.querySelector('.delete-all');
//For Editing
let eElement;
let eFlag = false;

// EVENT LISTENERS
displayTotal.addEventListener('click', dispAll);
displayComplete.addEventListener('click', dispComplete);
displayIncomplete.addEventListener('click', dispIncomplete);
form.addEventListener('submit', addItem); // submit form
deleteAllBtn.addEventListener('click', deleteAll); // delete all items


//FUNCTIONS
function dispAll(){
    const items = document.querySelectorAll('article');
    items.forEach(function(item){
        item.classList.remove('display-none');
    });
}
function dispComplete(){
    const items = document.querySelectorAll('article');
    items.forEach(function(item){
        if(item.classList.contains('incomplete-task')){
            item.classList.add('display-none');
        }
        else
            item.classList.remove('display-none');
    });
}
function dispIncomplete(){
    const items = document.querySelectorAll('article');
    items.forEach(function(item){
        if(item.classList.contains('complete-task'))
            item.classList.add('display-none');
        else
            item.classList.remove('display-none');
    });
}
function addItem(e) { // function to add item
    e.preventDefault();
    const title = todo.value;
    if(title !== '' && eFlag === false){
        const item = document.createElement('article'); // create todo item
        item.classList.add('todo-item'); // add todo item class
        item.classList.add('incomplete-task');
        item.innerHTML = `<button type="button" class="check-btn"><i class="far fa-square"></i></button>
        <p class="title">${title}</p>
        <div class="todo-btn-container">
          <button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
          <button type="button" class="delete-btn"><i class="fas fa-trash-alt"></i></button>
        </div>`;

        // We will access the delete and edit buttons here as this is where we have access to them (as they are within a todo item)
        const checkBtn = item.querySelector('.check-btn');
        const deleteBtn = item.querySelector('.delete-btn');
        const editBtn = item.querySelector('.edit-btn');
        checkBtn.addEventListener('click', checkTodo);
        deleteBtn.addEventListener('click', deleteTodo);
        editBtn.addEventListener('click', editTodo);

        list.appendChild(item); // append this item to our todo-list
        displayAlert('Task has been added', 'green');
        container.classList.add('visibility'); // changing visibility of our container to visible
        calculateInfo();
        reset(); // resetting to original when no items are there
    }
    else if(title !== '' && eFlag === true){
        eElement.innerHTML = title; // assigning the todo list element the new title
        displayAlert('Item has been edited!', 'green');
        reset();
    }
    else{
        displayAlert('Task Cannot Be Empty', 'red');
    }
}
function checkTodo(e){ // check function
    const checkbox = e.currentTarget;
    if(!checkbox.nextElementSibling.classList.contains('check')){
        checkbox.innerHTML = '<i class="far fa-check-square"></i>';
        checkbox.nextElementSibling.classList.add('check');
        checkbox.parentElement.classList.remove('incomplete-task');
        checkbox.parentElement.classList.add('complete-task');
        displayAlert('Task Completed!', 'green');
    }
    else{
        checkbox.innerHTML = '<i class="far fa-square"></i>';
        checkbox.nextElementSibling.classList.remove('check');
        checkbox.parentElement.classList.remove('complete-task');
        checkbox.parentElement.classList.add('incomplete-task');
    }
    calculateInfo();
}
function deleteTodo(e){ // delete function
    const item = e.currentTarget.parentElement.parentElement; // currentTarget -> delButton, currentTarget.parentElement -> todo-btn-container, currentTarget.parentElement.parentElement -> todo-item
    list.removeChild(item); // removing the todo-item
    if(list.children.length === 0){ // if length is 0 then hide from container
        container.classList.remove('visibility');
    }
    displayAlert('Todo task deleted!', 'red');
    calculateInfo();
    reset();
}
function editTodo(e){ // edit function
    // const item = e.currentTarget.parentElement.parentElement; // this is the todo item
    eElement = e.currentTarget.parentElement.previousElementSibling; // this is the text area to enter task
    todo.value = eElement.innerHTML;
    eFlag = true; // since we're editing
    submitBtn.innerHTML = '<i class="far fa-edit"></i>'; // changing to edit icon instead of plus icon
}
function deleteAll(){ // function to delete all tasks
    const todos = document.querySelectorAll('.todo-item');
    if(todos.length > 0){
        todos.forEach((todo) => {
            list.removeChild(todo);
        });
    }
    container.classList.remove('visibility');
    displayAlert('All Tasks Deleted!', 'red');
    calculateInfo();
    reset();
}
function displayAlert(text, color){ // function to display alert
    alert.textContent = text;
    alert.classList.add(color);
    // remove alert
    setTimeout(() => {
        alert.textContent = '';
    alert.classList.remove(color);
    },1000);
}
function calculateInfo(){
    const todos = document.querySelectorAll('.todo-item');
    totalTasks.textContent = todos.length;
    const incomplete = document.querySelectorAll('.incomplete-task');
    incompleteTasks.textContent = incomplete.length;
    const complete = document.querySelectorAll('.complete-task');
    completeTasks.textContent = complete.length;
}
function reset(){ // resetting
    todo.value = '';
    eFlag = false;
    submitBtn.innerHTML = '<i class="fas fa-plus"></i>';
}