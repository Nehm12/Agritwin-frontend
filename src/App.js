import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Adjust the path if necessary
import CreateField from './pages/CreateField';
import Simulation from './pages/Simulation';
import SimulationSet from './pages/SimulationSet';
import Dashboard from './pages/dashboard';
import Settings from './pages/Settings';
import FieldCreation from './pages/CreateField';
import ReportsAnalytics from './pages/reports';
import MyFields from './pages/my_fields';
import MapView from './pages/map';
import FarmSimulation from './pages/simul';
import Login from './pages/login';
import Register from './pages/register';
import AlertsNotifications from './pages/notifation';
import FieldComparison from './pages/comparaison';
import FieldDetail from './pages/details';
import ProtectedRoute from './pages/ProtectedRoute';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        
        {/* Routes protégées */}
        <Route 
          path="/sim" 
          element={
            <ProtectedRoute>
              <FarmSimulation />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create" 
          element={
            <ProtectedRoute>
              <FieldCreation />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/notification" 
          element={
            <ProtectedRoute>
              <AlertsNotifications />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/field" 
          element={
            <ProtectedRoute>
              <FieldDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/My_fields" 
          element={
            <ProtectedRoute>
              <MyFields />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/Reports" 
          element={
            <ProtectedRoute>
              <ReportsAnalytics />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/map" 
          element={
            <ProtectedRoute>
              <MapView />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/field-comparison" 
          element={
            <ProtectedRoute>
              <FieldComparison />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create-field" 
          element={
            <ProtectedRoute>
              <CreateField />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/simulation_set" 
          element={
            <ProtectedRoute>
              <Simulation />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/simulation" 
          element={
            <ProtectedRoute>
              <SimulationSet />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
