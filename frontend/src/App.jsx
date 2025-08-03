import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import ReadTask from './ReadTask';


function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Failed to fetch tasks:", err));
  }, []);

  return (
    <div style={{
      maxWidth: '900px',
      margin: '2rem auto',
      padding: '0 1rem',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Task List</h1>
        <Link to="/tasks/new">
          <button style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            + Create New Task
          </button>
        </Link>
      </div>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
        boxShadow: '0 0 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Description</th>
            <th style={{ ...thStyle, textAlign: 'center' }}>Completed</th>
            <th style={{ ...thStyle, textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <ReadTask key={task._id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: '1rem',
  borderBottom: '1px solid #ddd',
  textAlign: 'left'
};

export default App;