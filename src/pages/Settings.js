import React, { useState } from 'react';
import { ArrowLeft, Camera, Lock, CreditCard, Link2, Bell, Cloud, Sprout, AlertCircle, Globe, Sun, Moon, HelpCircle, Shield, FileText, LogOut, ChevronRight } from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    weatherAlerts: true,
    cropHealthUpdates: true,
    systemNotifications: false
  });

  const [appPreferences, setAppPreferences] = useState({
    units: 'Metric',
    language: 'English'
  });

  const accountManagementItems = [
    { id: 'password', icon: <Lock className="w-5 h-5" />, title: 'Change Password', color: 'text-purple-500' },
    { id: 'subscriptions', icon: <CreditCard className="w-5 h-5" />, title: 'Manage Subscriptions', color: 'text-blue-500' },
    { id: 'linkedAccounts', icon: <Link2 className="w-5 h-5" />, title: 'Linked Accounts', color: 'text-cyan-500' }
  ];

  const notificationItems = [
    { id: 'weatherAlerts', title: 'Weather Alerts', icon: <Cloud className="w-5 h-5 text-blue-500" /> },
    { id: 'cropHealthUpdates', title: 'Crop Health Updates', icon: <Sprout className="w-5 h-5 text-green-500" /> },
    { id: 'systemNotifications', title: 'System Notifications', icon: <Bell className="w-5 h-5 text-orange-500" /> }
  ];

  const supportLegalItems = [
    { id: 'help', title: 'Help & Support', icon: <HelpCircle className="w-5 h-5 text-blue-500" /> },
    { id: 'privacy', title: 'Privacy Policy', icon: <Shield className="w-5 h-5 text-green-500" /> },
    { id: 'terms', title: 'Terms of Service', icon: <FileText className="w-5 h-5 text-purple-500" /> }
  ];

  const toggleNotification = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
    }
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
              Settings
            </h1>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Profile Section */}
        <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                JA
              </div>
              <button 
                onClick={() => alert('Change photo')}
                className="absolute bottom-0 right-0 p-2 bg-emerald-500 rounded-full hover:bg-emerald-600 transition-colors shadow-lg"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                John Appleseed
              </h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                john.appleseed@agritwin.com
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Farmer since 2020
              </p>
            </div>
            
            <button 
              onClick={() => alert('Edit profile')}
              className="px-6 py-2.5 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors shadow-md"
            >
              Edit Profile
            </button>
          </div>
        </section>

        {/* Account Management */}
        <section>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Account Management
          </h2>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {accountManagementItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => alert(`${item.title} clicked`)}
                className={`w-full flex items-center gap-4 p-4 ${
                  index !== accountManagementItems.length - 1 ? `border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}` : ''
                } hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors`}
              >
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className={item.color}>
                    {item.icon}
                  </div>
                </div>
                <span className={`flex-1 text-left font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </span>
                <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </button>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Notifications
          </h2>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {notificationItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-4 ${
                  index !== notificationItems.length - 1 ? `border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}` : ''
                } hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {item.icon}
                  </div>
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </span>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notificationSettings[item.id]}
                    onChange={() => toggleNotification(item.id)}
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-emerald-500 peer-focus:ring-4 peer-focus:ring-emerald-500/20 transition-colors relative">
                    <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${notificationSettings[item.id] ? 'translate-x-5' : ''}`}></div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* App Preferences */}
        <section>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            App Preferences
          </h2>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => alert('Select units')}
              className={`w-full flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </div>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Units
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {appPreferences.units}
                </span>
                <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
            </button>

            <button
              onClick={() => alert('Select language')}
              className={`w-full flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <Globe className="w-5 h-5 text-blue-500" />
                </div>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Language
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {appPreferences.language}
                </span>
                <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
            </button>

            <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  {darkMode ? (
                    <Moon className="w-5 h-5 text-purple-500" />
                  ) : (
                    <Sun className="w-5 h-5 text-amber-500" />
                  )}
                </div>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Dark Mode
                </span>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-emerald-500 peer-focus:ring-4 peer-focus:ring-emerald-500/20 transition-colors relative">
                  <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${darkMode ? 'translate-x-5' : ''}`}></div>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* Support & Legal */}
        <section>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Support & Legal
          </h2>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {supportLegalItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => alert(`${item.title} clicked`)}
                className={`w-full flex items-center gap-4 p-4 ${
                  index !== supportLegalItems.length - 1 ? `border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}` : ''
                } hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors`}
              >
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  {item.icon}
                </div>
                <span className={`flex-1 text-left font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </span>
                <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </button>
            ))}
          </div>
        </section>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold py-4 px-6 rounded-xl border-2 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>

        {/* Version Info */}
        <div className="text-center py-4">
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            AgriTwin v1.0.0
          </p>
        </div>
      </main>
    </div>
  );
};

export default Settings;