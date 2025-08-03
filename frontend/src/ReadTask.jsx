import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ReadTask({ task }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:8080/tasks/${task._id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        window.location.reload(); // Refresh the list after deletion
      } else {
        console.error("Failed to delete task");
      }
    } catch (err) {
      console.error("Delete error:", err);
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