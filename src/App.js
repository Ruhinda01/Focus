import React, { useState, useEffect } from 'react';
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
  const [selectedTask, setSelectedTask] = useState(null);
  const [health, setHealth] = useState(100);
  const [experience, setExperience] = useState(0);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    const taskWithDependencies = { ...newTask, status: 'pending', dependsOn: newTask.dependsOn || [] };
    setTasks([...tasks, taskWithDependencies]);
  }
  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? { ...task, ...updatedTask } : task));
    console.log("Updated Tasks:", tasks);
  }
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  const completeTask = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: 'completed' } : task));
    setExperience(prevExp => prevExp + 10);
  }
  
  const skipTask = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        task.status = 'skipped';
        setHealth(prevHealth => prevHealth - 10);
      }
      return task;
    }));
  }

  const pendingTask = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        task.status = 'pending';
      }
      return task;
    }));
  }

  const deleteTaskFromSkipped = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setHealth(prevHealth => Math.max(0, prevHealth - 5));
    setExperience(prevExp => Math.max(0, prevExp - 5));
  }

  const openModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  
  const closeModal = () => setIsModalOpen(false);

  return (
    <Router>
      <div className="App">
        <Header health={health} experience={experience} />
        <div className='main'>
          <Sidebar openModal={openModal} />
          <Routes>
            <Route path='/' element={<Navigate to="/today" replace/>} />
            <Route path="/today" element={
              <Today
              tasks={tasks.filter(task => task.status === 'pending')}
              addTask={addTask}
              editTask={editTask}
              deleteTask={deleteTask}
              openModal={openModal}
              completeTask={completeTask}
              skipTask={skipTask} />} />
            <Route path="/completed" element={
              <Completed
              tasks={tasks.filter(task => task.status === 'completed')}
              pendingTask={pendingTask}
              deleteTask={deleteTask} />} />
            <Route path="/skipped" element={
              <Skipped
              tasks={tasks.filter(task => task.status === 'skipped')}
              pendingTask={pendingTask}
              deleteTask={deleteTaskFromSkipped} />} />
            <Route path="/upcoming" element={
              <Upcoming
              tasks={tasks}
              addTask={addTask}
              editTask={editTask}
               />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        {isModalOpen && (
          <TaskModal
            onClose={closeModal}
            onAddTask={addTask}
            onEditTask={editTask}
            task={selectedTask}
            existingTasks={tasks} />)}
      </div>
    </Router>
  );
}

export default App;
