const todoValue = document.querySelector('.inputElem') as HTMLInputElement;
const addButton = document.querySelector('.addBtn') as HTMLButtonElement;
const todoList = document.querySelector('.Todos') as HTMLUListElement;

interface Todo {
    title: string;
}
var todoArr: Todo[] = JSON.parse(localStorage.getItem('todo') || '[]');
function handleSubmit(event: Event) {
    if (todoValue.value === '') {
        alert('Enter your Todo')
    }
    else {
        const newTodo: Todo =
        {
            title: todoValue.value
        };
        addTodo(newTodo);
        todoArr.push(newTodo);
        saveInlocalStorage();

        todoValue.value = "";
        todoValue.focus();
    }

}
function addTodo(todo: Todo) {
    todoList.insertAdjacentHTML("beforeend",
        `
            <br/>
            <li>
            ${todo.title}
            <button onclick="deleteTodo('${todo.title}')" style="color: red;">Delete</button>
            <button onclick="edit('${todo.title}')" style="color: blue;">Edit</button>
            </li>
            `
    );
}
function saveInlocalStorage() {
    localStorage.setItem('todo', JSON.stringify(todoArr));
}
function write() {
    for (const todo of todoArr) {
        addTodo(todo)
    }
}
function deleteTodo(todoTitle: string) {
    todoArr = todoArr.filter((todo) => todo.title !== todoTitle)
    saveInlocalStorage();
    todoList.innerHTML = "";
    write();
}

function edit(todoTitle: string) {
    if (todoValue.value === '') {
        todoValue.value = todoTitle;
        todoValue.focus();
        deleteTodo(todoTitle);
    }
    else{
        alert('Add your Todo first')
    }

}
window.addEventListener('DOMContentLoaded', write);
addButton.addEventListener('click', handleSubmit);