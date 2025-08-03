import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ReadTask({ task }) {
  const navigate = useNavigate();

const handleDelete = async () => {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks/${task._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error("Delete failed");
    }

    window.location.reload(); // Or call a prop to refresh task list
  } catch (err) {
    console.error("Failed to delete task:", err);
  }
};
  return (
    <tr className="border-b">
      {/* Title */}
      <td className="p-4 font-bold text-blue-600 hover:underline">
        <Link to={`/tasks/${task._id}`}>
          {task.title}
        </Link>
      </td>

      {/* Description */}
      <td className="p-4 text-gray-700">
        {task.description}
      </td>

      {/* Completed Status */}
      <td className="p-4 text-center font-semibold">
        {task.completed ? (
          <span className="text-green-600 flex items-center justify-center gap-1">
            <i className="fa-solid fa-circle-check"></i> Done
          </span>
        ) : (
          <span className="text-gray-500 flex items-center justify-center gap-1">
            <i className="fa-regular fa-circle"></i> Not Done
          </span>
        )}
      </td>

      {/* Action Buttons */}
      <td className="p-4 text-center">
        <Link to={`/tasks/${task._id}/edit`} className="text-yellow-500 hover:text-yellow-600 mr-3">
          <i className="fa-solid fa-pen-to-square" title="Edit"></i>
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-600"
          title="Delete"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}

export default ReadTask;