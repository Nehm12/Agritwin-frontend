import React, { useState, useEffect } from 'react';
import { Menu, Bell, Sprout, Droplet, Sun, TrendingUp, AlertTriangle, Bug, MapPin, X, Activity, Users, Shield, Zap, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ChatSupport from './chatbot';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [fieldsOverview, setFieldsOverview] = useState({ total_fields: 0, active_fields: 0 });
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [yieldForecast, setYieldForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Icônes pour les types d'alertes
  const alertIcons = {
    bug: <Bug className="w-5 h-5" />,
    droplet: <Droplet className="w-5 h-5" />,
    'alert-triangle': <AlertTriangle className="w-5 h-5" />
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch fields first to get field IDs
      const fieldsResponse = await fetch('/api/fields');
      const fieldsData = await fieldsResponse.json();
      
      if (fieldsData.length === 0) {
        // No fields, use default data
        setDefaultData();
        return;
      }

      const firstFieldId = fieldsData[0].id;

      // Fetch complete forecast data for the first field
      const forecastResponse = await fetch(`/api/forecast/${firstFieldId}`);
      const forecastData = await forecastResponse.json();

      // Fetch yield forecast
      const yieldResponse = await fetch(`/api/forecast/yield/${firstFieldId}`);
      const yieldData = await yieldResponse.json();

      // Fetch alerts
      const alertsResponse = await fetch('/api/dashboard/alerts');
      const alertsData = await alertsResponse.json();

      // Transform data for display using forecast API
      const transformedMetrics = [
        { 
          label: 'Farm Health', 
          value: `${calculateFarmHealth(forecastData)}%`, 
          icon: <TrendingUp className="w-5 h-5" />, 
          trend: '+5%', 
          color: 'emerald' 
        },
        { 
          label: 'Weather', 
          value: `${forecastData.current_conditions?.temperature_c || 25}°C`, 
          subtitle: getWeatherCondition(forecastData.current_conditions?.humidity_percent), 
          icon: <Sun className="w-5 h-5" />, 
          color: 'amber' 
        },
        { 
          label: 'Soil Moisture', 
          value: `${calculateSoilMoisture(forecastData.current_conditions)}%`, 
          icon: <Droplet className="w-5 h-5" />, 
          trend: '-3%', 
          color: 'blue' 
        },
        { 
          label: 'Crop Growth', 
          value: getGrowthStage(forecastData.current_conditions?.ndvi), 
          icon: <Sprout className="w-5 h-5" />, 
          color: 'green' 
        }
      ];

      setMetrics(transformedMetrics);
      setAlerts(alertsData.alerts || []);
      setFieldsOverview({
        total_fields: fieldsData.length,
        active_fields: fieldsData.length
      });
      setWeatherForecast(forecastData);
      setYieldForecast(yieldData);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setDefaultData();
    } finally {
      setLoading(false);
    }
  };

  const calculateFarmHealth = (forecastData) => {
    if (!forecastData?.current_conditions?.ndvi) return 75;
    const ndvi = forecastData.current_conditions.ndvi;
    return Math.min(100, Math.max(0, Math.round(ndvi * 100)));
  };

  const getWeatherCondition = (humidity) => {
    if (!humidity) return 'Clear';
    if (humidity > 80) return 'Rainy';
    if (humidity > 60) return 'Cloudy';
    return 'Clear';
  };

  const calculateSoilMoisture = (conditions) => {
    if (!conditions?.humidity_percent) return 65;
    return Math.round(conditions.humidity_percent * 0.7);
  };

  const getGrowthStage = (ndvi) => {
    if (!ndvi) return 'Flowering';
    if (ndvi > 0.7) return 'Flowering';
    if (ndvi > 0.5) return 'Vegetative';
    if (ndvi > 0.3) return 'Germination';
    return 'Planted';
  };

  const setDefaultData = () => {
    setMetrics([
      { label: 'Farm Health', value: '88%', icon: <TrendingUp className="w-5 h-5" />, trend: '+5%', color: 'emerald' },
      { label: 'Weather', value: '72°F', subtitle: 'Clear', icon: <Sun className="w-5 h-5" />, color: 'amber' },
      { label: 'Soil Moisture', value: '65%', icon: <Droplet className="w-5 h-5" />, trend: '-3%', color: 'blue' },
      { label: 'Crop Growth', value: 'Flowering', icon: <Sprout className="w-5 h-5" />, color: 'green' }
    ]);
    setAlerts([]);
    setFieldsOverview({ total_fields: 0, active_fields: 0 });
  };

  const quickActions = [
    { icon: <MapPin className="w-6 h-6" />, label: 'My_fields', color: 'emerald' },
    { icon: <TrendingUp className="w-6 h-6" />, label: 'simulation', color: 'blue' },
    { icon: <Bell className="w-6 h-6" />, label: 'notification', color: 'amber' },
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

  // Afficher les prévisions météo dans un tooltip ou section supplémentaire
  const renderWeatherForecast = () => {
    if (!weatherForecast?.weather_forecast) return null;

    const { temperature, dates } = weatherForecast.weather_forecast;
    
    return (
      <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} border ${darkMode ? 'border-gray-700' : 'border-blue-200'}`}>
        <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-blue-900'}`}>
          7-Day Forecast
        </h4>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {dates.slice(0, 7).map((date, index) => (
            <div key={index} className="text-center">
              <div className={`font-medium ${darkMode ? 'text-gray-300' : 'text-blue-800'}`}>
                {new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' })}
              </div>
              <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-blue-900'}`}>
                {Math.round(temperature[index])}°
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className={`mt-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Header avec nouvelle navbar */}
      <header className={`fixed top-0 left-0 right-0 ${darkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm shadow-sm z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-white" />
                </div>
                <Link to="/" className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  AgriTwin
                </Link>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <button className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}>
                Home
              </button>
              <button onClick={() => navigate('/create')} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}>
                Create a field
              </button>
              <button onClick={() => navigate('/map')} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}>
                Card
              </button>
              <button onClick={() => navigate('/simulation')} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}>
                Simulations
              </button>
              <button onClick={() => navigate('/notification')} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}>
                Notifications
              </button>
              <button onClick={() => navigate('/settings')} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}>
                Settings
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-gray-600" />}
              </button>
              <button onClick={() => navigate('/notification')} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors relative`}>
                <Bell className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
                {alerts.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex flex-col gap-4">
                <button onClick={() => navigate('/dashboard')} className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'}`}>
                  Home
                </button>
                <button onClick={() => navigate('/create')} className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'}`}>
                  Create a field
                </button>
                <button onClick={() => navigate('/map')}  className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'}`}>
                  Card
                </button>
                <button onClick={() => navigate('/simulation')} className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'}`}>
                  Simulations
                </button>
                <button onClick={() => navigate('/notification')} className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'}`}>
                  Notifications
                </button>
                <button onClick={() => navigate('/settings')} className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'}`}>
                  Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Welcome back, Farmer
          </h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Here's what's happening with your farm today
          </p>
          {yieldForecast && (
            <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              Yield Forecast: {yieldForecast.yield_estimate || 'N/A'}
            </div>
          )}
        </div>

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
                    metric.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
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
              {index === 1 && weatherForecast && renderWeatherForecast()}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(`/${action.label}`)}
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

        {/* Alerts and Field Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Alerts */}
          <div>
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Recent Alerts
            </h3>
            <div className="space-y-3">
              {alerts.length > 0 ? alerts.map((alert, index) => (
                <div
                  key={alert.id}
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border ${darkMode ? 'border-gray-700' : 'border-gray-100'} cursor-pointer group`}
                  onClick={() => navigate(`/fields/${alert.field_id}`)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${alert.bg_color} ${darkMode ? 'bg-opacity-20' : ''} p-3 rounded-lg shrink-0`}>
                      <div className={alert.icon_color}>
                        {alertIcons[alert.icon]}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {alert.title}
                        </h4>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} ml-2 shrink-0`}>
                          {alert.time}
                        </span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {alert.description}
                      </p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 text-center border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Aucune alerte récente</p>
                </div>
              )}
            </div>
          </div>

          {/* Field Overview */}
          <div>
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Field Overview
            </h3>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div 
                className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-emerald-100 to-green-200 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => navigate('/map')}
              >
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <p className="text-emerald-700 font-medium">Interactive Map View</p>
                  <p className="text-emerald-600 text-sm">Click to explore your fields</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Fields</p>
                  <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {fieldsOverview.active_fields} Active
                  </p>
                </div>
                <button 
                  onClick={() => navigate('/fields')}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
                >
                  View All
                </button>
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