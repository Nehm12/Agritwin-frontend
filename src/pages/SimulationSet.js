import React, { useState } from 'react';
import { ArrowLeft, Droplet, Package, Cloud, Bug, Play, RotateCcw, Info } from 'lucide-react';

const SimulationSetup = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedField, setSelectedField] = useState('field-alpha');
  const [irrigationAmount, setIrrigationAmount] = useState(70);
  const [fertilizationAmount, setFertilizationAmount] = useState(50);
  const [climateScenario, setClimateScenario] = useState('normal');
  const [duration, setDuration] = useState(90);

  const fields = [
    { id: 'field-alpha', name: 'Field Alpha - Corn (50 ha)' },
    { id: 'field-beta', name: 'Field Beta - Wheat (75 ha)' },
    { id: 'field-gamma', name: 'Field Gamma - Soybean (60 ha)' }
  ];

  const climateScenarios = [
    { id: 'normal', name: 'Normal Conditions', icon: <Cloud className="w-5 h-5" />, desc: 'Standard weather patterns' },
    { id: 'drought', name: 'Drought', icon: <Cloud className="w-5 h-5" />, desc: 'Low rainfall, high temperatures' },
    { id: 'excess-rain', name: 'Excess Rain', icon: <Droplet className="w-5 h-5" />, desc: 'Heavy precipitation' },
    { id: 'heatwave', name: 'Heatwave', icon: <Cloud className="w-5 h-5" />, desc: 'Extreme high temperatures' }
  ];

  const handleReset = () => {
    setIrrigationAmount(70);
    setFertilizationAmount(50);
    setClimateScenario('normal');
    setDuration(90);
  };

  const handleRunSimulation = () => {
    const params = {
      field: selectedField,
      irrigation: irrigationAmount,
      fertilization: fertilizationAmount,
      climate: climateScenario,
      duration
    };
    console.log('Running simulation with:', params);
    alert('Simulation started! Results will be available in a few moments.');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => window.history.back()}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            </button>
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Setup Simulation
            </h1>
            <button 
              onClick={handleReset}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              <RotateCcw className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Info Banner */}
        <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-xl p-4 border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
          <div className="flex items-start gap-3">
            <Info className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'} shrink-0 mt-0.5`} />
            <div>
              <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                Configure different scenarios to predict outcomes and optimize your farming practices
              </p>
            </div>
          </div>
        </div>

        {/* Field Selection */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Select Field
          </h2>
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none`}
          >
            {fields.map(field => (
              <option key={field.id} value={field.id}>{field.name}</option>
            ))}
          </select>
        </div>

        {/* Irrigation Settings */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Droplet className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Irrigation Amount
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Water volume
              </span>
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {irrigationAmount}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={irrigationAmount}
              onChange={(e) => setIrrigationAmount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Minimal</span>
              <span>Standard</span>
              <span>Maximum</span>
            </div>
          </div>
        </div>

        {/* Fertilization Settings */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Fertilization Amount
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                NPK dosage
              </span>
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {fertilizationAmount}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={fertilizationAmount}
              onChange={(e) => setFertilizationAmount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>None</span>
              <span>Moderate</span>
              <span>High</span>
            </div>
          </div>
        </div>

        {/* Climate Scenario */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Climate Scenario
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {climateScenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setClimateScenario(scenario.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  climateScenario === scenario.id
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : darkMode
                      ? 'border-gray-700 hover:border-gray-600'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    climateScenario === scenario.id
                      ? 'bg-emerald-100 dark:bg-emerald-800 text-emerald-600'
                      : darkMode
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    {scenario.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${
                      climateScenario === scenario.id
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : darkMode
                          ? 'text-white'
                          : 'text-gray-900'
                    }`}>
                      {scenario.name}
                    </h3>
                    <p className={`text-sm ${
                      climateScenario === scenario.id
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : darkMode
                          ? 'text-gray-400'
                          : 'text-gray-600'
                    }`}>
                      {scenario.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Simulation Duration
          </h2>
          <div className="flex gap-4">
            {[30, 60, 90, 120].map((days) => (
              <button
                key={days}
                onClick={() => setDuration(days)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  duration === days
                    ? 'bg-emerald-500 text-white shadow-md'
                    : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {days} days
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className={`${darkMode ? 'bg-gradient-to-r from-emerald-900/30 to-green-900/30' : 'bg-gradient-to-r from-emerald-50 to-green-50'} rounded-xl p-6 border ${darkMode ? 'border-emerald-800' : 'border-emerald-200'}`}>
          <h3 className={`font-bold mb-3 ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>
            Simulation Summary
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>Field:</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-emerald-900'}`}>
                {fields.find(f => f.id === selectedField)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>Irrigation:</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-emerald-900'}`}>
                {irrigationAmount}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>Fertilization:</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-emerald-900'}`}>
                {fertilizationAmount}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>Climate:</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-emerald-900'}`}>
                {climateScenarios.find(s => s.id === climateScenario)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>Duration:</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-emerald-900'}`}>
                {duration} days
              </span>
            </div>
          </div>
        </div>

        {/* Run Simulation Button */}
        <button
          onClick={handleRunSimulation}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
        >
          <Play className="w-6 h-6" />
          Run Simulation
        </button>
      </main>
    </div>
  );
};

export default SimulationSetup;