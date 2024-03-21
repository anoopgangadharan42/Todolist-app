import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo } from './Todostore/todoSlice';

function App() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const handleAddTodo = () => {
    if (text.trim() !== '') {
      dispatch(addTodo({
        id: Date.now(),
        text,
        completed: false,
      }));
      setText('');
    }
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };

  return (
    <div className='text-center'>
      <h1 >My Todo List</h1>
      <input 
        type="text" 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder=""
      />
      <button  className='bg-info'  onClick={handleAddTodo}>sumbit</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => handleToggleTodo(todo.id)} 
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={() => handleDeleteTodo(todo.id)}><i className="fa-solid fa-trash"></i></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
