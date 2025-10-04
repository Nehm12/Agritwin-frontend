import React, { useState } from 'react';
import { Menu, Bell, Sprout, Droplet, Sun, TrendingUp, AlertTriangle, Bug, MapPin, X, Activity, Users, Shield, Zap, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const metrics = [
    { label: 'Farm Health', value: '88%', icon: <TrendingUp className="w-5 h-5" />, trend: '+5%', color: 'emerald' },
    { label: 'Weather', value: '72°F', subtitle: 'Clear', icon: <Sun className="w-5 h-5" />, color: 'amber' },
    { label: 'Soil Moisture', value: '65%', icon: <Droplet className="w-5 h-5" />, trend: '-3%', color: 'blue' },
    { label: 'Crop Growth', value: 'Flowering', icon: <Sprout className="w-5 h-5" />, color: 'green' }
  ];

  const quickActions = [
    { icon: <MapPin className="w-6 h-6" />, label: 'My Fields', color: 'emerald' },
    { icon: <TrendingUp className="w-6 h-6" />, label: 'Run Simulation', color: 'blue' },
    { icon: <Bell className="w-6 h-6" />, label: 'Manage Alerts', color: 'amber' },
    { icon: <TrendingUp className="w-6 h-6" />, label: 'Reports', color: 'purple' }
  ];

  const alerts = [
    {
      icon: <Bug className="w-5 h-5" />,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      title: 'Pest Alert',
      description: 'Aphids detected in Field A. Action recommended.',
      time: '2h ago',
      priority: 'medium'
    },
    {
      icon: <Droplet className="w-5 h-5" />,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      title: 'Irrigation Needed',
      description: 'Low moisture in Field C. Please irrigate.',
      time: '1d ago',
      priority: 'low'
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
      title: 'Critical Frost Warning',
      description: 'Temperature dropping below freezing tonight. Protect sensitive crops.',
      time: '8h ago',
      priority: 'high'
    }
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
                <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  AgriTwin
                </span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <button className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}>
                Accueil
              </button>
              <button onClick={() => navigate('/create')} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}>
                Créer un champs
              </button>
              <button onClick={() => navigate('/map')} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}>
                Cartes
              </button>
              <button onClick={() => navigate('/simulation_set')} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}>
                Simulations
              </button>
              <button onClick={() => navigate('/notification')} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}>
                Notifications
              </button>
              <button className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}>
                Aides
              </button>
              <button onClick={() => navigate('/settings')} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}>
                Paramètres
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-gray-600" />}
              </button>
              <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors relative`}>
                <Bell className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
                <button className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'}`}>
                  Accueil
                </button>
                <button onClick={() => navigate('/create')} className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'}`}>
                  Créer un champs
                </button>
                <button onClick={() => navigate('/map')}  className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'}`}>
                  Cartes
                </button>
                <button onClick={() => navigate('/simulation_set')} className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'}`}>
                  Simulations
                </button>
                <button onClick={() => navigate('/notification')} className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'}`}>
                  Notifications
                </button>
                <button className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'}`}>
                  Aides
                </button>
                <button onClick={() => navigate('/settings')} className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'}`}>
                  Paramètres
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
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border ${darkMode ? 'border-gray-700' : 'border-gray-100'} cursor-pointer group`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${alert.bgColor} ${darkMode ? 'bg-opacity-20' : ''} p-3 rounded-lg shrink-0`}>
                      <div className={alert.iconColor}>
                        {alert.icon}
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
              ))}
            </div>
          </div>

          {/* Field Overview */}
          <div>
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Field Overview
            </h3>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-emerald-100 to-green-200 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <p className="text-emerald-700 font-medium">Interactive Map View</p>
                  <p className="text-emerald-600 text-sm">Click to explore your fields</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Fields</p>
                  <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>3 Active</p>
                </div>
                <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;