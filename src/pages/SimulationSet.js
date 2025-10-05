import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Droplets, Leaf, ArrowLeft, Package, Cloud, Info, Crop } from 'lucide-react';
import axios from 'axios';
import ChatSupport from './chatbot';
import Navbar from './nav'; // Import de la navbar

// Composant Formulaire de Configuration
const SimulationSetup = ({ onStartSimulation, darkMode, setDarkMode }) => {
  const [selectedField, setSelectedField] = useState('Field Alpha');
  const [selectedCrop, setSelectedCrop] = useState('Corn');
  const [area, setArea] = useState(50);
  const [irrigationAmount, setIrrigationAmount] = useState(70);
  const [fertilizationAmount, setFertilizationAmount] = useState(50);
  const [climateScenario, setClimateScenario] = useState('Normal');
  const [duration, setDuration] = useState(90);

  const [fields, setFields] = useState([]);
  const [cropTypes, setCropTypes] = useState([]);
  
  useEffect(() => {
    loadFields();
    loadCrops();
  }, []);
  
  const loadFields = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fields');
      setFields(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const loadCrops = async () => {
    try {
      const response = await axios.get('http://localhost:5000/crops');
      setCropTypes(response.data);
      console.log(response.data);
      console.log(cropTypes);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const climateScenarios = [
    { id: 'Normal', name: 'Normal Conditions', icon: <Cloud className="w-5 h-5" />, desc: 'Standard weather patterns' },
    { id: 'Dry', name: 'Drought', icon: <Cloud className="w-5 h-5" />, desc: 'Low rainfall, high temperatures' },
    { id: 'Wet', name: 'Excess Rain', icon: <Droplets className="w-5 h-5" />, desc: 'Heavy precipitation' }
  ];

  const handleReset = () => {
    setSelectedField('Field Alpha');
    setSelectedCrop('Corn');
    setArea(50);
    setIrrigationAmount(70);
    setFertilizationAmount(50);
    setClimateScenario('Normal');
    setDuration(90);
  };

  const handleRunSimulation = () => {
    const config = {
      field: selectedField,
      crop: selectedCrop,
      area: area,
      irrigation: irrigationAmount,
      fertilization: fertilizationAmount,
      climate: climateScenario,
      duration: duration
    };
    onStartSimulation(config);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Utilisation de la Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content - Ajout de padding-top pour compenser la navbar fixe */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pt-24">
        
        {/* Info Banner */}
        <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-xl p-4 border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
          <div className="flex items-start gap-3">
            <Info className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'} shrink-0 mt-0.5`} />
            <div>
              <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                Configurez différents scénarios pour prédire les résultats et optimiser vos pratiques agricoles
              </p>
            </div>
          </div>
        </div>

        {/* Field Selection */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Sélectionner le Champ
          </h2>
          
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none`}
            placeholder="Nom du champ"
            required
          >           
            <option value="">
              { fields.length === 0 
                ? "Aucun champs disponible "
                : "Sélectionnez un champs"
              }
            </option>
            {fields.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Crop Selection */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Type de Culture
          </h2>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none`}
            placeholder="Type de culture"
            required
          >           
            <option value="">
              { cropTypes.length === 0 
                ? "Aucun type de culture disponible "
                : "Sélectionnez un types de culture"
              }
            </option>
            {cropTypes.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Area */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Surface
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Superficie du champ
              </span>
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {area} ha
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={area}
              onChange={(e) => setArea(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        {/* Irrigation Settings */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Droplets className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Irrigation
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Volume d'eau
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
              Fertilisation
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Dosage NPK
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
              <span>Aucun</span>
              <span>Modéré</span>
              <span>Élevé</span>
            </div>
          </div>
        </div>

        {/* Climate Scenario */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Scénario Climatique
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                    <p className={`text-xs ${
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
            Durée de Simulation
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {[30, 60, 90, 120].map((days) => (
              <button
                key={days}
                onClick={() => setDuration(days)}
                className={`py-3 rounded-lg font-semibold transition-all ${
                  duration === days
                    ? 'bg-emerald-500 text-white shadow-md'
                    : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {days}j
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className={`${darkMode ? 'bg-gradient-to-r from-emerald-900/30 to-green-900/30' : 'bg-gradient-to-r from-emerald-50 to-green-50'} rounded-xl p-6 border ${darkMode ? 'border-emerald-800' : 'border-emerald-200'}`}>
          <h3 className={`font-bold mb-3 ${darkMode ? 'text-emerald-300' : 'text-emerald-900'}`}>
            Résumé de la Simulation
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>Champ:</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-emerald-900'}`}>
                {selectedField} - {selectedCrop}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>Surface:</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-emerald-900'}`}>
                {area} ha
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>Irrigation:</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-emerald-900'}`}>
                {irrigationAmount}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>Fertilisation:</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-emerald-900'}`}>
                {fertilizationAmount}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>Climat:</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-emerald-900'}`}>
                {climateScenarios.find(s => s.id === climateScenario)?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>Durée:</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-emerald-900'}`}>
                {duration} jours
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
          Lancer la Simulation
        </button>
      </main>

      <ChatSupport />
    </div>
  );
};

// Composant Résultats de Simulation
const SimulationResults = ({ config, onBackToSetup, darkMode, setDarkMode }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [simulationData, setSimulationData] = useState({
    growth: 0,
    health: 100,
    soilMoisture: 60,
    ndvi: 0.2,
    events: []
  });
  
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const calculateDayData = (day, prevData) => {
    const irrigationFactor = config.irrigation / 100;
    const fertilizationFactor = config.fertilization / 100;
    const climateFactor = config.climate === 'Dry' ? 0.7 : config.climate === 'Wet' ? 1.2 : 1.0;
    
    const growthRate = (1 / (1 + Math.exp(-0.1 * (day - config.duration / 2)))) * 100;
    const growth = Math.min(100, growthRate * irrigationFactor * climateFactor);
    
    const health = Math.min(100, 50 + (irrigationFactor * 30) + (fertilizationFactor * 20));
    
    const soilMoisture = Math.max(20, Math.min(100, 
      prevData.soilMoisture * 0.95 + irrigationFactor * 40 + (Math.random() * 20 - 10)
    ));
    
    const ndvi = Math.min(0.9, 0.2 + (growth / 100) * 0.7 * (health / 100));
    
    const events = [];
    const eventChance = Math.random();
    if (day % 10 === 0 && eventChance < 0.3) {
      if (config.climate === 'Dry' && eventChance < 0.15) {
        events.push({ type: 'drought', message: '☀️ Sécheresse détectée!' });
      } else if (config.climate === 'Wet' && eventChance < 0.15) {
        events.push({ type: 'storm', message: '⛈️ Tempête en cours!' });
      } else {
        events.push({ type: 'optimal', message: '✨ Conditions optimales!' });
      }
    }
    
    return { growth, health, soilMoisture, ndvi, events };
  };

  const drawField = (day, data) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.3);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height * 0.3);
    
    if (config.climate === 'Dry' || Math.sin(day * 0.1) > 0) {
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(width - 80, 60, 30, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(width - 100, 50, 25, 0, Math.PI * 2);
      ctx.arc(width - 70, 50, 30, 0, Math.PI * 2);
      ctx.arc(width - 40, 50, 25, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const groundGradient = ctx.createLinearGradient(0, height * 0.3, 0, height);
    const soilColor = Math.floor(100 + (data.soilMoisture / 100) * 50);
    groundGradient.addColorStop(0, `rgb(139, ${soilColor}, 19)`);
    groundGradient.addColorStop(1, `rgb(101, ${soilColor - 20}, 0)`);
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, height * 0.3, width, height * 0.7);
    
    const rows = 6;
    const cols = 10;
    const cellWidth = width / cols;
    const cellHeight = (height * 0.5) / rows;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellWidth;
        const y = height * 0.35 + row * cellHeight;
        
        const variation = (Math.sin(row * col + day * 0.05) + 1) * 0.1;
        const plantHeight = (data.growth / 100) * cellHeight * (0.8 + variation);
        const healthFactor = data.health / 100;
        
        const green = Math.floor(50 + healthFactor * 150);
        const yellow = Math.floor(healthFactor * 200);
        
        ctx.strokeStyle = `rgb(34, ${green}, 0)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + cellWidth / 2, y + cellHeight);
        ctx.lineTo(x + cellWidth / 2, y + cellHeight - plantHeight);
        ctx.stroke();
        
        if (plantHeight > 15) {
          ctx.fillStyle = `rgb(34, ${green}, 0)`;
          ctx.beginPath();
          ctx.ellipse(
            x + cellWidth / 2 - 8, 
            y + cellHeight - plantHeight + 10,
            6, 10, -Math.PI / 4, 0, Math.PI * 2
          );
          ctx.fill();
          
          ctx.beginPath();
          ctx.ellipse(
            x + cellWidth / 2 + 8, 
            y + cellHeight - plantHeight + 10,
            6, 10, Math.PI / 4, 0, Math.PI * 2
          );
          ctx.fill();
        }
        
        if (data.growth > 70 && config.crop === 'Corn') {
          ctx.fillStyle = `rgb(${yellow}, ${yellow - 50}, 0)`;
          ctx.beginPath();
          ctx.ellipse(
            x + cellWidth / 2,
            y + cellHeight - plantHeight - 5,
            4, 8, 0, 0, Math.PI * 2
          );
          ctx.fill();
        }
      }
    }
    
    if (data.soilMoisture > 80 || config.climate === 'Wet') {
      ctx.strokeStyle = 'rgba(100, 150, 255, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 50; i++) {
        const rx = Math.random() * width;
        const ry = Math.random() * height * 0.6;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 2, ry + 10);
        ctx.stroke();
      }
    }
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`Jour ${day}/${config.duration}`, 20, 40);
  };

  useEffect(() => {
    if (isRunning && !isPaused && currentDay < config.duration) {
      animationRef.current = setTimeout(() => {
        const newData = calculateDayData(currentDay + 1, simulationData);
        setSimulationData(newData);
        setCurrentDay(prev => prev + 1);
        drawField(currentDay + 1, newData);
      }, 100);
    }
    
    if (currentDay >= config.duration) {
      setIsRunning(false);
    }
    
    return () => clearTimeout(animationRef.current);
  }, [isRunning, isPaused, currentDay, simulationData]);

  const startSimulation = () => {
    setIsRunning(true);
    setIsPaused(false);
    if (currentDay === 0) {
      const initialData = calculateDayData(0, simulationData);
      setSimulationData(initialData);
      drawField(0, initialData);
    }
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentDay(0);
    setSimulationData({
      growth: 0,
      health: 100,
      soilMoisture: 60,
      ndvi: 0.2,
      events: []
    });
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const calculateYield = () => {
    return (simulationData.growth / 100 * config.area * 8 * 
            (config.irrigation / 100) * (config.fertilization / 100)).toFixed(2);
  };

  const getScore = () => {
    const yieldScore = simulationData.growth;
    const sustainabilityScore = (100 - Math.abs(config.irrigation - 70)) * 
                                 (100 - Math.abs(config.fertilization - 60)) / 100;
    return Math.floor((yieldScore + sustainabilityScore) / 2);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-green-50 to-green-100'} transition-colors duration-300`}>
      {/* Utilisation de la Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-green-800'} flex items-center gap-3`}>
            <Leaf className="w-10 h-10" />
            Résultats de Simulation
          </h1>
          <button
            onClick={onBackToSetup}
            className={`flex items-center gap-2 px-4 py-2 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'} rounded-lg shadow hover:shadow-md transition-all`}
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
        </div>

        <div className="space-y-6">
          {/* Canvas */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Simulation Visuelle</h2>
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              className={`w-full border-4 ${darkMode ? 'border-gray-600' : 'border-green-200'} rounded-lg`}
            />
            
            {/* Événements */}
            {simulationData.events.length > 0 && (
              <div className={`mt-4 p-3 ${darkMode ? 'bg-yellow-900/30 border-yellow-600' : 'bg-yellow-50 border-yellow-400'} border-l-4 rounded`}>
                {simulationData.events.map((event, i) => (
                  <p key={i} className={`${darkMode ? 'text-yellow-300' : 'text-yellow-800'} font-medium`}>{event.message}</p>
                ))}
              </div>
            )}

            {/* Contrôles */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={startSimulation}
                disabled={isRunning && !isPaused}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <Play className="w-5 h-5" />
                {currentDay === 0 ? 'Démarrer' : 'Reprendre'}
              </button>
              
              <button
                onClick={() => setIsPaused(!isPaused)}
                disabled={!isRunning || currentDay >= config.duration}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <Pause className="w-5 h-5" />
                Pause
              </button>
              
              <button
                onClick={resetSimulation}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>

          {/* Statistiques */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Statistiques en Temps Réel</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`${darkMode ? 'bg-green-900/30' : 'bg-green-50'} p-4 rounded-lg`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Croissance</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{simulationData.growth.toFixed(1)}%</p>
              </div>
              
              <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} p-4 rounded-lg`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Santé</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{simulationData.health.toFixed(1)}%</p>
              </div>
              
              <div className={`${darkMode ? 'bg-cyan-900/30' : 'bg-cyan-50'} p-4 rounded-lg`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Humidité Sol</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>{simulationData.soilMoisture.toFixed(1)}%</p>
              </div>
              
              <div className={`${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'} p-4 rounded-lg`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>NDVI</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{simulationData.ndvi.toFixed(2)}</p>
              </div>
            </div>

            {/* Résultats finaux */}
            {currentDay >= config.duration && (
              <div className={`mt-6 p-6 ${darkMode ? 'bg-gradient-to-r from-green-700 to-blue-700' : 'bg-gradient-to-r from-green-400 to-blue-500'} rounded-lg text-white`}>
                <h3 className="text-2xl font-bold mb-4">🎉 Simulation Terminée !</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-90">Rendement Total</p>
                    <p className="text-3xl font-bold">{calculateYield()} tonnes</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Score Global</p>
                    <p className="text-3xl font-bold">{getScore()}/100</p>
                  </div>
                </div>
                
                {getScore() > 80 && (
                  <div className="mt-4 p-3 bg-white bg-opacity-20 rounded-lg">
                    <p className="font-semibold">🏆 Badge: Agriculteur Durable</p>
                    <p className="text-sm">Excellente gestion des ressources !</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ChatSupport />
    </div>
  );
};

// Composant Principal - Gestion de la navigation
const FarmSimulationApp = () => {
  const [currentView, setCurrentView] = useState('setup'); // 'setup' ou 'results'
  const [simulationConfig, setSimulationConfig] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // État pour le mode sombre

  const handleStartSimulation = (config) => {
    setSimulationConfig(config);
    setCurrentView('results');
  };

  const handleBackToSetup = () => {
    setCurrentView('setup');
  };

  return (
    <>
      {currentView === 'setup' && (
        <SimulationSetup 
          onStartSimulation={handleStartSimulation} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
      )}
      {currentView === 'results' && simulationConfig && (
        <SimulationResults 
          config={simulationConfig} 
          onBackToSetup={handleBackToSetup} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
      )}
    </>
  );
};

export default FarmSimulationApp;