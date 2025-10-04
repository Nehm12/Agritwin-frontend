import React, { useState } from 'react';
import { ArrowLeft, Droplet, Sprout, Cloud, Bug, Bell, BellOff, Info, TestTube, Calendar } from 'lucide-react';

const AlertsNotifications = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [alertPreferences, setAlertPreferences] = useState({
    irrigation: true,
    fertilization: true,
    climate: false,
    pestDisease: true
  });

  const [communicationChannels, setCommunicationChannels] = useState({
    inApp: true,
    sms: true,
    whatsapp: false,
    email: false
  });

  const recentAlerts = [
    {
      id: 1,
      icon: <Droplet className="w-6 h-6" />,
      bgColor: 'bg-blue-500',
      title: 'Irrigation Needed - Field A',
      description: 'Soil moisture has dropped to 45%. Irrigation recommended.',
      time: '2 hours ago',
      unread: true,
      type: 'irrigation'
    },
    {
      id: 2,
      icon: <Sprout className="w-6 h-6" />,
      bgColor: 'bg-green-500',
      title: 'Fertilizer Recommended: Field B',
      description: 'Nitrogen levels are low. Apply 50kg/ha of NPK fertilizer.',
      time: '1 day ago',
      unread: false,
      type: 'fertilization'
    },
    {
      id: 3,
      icon: <Cloud className="w-6 h-6" />,
      bgColor: 'bg-cyan-500',
      title: 'Frost Warning: Tonight',
      description: 'Temperature will drop to -2°C. Protect sensitive crops.',
      time: '3 days ago',
      unread: false,
      type: 'climate'
    },
    {
      id: 4,
      icon: <Bug className="w-6 h-6" />,
      bgColor: 'bg-red-500',
      title: 'Pest Detected: Corn Field',
      description: 'Aphids detected in Field C. Immediate action recommended.',
      time: '4 days ago',
      unread: false,
      type: 'pestDisease'
    }
  ];

  const alertPreferencesList = [
    {
      id: 'irrigation',
      icon: <Droplet className="w-5 h-5 text-blue-500" />,
      title: 'Irrigation Alerts',
      description: 'Get notified when soil moisture drops below optimal levels.',
      enabled: alertPreferences.irrigation
    },
    {
      id: 'fertilization',
      icon: <Sprout className="w-5 h-5 text-green-500" />,
      title: 'Fertilization Alerts',
      description: 'Receive recommendations for nutrient application.',
      enabled: alertPreferences.fertilization
    },
    {
      id: 'climate',
      icon: <Cloud className="w-5 h-5 text-cyan-500" />,
      title: 'Climate Alerts',
      description: 'Warnings for frost, heatwaves, and other weather events.',
      enabled: alertPreferences.climate
    },
    {
      id: 'pestDisease',
      icon: <Bug className="w-5 h-5 text-red-500" />,
      title: 'Pest & Disease Alerts',
      description: 'Notifications for potential pest and disease outbreaks.',
      enabled: alertPreferences.pestDisease
    }
  ];

  const communicationChannelsList = [
    { id: 'inApp', title: 'In-app Notifications', enabled: communicationChannels.inApp },
    { id: 'sms', title: 'SMS', enabled: communicationChannels.sms },
    { id: 'whatsapp', title: 'WhatsApp', enabled: communicationChannels.whatsapp },
    { id: 'email', title: 'Email', enabled: communicationChannels.email }
  ];

  const toggleAlertPreference = (preferenceId) => {
    setAlertPreferences(prev => ({
      ...prev,
      [preferenceId]: !prev[preferenceId]
    }));
  };

  const toggleCommunicationChannel = (channelId) => {
    setCommunicationChannels(prev => ({
      ...prev,
      [channelId]: !prev[channelId]
    }));
  };

  const hasUnreadAlerts = recentAlerts.some(alert => alert.unread);
  const unreadCount = recentAlerts.filter(alert => alert.unread).length;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.history.back()}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
              </button>
              <div className="flex items-center gap-3">
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Alerts & Notifications
                </h1>
                {hasUnreadAlerts && (
                  <span className="flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
            </div>
            
            {hasUnreadAlerts && (
              <button 
                onClick={() => alert('All alerts marked as read')}
                className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Recent Alerts */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Alerts
            </h2>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {unreadCount} unread
            </span>
          </div>
          
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer border ${
                  alert.unread 
                    ? 'border-l-4 border-l-emerald-500' 
                    : darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${alert.bgColor} p-3 rounded-lg shrink-0`}>
                    <div className="text-white">
                      {alert.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {alert.title}
                      </h3>
                      {alert.unread && (
                        <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 mt-2 animate-pulse"></div>
                      )}
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                      {alert.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {alert.time}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Viewing details...');
                        }}
                        className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Alert Preferences */}
        <section>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Alert Preferences
          </h2>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {alertPreferencesList.map((preference, index) => (
              <div 
                key={preference.id} 
                className={`flex items-center gap-4 p-5 ${
                  index !== alertPreferencesList.length - 1 
                    ? `border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}` 
                    : ''
                } hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors`}
              >
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  {preference.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {preference.title}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                    {preference.description}
                  </p>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={preference.enabled}
                    onChange={() => toggleAlertPreference(preference.id)}
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-emerald-500 peer-focus:ring-4 peer-focus:ring-emerald-500/20 transition-colors relative">
                    <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${preference.enabled ? 'translate-x-5' : ''}`}></div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Communication Channels */}
        <section>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Communication Channels
          </h2>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {communicationChannelsList.map((channel, index) => (
              <div 
                key={channel.id}
                className={`flex items-center justify-between p-5 ${
                  index !== communicationChannelsList.length - 1 
                    ? `border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}` 
                    : ''
                } hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors`}
              >
                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {channel.title}
                </p>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={channel.enabled}
                    onChange={() => toggleCommunicationChannel(channel.id)}
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-emerald-500 peer-focus:ring-4 peer-focus:ring-emerald-500/20 transition-colors relative">
                    <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${channel.enabled ? 'translate-x-5' : ''}`}></div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Action Buttons */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={() => alert('Testing notifications...')}
            className="flex items-center justify-center gap-2 bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-emerald-600 transition-colors shadow-md hover:shadow-lg"
          >
            <TestTube className="w-5 h-5" />
            Test Notifications
          </button>
          <button 
            onClick={() => alert('Managing schedule...')}
            className={`flex items-center justify-center gap-2 ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-white hover:bg-gray-50 text-gray-900'
            } font-semibold py-3 px-6 rounded-lg border ${
              darkMode ? 'border-gray-600' : 'border-gray-300'
            } transition-colors shadow-sm hover:shadow-md`}
          >
            <Calendar className="w-5 h-5" />
            Manage Schedule
          </button>
        </section>

        {/* Info Banner */}
        <section className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-xl p-5 border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
          <div className="flex items-start gap-3">
            <Info className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'} shrink-0 mt-0.5`} />
            <div>
              <p className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'} mb-1`}>
                Notification Settings
              </p>
              <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                Critical alerts will always be sent regardless of your preferences to ensure farm safety.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AlertsNotifications;