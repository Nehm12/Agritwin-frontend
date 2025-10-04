import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/register';
import CreateField from './pages/CreateField';
import Simulation from './pages/Simulation';
import SimulationSet from './pages/SimulationSet';
import Dashboard from './pages/dashboard';
import Settings from './pages/Settings';
import FieldCreation from './pages/CreateField';
import ReportsAnalytics from './pages/reports';
import MapView from './pages/map';
import AlertsNotifications from './pages/notifation';
import FieldComparison from './pages/comparaison';
import FieldDetail from './pages/details';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<FieldCreation />} />
        <Route path="/notification" element={<AlertsNotifications />}/>
        <Route path="/field" element={<FieldDetail />} />
        <Route path="/Reports" element={<ReportsAnalytics />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/field-comparison" element={<FieldComparison />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-field" element={<CreateField />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/simulation_set" element={<SimulationSet />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      
    </Router>
  );
}

export default App;
