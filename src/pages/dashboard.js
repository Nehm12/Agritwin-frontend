import React, { useState, useEffect } from 'react';
import { Sprout, Droplet, Sun, TrendingUp, AlertTriangle, Bug, MapPin, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatSupport from './chatbot';
import Navbar from './nav';
import axios from 'axios';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [metrics, setMetrics] = useState([]);
  const [fieldsData, setFieldsData] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null); // Nouveau state
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchFieldsData();
  }, []);

  // Charger les données quand le champ sélectionné change
  useEffect(() => {
    if (selectedFieldId) {
      fetchFieldForecast(selectedFieldId);
    }
  }, [selectedFieldId]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const fetchFieldsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/login');
        return;
      }

      // Récupérer les champs de l'utilisateur
      const fieldsResponse = await axios.get(`${API_URL}/fields/user/${userId}`);
      const fields = fieldsResponse.data;
      setFieldsData(fields);

      if (fields.length === 0) {
        setDefaultData();
        setLoading(false);
        return;
      }

      // Sélectionner le premier champ par défaut
      setSelectedFieldId(fields[0].id);

    } catch (err) {
      console.error('Error fetching fields:', err);
      setError('Impossible de charger les champs. Utilisation des données par défaut.');
      setDefaultData();
      setLoading(false);
    }
  };

  const fetchFieldForecast = async (fieldId) => {
    try {
      setLoading(true);
      
      // Récupérer les prévisions complètes pour le champ sélectionné
      const forecastResponse = await axios.get(`${API_URL}/forecast/${fieldId}`);
      const forecast = forecastResponse.data;
      setForecastData(forecast);

      // Construire les métriques
      const currentConditions = forecast.current_conditions;
      
      if (currentConditions) {
        const transformedMetrics = [
          { 
            label: 'Farm Health', 
            value: `${calculateFarmHealth(currentConditions.ndvi)}%`, 
            icon: <TrendingUp className="w-5 h-5" />, 
            trend: '+5%', 
            color: 'emerald' 
          },
          { 
            label: 'Temperature', 
            value: `${Math.round(currentConditions.temperature_c)}°C`, 
            subtitle: getWeatherCondition(currentConditions.humidity_percent), 
            icon: <Sun className="w-5 h-5" />, 
            color: 'amber',
            forecast: forecast.weather_forecast
          },
          { 
            label: 'Soil Moisture', 
            value: `${Math.round(currentConditions.humidity_percent)}%`, 
            icon: <Droplet className="w-5 h-5" />, 
            trend: calculateTrend(forecast.weather_forecast?.humidity), 
            color: 'blue' 
          },
          { 
            label: 'NDVI Index', 
            value: currentConditions.ndvi.toFixed(2), 
            subtitle: getGrowthStage(currentConditions.ndvi),
            icon: <Sprout className="w-5 h-5" />, 
            color: 'green' 
          }
        ];
        setMetrics(transformedMetrics);
      } else {
        setDefaultData();
      }

    } catch (err) {
      console.error('Error fetching forecast:', err);
      setError('Impossible de charger les prévisions pour ce champ.');
      setDefaultData();
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (fieldId) => {
    setSelectedFieldId(parseInt(fieldId));
  };

  const calculateFarmHealth = (ndvi) => {
    if (!ndvi) return 75;
    return Math.min(100, Math.max(0, Math.round((ndvi + 1) * 50)));
  };

  const getWeatherCondition = (humidity) => {
    if (!humidity) return 'Clear';
    if (humidity > 80) return 'Humid';
    if (humidity > 60) return 'Moderate';
    return 'Dry';
  };

  const calculateTrend = (humidityForecast) => {
    if (!humidityForecast || humidityForecast.length < 2) return null;
    const current = humidityForecast[0];
    const next = humidityForecast[1];
    const diff = next - current;
    if (Math.abs(diff) < 2) return null;
    return diff > 0 ? `+${diff.toFixed(0)}%` : `${diff.toFixed(0)}%`;
  };

  const getGrowthStage = (ndvi) => {
    if (!ndvi) return 'N/A';
    if (ndvi > 0.6) return 'Mature';
    if (ndvi > 0.4) return 'Growing';
    if (ndvi > 0.2) return 'Early Growth';
    return 'Germination';
  };

  const setDefaultData = () => {
    setMetrics([
      { label: 'Farm Health', value: '88%', icon: <TrendingUp className="w-5 h-5" />, trend: '+5%', color: 'emerald' },
      { label: 'Temperature', value: '25°C', subtitle: 'Clear', icon: <Sun className="w-5 h-5" />, color: 'amber' },
      { label: 'Soil Moisture', value: '65%', icon: <Droplet className="w-5 h-5" />, trend: '-3%', color: 'blue' },
      { label: 'NDVI Index', value: '0.65', subtitle: 'Growing', icon: <Sprout className="w-5 h-5" />, color: 'green' }
    ]);
  };

  const quickActions = [
    { icon: <MapPin className="w-6 h-6" />, label: 'My Fields', route: '/My_Fields', color: 'emerald' },
    { icon: <TrendingUp className="w-6 h-6" />, label: 'Simulation', route: '/simulation', color: 'blue' },
    { icon: <Droplet className="w-6 h-6" />, label: 'Notification', route: '/notification', color: 'amber' },
  ];

  const getColorClass = (color, type = 'bg') => {
    const colors = {
      emerald: type === 'bg' ? 'bg-emerald-500' : 'text-emerald-600',
      amber: type === 'bg' ? 'bg-amber-500' : 'text-amber-600',
      blue: type === 'bg' ? 'bg-blue-500' : 'text-blue-600',
      green: type === 'bg' ? 'bg-green-500' : 'text-green-600',
      purple: type === 'bg' ? 'bg-purple-500' : 'text-purple-600'
    };
    return colors[color] || colors.emerald;
  };

  const renderWeatherForecast = (forecast) => {
    if (!forecast?.dates || forecast.dates.length === 0) return null;

    return (
      <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-amber-50'} border ${darkMode ? 'border-gray-600' : 'border-amber-200'}`}>
        <h4 className={`text-xs font-semibold mb-2 ${darkMode ? 'text-amber-300' : 'text-amber-900'}`}>
          7-Day Forecast
        </h4>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {forecast.dates.slice(0, 7).map((date, index) => (
            <div key={index} className="text-center">
              <div className={`font-medium ${darkMode ? 'text-gray-300' : 'text-amber-800'}`}>
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-amber-900'}`}>
                {Math.round(forecast.temperature[index])}°
              </div>
              <Droplet className={`w-3 h-3 mx-auto ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {Math.round(forecast.precipitation[index])}mm
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const selectedField = fieldsData.find(f => f.id === selectedFieldId);

  if (loading && !selectedFieldId) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className={`mt-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Welcome Section avec sélecteur de champ */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Welcome back, Farmer
              </h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Here's what's happening with your farm today
              </p>
            </div>

            {/* Sélecteur de champ */}
            {fieldsData.length > 0 && (
              <div className="relative">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Select Field
                </label>
                <select
                  value={selectedFieldId || ''}
                  onChange={(e) => handleFieldChange(e.target.value)}
                  className={`w-full sm:w-64 px-4 py-3 pr-10 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none appearance-none cursor-pointer`}
                >
                  {fieldsData.map((field) => (
                    <option key={field.id} value={field.id}>
                      {field.name} ({field.area} ha)
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-3 top-11 w-5 h-5 pointer-events-none ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
            )}
          </div>

          {error && (
            <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">{error}</p>
            </div>
          )}

          {/* Informations sur le champ sélectionné */}
          {selectedField && (
            <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center gap-4">
                <MapPin className={`w-8 h-8 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <div>
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedField.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedField.city}, {selectedField.country} • {selectedField.area} hectares
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                    Coordinates: {selectedField.lat}, {selectedField.lon}
                  </p>
                </div>
              </div>
            </div>
          )}

          {forecastData?.current_yield_estimate && (
            <div className="mt-3 flex flex-wrap gap-2">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${darkMode ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-800' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}`}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Yield Estimate: {forecastData.current_yield_estimate.toFixed(1)}/100
              </div>
              {forecastData?.future_yield_estimate && (
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${darkMode ? 'bg-blue-900/30 text-blue-300 border border-blue-800' : 'bg-blue-50 text-blue-800 border border-blue-200'}`}>
                  Future Yield: {forecastData.future_yield_estimate.toFixed(1)}/100
                </div>
              )}
            </div>
          )}
        </div>

        {/* Indicateur de chargement pour changement de champ */}
        {loading && selectedFieldId && (
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-8`}>
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Loading data for {selectedField?.name}...
              </p>
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${getColorClass(metric.color, 'bg')} p-3 rounded-lg bg-opacity-10`}>
                  <div className={getColorClass(metric.color, 'text')}>
                    {metric.icon}
                  </div>
                </div>
                {metric.trend && (
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    metric.trend.startsWith('+') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {metric.trend}
                  </span>
                )}
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                {metric.label}
              </p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {metric.value}
              </p>
              {metric.subtitle && (
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                  {metric.subtitle}
                </p>
              )}
              {metric.forecast && index === 1 && renderWeatherForecast(metric.forecast)}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.route)}
                className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border ${darkMode ? 'border-gray-700' : 'border-gray-100'} group`}
              >
                <div className={`${getColorClass(action.color, 'bg')} p-4 rounded-lg inline-flex mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {action.icon}
                  </div>
                </div>
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {action.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Fields Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              All Your Fields
            </h3>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Total Fields</p>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                    {fieldsData.length}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>Total Area</p>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                    {fieldsData.reduce((sum, f) => sum + (f.area || 0), 0).toFixed(1)} ha
                  </p>
                </div>
              </div>
              
              {fieldsData.length > 0 && (
                <div className="space-y-2">
                  <h4 className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Your Fields:
                  </h4>
                  {fieldsData.map((field) => (
                    <div 
                      key={field.id}
                      onClick={() => setSelectedFieldId(field.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        field.id === selectedFieldId 
                          ? darkMode ? 'bg-emerald-900/30 border-2 border-emerald-700' : 'bg-emerald-50 border-2 border-emerald-300'
                          : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {field.name}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {field.area} ha • {field.city}
                          </p>
                        </div>
                        <MapPin className={`w-5 h-5 ${
                          field.id === selectedFieldId 
                            ? 'text-emerald-500' 
                            : darkMode ? 'text-emerald-400' : 'text-emerald-600'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <button 
                onClick={() => navigate('/My_Fields')}
                className="w-full mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
              >
                View All Fields
              </button>
            </div>
          </div>

          <div>
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Field Map
            </h3>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div 
                className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-emerald-100 to-green-200 dark:from-emerald-900/20 dark:to-green-900/20 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => navigate('/map')}
              >
                <div className="text-center">
                  <MapPin className={`w-12 h-12 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'} mx-auto mb-2`} />
                  <p className={`${darkMode ? 'text-emerald-300' : 'text-emerald-700'} font-medium`}>
                    Interactive Map View
                  </p>
                  <p className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'} text-sm`}>
                    Click to explore {selectedField?.name || 'your fields'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <ChatSupport />
    </div>
  );
};

export default Dashboard;