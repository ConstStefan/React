import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/ToDoItem';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  // Citirea task-urilor din LocalStorage la încărcarea paginii
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    console.log("Stored todos from LocalStorage after reload:", storedTodos);  // Log pentru a verifica dacă citim corect
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);  // Setăm task-urile citite din LocalStorage
    }
  }, []);  // Efectul se execută o singură dată, la montarea componentei

  // Salvarea task-urilor în LocalStorage de fiecare dată când ele se schimbă
  useEffect(() => {
    if (todos.length > 0) {  // Salvăm doar dacă lista de task-uri nu este goală
      localStorage.setItem('todos', JSON.stringify(todos));
      console.log("Todos saved to LocalStorage:", todos);  // Verificăm salvarea task-urilor
    }
  }, [todos]);  // Efectul se execută de fiecare dată când 'todos' se schimbă

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),  // Generăm un ID unic
      text,  // Textul task-ului
      completed: false  // Task-ul nou nu este completat
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));  // Eliminăm task-ul cu ID-ul respectiv
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-list">
        {todos.length > 0 ? (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))
        ) : (
          <p>No tasks yet!</p>
        )}
      </div>
    </div>
  );
}

export default App;
