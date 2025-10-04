import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import CreateField from './pages/CreateField';
import Simulation from './pages/Simulation';
import Dashboard from './pages/dashboard';
import Settings from './pages/Settings';
import AlertsNotifications from './pages/notifation';
import FieldComparison from './pages/comparaison';
import FieldDetail from './pages/details';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notification" element={<AlertsNotifications />}/>
        <Route path="/field" element={<FieldDetail />} />
        <Route path="/field-comparison" element={<FieldComparison />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-field" element={<CreateField />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      
    </Router>
  );
}

export default App;
