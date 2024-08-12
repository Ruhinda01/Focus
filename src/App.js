import React from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import Today from './pages/Today';
import Completed from './pages/Completed';
import Skipped from './pages/Skipped';
import Upcoming from './pages/Upcoming';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className='main'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Navigate to="/today" replace/>} />
            <Route path="/today" element={<Today />} />
            <Route path="/completed" element={<Completed />} />
            <Route path="/skipped" element={<Skipped />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
