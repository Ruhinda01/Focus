import React, { useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import TaskModal from './components/TaskModal/TaskModal';
import Today from './pages/Today';
import Completed from './pages/Completed';
import Skipped from './pages/Skipped';
import Upcoming from './pages/Upcoming';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  }
  const editTask = (taskId, updatedTask) => {
    setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
  }
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className='main'>
          <Sidebar openModal={openModal} />
          <Routes>
            <Route path='/' element={<Navigate to="/today" replace/>} />
            <Route path="/today" element={<Today tasks={tasks} addTask={addTask} editTask={editTask} deleteTask={deleteTask} openModal={openModal} />} />
            <Route path="/completed" element={<Completed tasks={tasks} />} />
            <Route path="/skipped" element={<Skipped tasks={tasks} />} />
            <Route path="/upcoming" element={<Upcoming tasks={tasks} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        {isModalOpen && <TaskModal onClose={closeModal} onAddTask={addTask} />}
      </div>
    </Router>
  );
}

export default App;
