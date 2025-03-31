document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
        updateEmptyState();
    }

    function updateEmptyState() {
        emptyState.style.display = todos.length === 0 ? 'block' : 'none';
    }

    function createTodoElement(todo) {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
            <button class="toggle-btn" aria-label="${todo.completed ? 'Mark as incomplete' : 'Mark as complete'}">
                ${todo.completed ? 
                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="completed"><circle cx="12" cy="12" r="10"></circle><path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"></path></svg>' :
                    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>'
                }
            </button>
            <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <button class="delete-btn" aria-label="Delete todo">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
            </button>
        `;

        // Toggle todo completion
        todoItem.querySelector('.toggle-btn').addEventListener('click', () => {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        });

        // Delete todo
        todoItem.querySelector('.delete-btn').addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos();
            renderTodos();
        });

        return todoItem;
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            todoList.appendChild(createTodoElement(todo));
        });
        updateEmptyState();
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        
        if (text) {
            const todo = {
                id: Date.now(),
                text,
                completed: false
            };
            
            todos.push(todo);
            saveTodos();
            renderTodos();
            todoInput.value = '';
        }
    });

    // Initial render
    renderTodos();
});