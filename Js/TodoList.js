"use strict";
const todoValue = document.querySelector('.inputElem');
const addButton = document.querySelector('.addBtn');
const todoList = document.querySelector('.Todos');
var todoArr = JSON.parse(localStorage.getItem('todo') || '[]');
function handleSubmit(event) {
    if (todoValue.value === '') {
        alert('Enter your Todo');
    }
    else {
        const newTodo = {
            title: todoValue.value
        };
        addTodo(newTodo);
        todoArr.push(newTodo);
        saveInlocalStorage();
        todoValue.value = "";
        todoValue.focus();
    }
}
function addTodo(todo) {
    todoList.insertAdjacentHTML("beforeend", `
            <br/>
            <li>
            ${todo.title}
            <button onclick="deleteTodo('${todo.title}')" style="color: red;">Delete</button>
            <button onclick="edit('${todo.title}')" style="color: blue;">Edit</button>
            </li>
            `);
}
function saveInlocalStorage() {
    localStorage.setItem('todo', JSON.stringify(todoArr));
}
function write() {
    for (const todo of todoArr) {
        addTodo(todo);
    }
}
function deleteTodo(todoTitle) {
    todoArr = todoArr.filter((todo) => todo.title !== todoTitle);
    saveInlocalStorage();
    todoList.innerHTML = "";
    write();
}
function edit(todoTitle) {
    if (todoValue.value === '') {
        todoValue.value = todoTitle;
        todoValue.focus();
        deleteTodo(todoTitle);
    }
    else {
        alert('Add your input first');
    }
}
window.addEventListener('DOMContentLoaded', write);
addButton.addEventListener('click', handleSubmit);
