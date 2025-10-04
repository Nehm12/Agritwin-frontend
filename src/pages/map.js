import React, { useState } from 'react';
import { Layers, Plus, Minus, Maximize2, Navigation, MapPin, Droplet, Sun, Activity } from 'lucide-react';
import ChatSupport from './chatbot';
import Navbar from './nav';

const MapView = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState('satellite');
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [selectedField, setSelectedField] = useState(null);

  const fields = [
    { id: 1, name: 'Field Alpha', lat: 40.7128, lng: -74.0060, health: 88, crop: 'Corn', color: 'emerald' },
    { id: 2, name: 'Field Beta', lat: 40.7580, lng: -73.9855, health: 92, crop: 'Wheat', color: 'blue' },
    { id: 3, name: 'Field Gamma', lat: 40.7489, lng: -73.9680, health: 75, crop: 'Soybean', color: 'amber' },
  ];

  const layers = [
    { id: 'satellite', name: 'Satellite', icon: <MapPin className="w-4 h-4" /> },
    { id: 'ndvi', name: 'NDVI', icon: <Activity className="w-4 h-4" /> },
    { id: 'moisture', name: 'Moisture', icon: <Droplet className="w-4 h-4" /> },
    { id: 'temperature', name: 'Temperature', icon: <Sun className="w-4 h-4" /> },
  ];

  const getHealthColor = (health) => {
    if (health >= 85) return 'emerald';
    if (health >= 70) return 'blue';
    return 'amber';
  };

  const getColorClass = (color) => {
    const colors = {
      emerald: 'bg-emerald-500',
      blue: 'bg-blue-500',
      amber: 'bg-amber-500'
    };
    return colors[color];
  };

  return (
    <div className={`h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300 overflow-hidden`}>
      {/* Dashboard Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Map Header avec Layer Button */}
      <div className={`absolute top-16 left-0 right-0 z-40 ${darkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm shadow-sm`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Field Map
            </h1>
            <button 
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors relative`}
            >
              <Layers className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-full pt-28">
        {/* Placeholder Map */}
        <div className={`w-full h-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} relative`}>
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-200 dark:from-gray-700 dark:to-gray-800">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,0,0,.1) 50px, rgba(0,0,0,.1) 51px)',
              backgroundSize: '100% 51px'
            }}></div>
          </div>

          {/* Field Markers */}
          {fields.map((field, index) => {
            const healthColor = getHealthColor(field.health);
            const top = 30 + (index * 20);
            const left = 20 + (index * 25);
            
            return (
              <div
                key={field.id}
                onClick={() => setSelectedField(field)}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${top}%`, left: `${left}%` }}
              >
                <div className="relative">
                  <div className={`w-12 h-12 ${getColorClass(healthColor)} rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse`}>
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded shadow-lg text-xs font-semibold`}>
                    {field.name}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className={`p-3 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg hover:shadow-xl transition-all`}>
              <Plus className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            </button>
            <button className={`p-3 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg hover:shadow-xl transition-all`}>
              <Minus className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            </button>
            <button className={`p-3 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg hover:shadow-xl transition-all`}>
              <Navigation className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            </button>
            <button className={`p-3 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg hover:shadow-xl transition-all`}>
              <Maximize2 className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            </button>
          </div>

          {/* Layer Menu */}
          {showLayerMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowLayerMenu(false)} />
              <div className={`absolute top-20 right-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg z-50 p-2 w-48`}>
                {layers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => {
                      setSelectedLayer(layer.id);
                      setShowLayerMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      selectedLayer === layer.id
                        ? 'bg-emerald-500 text-white'
                        : darkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {layer.icon}
                    <span className="font-medium">{layer.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Selected Field Info */}
          {selectedField && (
            <div className={`absolute bottom-4 left-4 right-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-4 max-w-md animate-slideUp`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedField.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedField.crop}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedField(null)}
                  className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Health</p>
                  <p className={`text-xl font-bold ${selectedField.health >= 85 ? 'text-green-500' : 'text-amber-500'}`}>
                    {selectedField.health}%
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Location</p>
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedField.lat.toFixed(4)}, {selectedField.lng.toFixed(4)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors">
                  View Details
                </button>
                <button className={`flex-1 py-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} ${darkMode ? 'text-white' : 'text-gray-800'} rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors`}>
                  Run Simulation
                </button>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className={`absolute bottom-4 right-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-3 ${selectedField ? 'hidden' : 'block'}`}>
            <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Field Health
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Excellent (85%+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Good (70-84%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Needs Attention (&lt;70%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Support */}
      <ChatSupport />

      {/* Custom Animation */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MapView;