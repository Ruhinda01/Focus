import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import TaskModal from './components/TaskModal/TaskModal';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Today from './pages/Today';
import Completed from './pages/Completed';
import Skipped from './pages/Skipped';
import Upcoming from './pages/Upcoming';
import Focus from './pages/Focus';
import NotFound from './pages/NotFound';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNotification } from './components/Notifications/NotificationContext';
import NotificationContainer from './components/Notifications/NotificationContainer';
import { useAuth } from './components/Auth/AuthContext';


function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [health, setHealth] = useState(100);
  const [experience, setExperience] = useState(0);
  const [focusedTask, setFocusedTask] = useState(null);

  console.log("Focused Task:", focusedTask);

  const { addNotification } = useNotification();
  const { currentUser } = useAuth();

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const checkDueDates = () => {
      const today = new Date().toDateString();
      setTasks(prevTasks =>
        prevTasks.map(task => {
          const taskDate = new Date(task.dueDate).toDateString();
          if (taskDate === today && task.status !== 'completed' && task.status !== 'skipped') {
            return { ...task, status: 'pending' };
          }
          return task;
        })
      );
    };
    checkDueDates();
    const interval = setInterval(checkDueDates, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nextPendingTask = tasks.find(task => task.status === 'pending');
    if (nextPendingTask) {
      setFocusedTask(nextPendingTask);
    } else {
      setFocusedTask(null);
    }
  }, [tasks, focusedTask]);

  const addTask = (newTask) => {
    const today = new Date().toDateString();
    const taskDate = new Date(newTask.dueDate).toDateString();
    const updatedTask = { ...newTask, status: taskDate === today ? 'pending' : 'upcoming' };
    setTasks([...tasks, updatedTask]);
    addNotification('Task added successfully!', 'success');
  }
  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? { ...task, ...updatedTask } : task));
    // console.log("Updated Tasks:", tasks);
    addNotification('Task updated.', 'info');
  }
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    addNotification('Task deleted.', 'info');
  }

  const completeTask = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: 'completed' } : task));
    setExperience(prevExp => prevExp + 10);
    addNotification('Task completed successfully!', 'success');
  };

  const skipTask = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        task.status = 'skipped';
        setHealth(prevHealth => prevHealth - 10);
        addNotification('Task Skipped. You lost 10 health points.', 'failure');
      }
      return task;
    }));
  }

  const pendingTask = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        if (task.status === 'skipped') {
          setHealth(prevHealth => Math.min(100, prevHealth + 5));
          addNotification('You\'re back! You gained 5 health points. Keep up the good work!', 'success');
        }
        task.status = 'pending';
      }
      return task;
    }));
  }

  const deleteTaskFromSkipped = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setHealth(prevHealth => Math.max(0, prevHealth - 5));
    setExperience(prevExp => Math.max(0, prevExp - 5));
    addNotification('Task deleted from skipped list. You lost 5 health and experience points.', 'failure');
  }

  const openModal = (task = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  
  const closeModal = () => setIsModalOpen(false);

  return (
    <Router>
      <div className='flex h-screen'>      
        <NotificationContainer />
        {currentUser && <Sidebar openModal={openModal} />}
        <div className='flex flex-col flex-1'>
          {currentUser && <Header health={health} experience={experience} />}
          <main className='flex-1 overflow-y-auto'>
            <Routes>
              <Route path='/' element={<Navigate to={currentUser ? '/today' : '/home'} replace/>} />
              <Route path='/home' element={<LandingPage />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path="/today" element={
                <ProtectedRoute>
                  <Today
                  tasks={tasks.filter(task => task.status === 'pending')}
                  addTask={addTask}
                  editTask={editTask}
                  deleteTask={deleteTask}
                  openModal={openModal}
                  completeTask={completeTask}
                  skipTask={skipTask}
                  setFocusedTask={setFocusedTask}
                  setTasks={setTasks} />
                </ProtectedRoute>} />
              <Route path="/completed" element={
                <ProtectedRoute>
                  <Completed
                  tasks={tasks.filter(task => task.status === 'completed')}
                  pendingTask={pendingTask}
                  deleteTask={deleteTask}
                  setTasks={setTasks} />
                </ProtectedRoute>} />
              <Route path="/skipped" element={
                <ProtectedRoute>
                  <Skipped
                  tasks={tasks.filter(task => task.status === 'skipped')}
                  pendingTask={pendingTask}
                  deleteTask={deleteTaskFromSkipped}
                  setTasks={setTasks} />
                </ProtectedRoute>} />
              <Route path="/upcoming" element={
                <ProtectedRoute>
                  <Upcoming
                  tasks={tasks.filter(task => task.status === 'upcoming')}
                  addTask={addTask}
                  editTask={editTask}
                  deleteTask={deleteTask} />
                </ProtectedRoute>} />
              <Route path="/focus" element={
                <ProtectedRoute>
                  <Focus
                  task={focusedTask}
                  upcomingTask = {tasks.find(task => task.status === 'pending' && task.id !== focusedTask?.id)}
                  completeTask={completeTask}
                  skipTask={skipTask}
                  deleteTask={deleteTask} />
                </ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          {currentUser && <Footer />}
        </div>
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
