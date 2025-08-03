import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ShowTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

useEffect(() => {
  const token = localStorage.getItem('token');
  fetch(`http://localhost:8080/tasks/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => setTask(data))
    .catch(err => console.error("Error fetching task:", err));
}, [id]);

const toggleCompleted = async () => {
  try {
    const token = localStorage.getItem('token');
    const updated = { ...task, completed: !task.completed };
    const res = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updated),
    });
    const data = await res.json();
    setTask(data);
  } catch (err) {
    console.error("Error updating task:", err);
  }
};

const confirmDelete = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.ok) {
      setShowConfirm(false);
      navigate('/');
    } else {
      throw new Error("Delete failed");
    }
  } catch (err) {
    console.error("Delete error:", err);
  }
};

  if (!task) return <h2 className="p-8 text-lg">Loading...</h2>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Task Details</h2>

        <p className="mb-3"><span className="font-semibold">Title:</span> {task.title}</p>
        <p className="mb-3"><span className="font-semibold">Description:</span> {task.description}</p>
        <p className="mb-3">
          <span className="font-semibold">Due Date:</span>{' '}
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}
        </p>

        <div className="mb-6 flex items-center gap-3">
          <span className="font-semibold">Status:</span>
          <button
            onClick={toggleCompleted}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
              ${task.completed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}
            `}
          >
            {task.completed ? (
              <>
                <i className="fa-solid fa-circle-check"></i> Done
              </>
            ) : (
              <>
                <i className="fa-regular fa-circle"></i> Not Done
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-4">
          <button
            onClick={() => navigate(`/tasks/${id}/edit`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            🗑️ Delete
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            ← Back
          </button>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg text-center shadow-lg">
              <p className="mb-4">Are you sure you want to delete this task?</p>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded mr-2 hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowTask;