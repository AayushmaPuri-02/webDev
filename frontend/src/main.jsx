import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import ShowTask from './ShowTask.jsx';
import NewTask from './NewTask.jsx'; // ✅ ADD THIS BACK
import EditTask from './EditTask.jsx';



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tasks/new" element={<NewTask />} />
                <Route path="/tasks/:id/edit" element={<EditTask />} />
        <Route path="/tasks/:id" element={<ShowTask />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);