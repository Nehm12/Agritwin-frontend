import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Droplets, Sun, Cloud, CloudRain, Leaf } from 'lucide-react';
import ChatSupport from './chatbot';
const FarmSimulation = () => {
  const [config, setConfig] = useState({
    field: 'Field Alpha',
    crop: 'Corn',
    area: 50,
    irrigation: 70,
    fertilization: 50,
    climate: 'Normal',
    duration: 90
  });
  
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

  // Calcul de la simulation par jour
  const calculateDayData = (day, prevData) => {
    const irrigationFactor = config.irrigation / 100;
    const fertilizationFactor = config.fertilization / 100;
    const climateFactor = config.climate === 'Dry' ? 0.7 : config.climate === 'Wet' ? 1.2 : 1.0;
    
    // Croissance progressive (courbe sigmoïde)
    const growthRate = (1 / (1 + Math.exp(-0.1 * (day - config.duration / 2)))) * 100;
    const growth = Math.min(100, growthRate * irrigationFactor * climateFactor);
    
    // Santé influencée par irrigation et fertilisation
    const health = Math.min(100, 50 + (irrigationFactor * 30) + (fertilizationFactor * 20));
    
    // Humidité du sol
    const soilMoisture = Math.max(20, Math.min(100, 
      prevData.soilMoisture * 0.95 + irrigationFactor * 40 + (Math.random() * 20 - 10)
    ));
    
    // NDVI (Normalized Difference Vegetation Index)
    const ndvi = Math.min(0.9, 0.2 + (growth / 100) * 0.7 * (health / 100));
    
    // Événements aléatoires
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

  // Animation du canvas
  const drawField = (day, data) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Fond ciel avec dégradé
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.3);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height * 0.3);
    
    // Soleil ou nuages selon climat
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
    
    // Sol
    const groundGradient = ctx.createLinearGradient(0, height * 0.3, 0, height);
    const soilColor = Math.floor(100 + (data.soilMoisture / 100) * 50);
    groundGradient.addColorStop(0, `rgb(139, ${soilColor}, 19)`);
    groundGradient.addColorStop(1, `rgb(101, ${soilColor - 20}, 0)`);
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, height * 0.3, width, height * 0.7);
    
    // Parcelles de culture
    const rows = 6;
    const cols = 10;
    const cellWidth = width / cols;
    const cellHeight = (height * 0.5) / rows;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellWidth;
        const y = height * 0.35 + row * cellHeight;
        
        // Variation aléatoire pour réalisme
        const variation = (Math.sin(row * col + day * 0.05) + 1) * 0.1;
        const plantHeight = (data.growth / 100) * cellHeight * (0.8 + variation);
        const healthFactor = data.health / 100;
        
        // Couleur selon santé et croissance
        const green = Math.floor(50 + healthFactor * 150);
        const yellow = Math.floor(healthFactor * 200);
        
        // Tige
        ctx.strokeStyle = `rgb(34, ${green}, 0)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + cellWidth / 2, y + cellHeight);
        ctx.lineTo(x + cellWidth / 2, y + cellHeight - plantHeight);
        ctx.stroke();
        
        // Feuilles (si assez grand)
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
        
        // Épi de maïs si croissance > 70%
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
    
    // Effet pluie
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
    
    // Texte jour
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`Jour ${day}/${config.duration}`, 20, 40);
  };

  // Lancement de la simulation
  useEffect(() => {
    if (isRunning && !isPaused && currentDay < config.duration) {
      animationRef.current = setTimeout(() => {
        const newData = calculateDayData(currentDay + 1, simulationData);
        setSimulationData(newData);
        setCurrentDay(prev => prev + 1);
        drawField(currentDay + 1, newData);
      }, 100); // 100ms par jour = 9s pour 90 jours
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center flex items-center justify-center gap-3">
          <Leaf className="w-10 h-10" />
          Simulateur Agricole Interactif
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Champ</label>
                <input
                  type="text"
                  value={config.field}
                  onChange={(e) => setConfig({...config, field: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  disabled={isRunning}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Culture</label>
                <select
                  value={config.crop}
                  onChange={(e) => setConfig({...config, crop: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  disabled={isRunning}
                >
                  <option>Corn</option>
                  <option>Wheat</option>
                  <option>Rice</option>
                  <option>Soybean</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surface: {config.area} ha
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={config.area}
                  onChange={(e) => setConfig({...config, area: parseInt(e.target.value)})}
                  className="w-full"
                  disabled={isRunning}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Droplets className="inline w-4 h-4" /> Irrigation: {config.irrigation}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.irrigation}
                  onChange={(e) => setConfig({...config, irrigation: parseInt(e.target.value)})}
                  className="w-full"
                  disabled={isRunning}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Leaf className="inline w-4 h-4" /> Fertilisation: {config.fertilization}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.fertilization}
                  onChange={(e) => setConfig({...config, fertilization: parseInt(e.target.value)})}
                  className="w-full"
                  disabled={isRunning}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Climat</label>
                <select
                  value={config.climate}
                  onChange={(e) => setConfig({...config, climate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  disabled={isRunning}
                >
                  <option>Normal</option>
                  <option>Dry</option>
                  <option>Wet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durée: {config.duration} jours
                </label>
                <input
                  type="range"
                  min="30"
                  max="120"
                  value={config.duration}
                  onChange={(e) => setConfig({...config, duration: parseInt(e.target.value)})}
                  className="w-full"
                  disabled={isRunning}
                />
              </div>
            </div>

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

          {/* Visualisation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Canvas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Simulation Visuelle</h2>
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="w-full border-4 border-green-200 rounded-lg"
              />
              
              {/* Événements */}
              {simulationData.events.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  {simulationData.events.map((event, i) => (
                    <p key={i} className="text-yellow-800 font-medium">{event.message}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Statistiques */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Statistiques en Temps Réel</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Croissance</p>
                  <p className="text-2xl font-bold text-green-600">{simulationData.growth.toFixed(1)}%</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Santé</p>
                  <p className="text-2xl font-bold text-blue-600">{simulationData.health.toFixed(1)}%</p>
                </div>
                
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Humidité Sol</p>
                  <p className="text-2xl font-bold text-cyan-600">{simulationData.soilMoisture.toFixed(1)}%</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">NDVI</p>
                  <p className="text-2xl font-bold text-purple-600">{simulationData.ndvi.toFixed(2)}</p>
                </div>
              </div>

              {/* Résultats finaux */}
              {currentDay >= config.duration && (
                <div className="mt-6 p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white">
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
      </div>
      <ChatSupport />
    </div>
  );
};

export default FarmSimulation;