import { useEffect, useState } from 'react';
import './App.css';
import {FaPlus, FaTrash} from 'react-icons/fa';
import {AiOutlineCheck} from 'react-icons/ai';
import {MdEdit} from 'react-icons/md';
import {SiTodoist} from 'react-icons/si';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("")
  
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTodo = {
      id: Date.now(),
      text: todo,
      completed: false
    }

    setTodos([...todos].concat(newTodo))
    setTodo("")
  }

  const deleteTodo = (id) => {
     const updatedTodos = [...todos].filter((todo) => 
     todo.id !== id)

     setTodos(updatedTodos)
  }

  const toggleComplete = (id) => {
    const updatedTodos = [...todos].map( (todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    } )

    setTodos(updatedTodos)
  }

  const editTodo = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
    setEditingText("")
  }


  return (
    <div className="container">
      <div className='app-wrapper'>
        <h1><span className='todo-container'><SiTodoist className='todo-icon'/></span>TODO APP</h1>
        <form onSubmit={ handleSubmit }>
          <input
            className='todo-input'
            type="text"
            placeholder='Enter a todo...'
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            required
          />
          {/* Add Todo button */}
          <button className='add-todo' type='submit' >
            <FaPlus className='add-todo-icon' />
          </button>
        </form>
        <div className='form-container'></div>
        {todos.map( (todo) => 
          <div key={todo.id} className="form-container" >

            { todoEditing === todo.id 
              ? 
              (<input 
               type="text"  
               className='edit-text'
               placeholder='Edit todo...'
               onChange={ (e) => setEditingText(e.target.value) } 
               value={editingText} 
               required
             />) : (<div className='todo-list'>
               <p className='todo-text'>
                 {todo.text}
                </p>
                <Checkbox
                  className='checkBox'
                  {...label}
                  sx={{
                  color: pink[800],
                  '&.Mui-checked': {
                  color: pink[600],
                  },
                  }}
                />
              </div>) 
            }

            <button onClick={ () => deleteTodo(todo.id)} className="delete-button">
                <FaTrash className='delete-icon' />
            </button>

            {/* <input 
              type="checkbox" 
              onChange={ () => toggleComplete(todo.id) } 
              checked={todo.completed} 
              className="checkbox"
            /> */}
            
           
            

            { todoEditing === todo.id 
              ? 
              (<button onClick={ () => editTodo(todo.id) } className="submitEdit-button" >
              <AiOutlineCheck className="submitEdit-icon" />
           </button>) 
              : 
              (<button onClick={() => setTodoEditing(todo.id)}className="edit-button" >
              <MdEdit className="edit-icon" />
           </button>)
            }

          </div> )
        }

      </div>
    </div>
  );




}

export default App;
