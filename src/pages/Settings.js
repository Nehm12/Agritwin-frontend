import React, { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Lock, CreditCard, Link2, Bell, Cloud, Sprout, AlertCircle, Globe, Sun, Moon, HelpCircle, Shield, FileText, LogOut, ChevronRight, X, Check } from 'lucide-react';
import ChatSupport from './chatbot';
import Navbar from './nav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [notificationSettings, setNotificationSettings] = useState({
    weatherAlerts: true,
    cropHealthUpdates: true,
    systemNotifications: false
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clientData, setClientData] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;
  
  // Modals state
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Form states
  const [editData, setEditData] = useState({
    lastname: '',
    firstname: '',
    email: '',
    phone: ''
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [appPreferences, setAppPreferences] = useState({
    units: 'Metric',
    language: 'English'
  });

  // Charger les données utilisateur au montage du composant
  useEffect(() => {
    loadUserData();
    loadNotificationSettings();
  }, []);

  // Save darkMode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Charger les données utilisateur depuis l'API
  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`${API_URL}/users/${userId}`);
      const userData = response.data;
      
      setClientData(userData);
      setEditData({
        lastname: userData.lastname || '',
        firstname: userData.firstname || '',
        email: userData.email || '',
        phone: userData.phone || ''
      });

      // Charger les préférences de langue
      if (userData.language) {
        setAppPreferences(prev => ({
          ...prev,
          language: userData.language === 'fr' ? 'French' : 'English'
        }));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données utilisateur:', error);
      setError('Failed to load user data');
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les paramètres de notification depuis localStorage
  const loadNotificationSettings = () => {
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setNotificationSettings(JSON.parse(savedSettings));
    }
  };

  const accountManagementItems = [
    { id: 'password', icon: <Lock className="w-5 h-5" />, title: 'Change Password', color: 'text-purple-500', action: () => setShowChangePasswordModal(true) },
    { id: 'subscriptions', icon: <CreditCard className="w-5 h-5" />, title: 'Manage Subscriptions', color: 'text-blue-500', action: () => setShowSubscriptionModal(true) },
    { id: 'linkedAccounts', icon: <Link2 className="w-5 h-5" />, title: 'Linked Accounts', color: 'text-cyan-500', action: () => alert('Linked Accounts - Coming soon') }
  ];

  const notificationItems = [
    { id: 'weatherAlerts', title: 'Weather Alerts', icon: <Cloud className="w-5 h-5 text-blue-500" /> },
    { id: 'cropHealthUpdates', title: 'Crop Health Updates', icon: <Sprout className="w-5 h-5 text-green-500" /> },
    { id: 'systemNotifications', title: 'System Notifications', icon: <Bell className="w-5 h-5 text-orange-500" /> }
  ];

  const supportLegalItems = [
    { id: 'help', title: 'Help & Support', icon: <HelpCircle className="w-5 h-5 text-blue-500" />, action: () => setShowHelpModal(true) },
    { id: 'privacy', title: 'Privacy Policy', icon: <Shield className="w-5 h-5 text-green-500" />, action: () => setShowPrivacyModal(true) },
    { id: 'terms', title: 'Terms of Service', icon: <FileText className="w-5 h-5 text-purple-500" />, action: () => setShowTermsModal(true) }
  ];

  const toggleNotification = (setting) => {
    const newSettings = {
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    };
    setNotificationSettings(newSettings);
    // Sauvegarder dans localStorage
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      sessionStorage.clear();
      navigate('/login');
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const userId = localStorage.getItem('userId');
      
      const updateData = {
        lastname: editData.lastname,
        firstname: editData.firstname,
        email: editData.email,
        phone: editData.phone,
        language: appPreferences.language === 'French' ? 'fr' : 'en'
      };

      await axios.put(`${API_URL}/${userId}`, updateData);
      
      setShowEditProfileModal(false);
      await loadUserData(); // Recharger les données
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile!');
    } finally {
      setIsLoading(false);
    }
  };

const handleChangePassword = async (e) => {
  e.preventDefault();
  try {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    setIsLoading(true);
    const userId = localStorage.getItem('userId');
    
    // CORRECTION: Envoyer seulement le nouveau mot de passe
    const updateData = {
      oldpassword:passwordData.oldPassword,
      password: passwordData.newPassword
    };

    console.log("Envoi des données:", updateData);
    
    await axios.put(`${API_URL}/${userId}/password`, updateData);
    
    setShowChangePasswordModal(false);
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password changed successfully!');
  } catch (error) {
    console.error('Error changing password:', error);
    if (error.response && error.response.data && error.response.data.message) {
      alert(`Failed to change password: ${error.response.data.message}`);
    } else {
      alert('Failed to change password!');
    }
  } finally {
    setIsLoading(false);
  }
};

  const handleLanguageChange = async (language) => {
    try {
      const userId = localStorage.getItem('userId');
      const languageCode = language === 'French' ? 'fr' : 'en';
      
      await axios.put(`${API_URL}/users/${userId}`, {
        language: languageCode
      });
      
      setAppPreferences(prev => ({ ...prev, language }));
      await loadUserData(); // Recharger les données
    } catch (error) {
      console.error('Error updating language:', error);
    }
  };

  const handleUnitsChange = async (units) => {
    try {
      // Sauvegarder dans localStorage
      localStorage.setItem('userUnits', units);
      setAppPreferences(prev => ({ ...prev, units }));
    } catch (error) {
      console.error('Error updating units:', error);
    }
  };

  // Fonction pour obtenir les initiales du nom
  const getInitials = () => {
    if (!clientData) return 'U';
    const first = clientData.firstname ? clientData.firstname[0] : '';
    const last = clientData.lastname ? clientData.lastname[0] : '';
    return (first + last).toUpperCase() || 'U';
  };

  // Fonction pour obtenir le nom complet
  const getFullName = () => {
    if (!clientData) return 'User';
    return `${clientData.firstname || ''} ${clientData.lastname || ''}`.trim() || 'User';
  };

  if (isLoading && !clientData) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className={`mt-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mt-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => navigate('/dashboard')}
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
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Profile Section */}
        <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {getInitials()}
              </div>
              <button 
                onClick={() => alert('Change photo - Coming soon')}
                className="absolute bottom-0 right-0 p-2 bg-emerald-500 rounded-full hover:bg-emerald-600 transition-colors shadow-lg"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                {getFullName()}
              </h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                {clientData?.email || 'No email provided'}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Farmer since {new Date().getFullYear()}
              </p>
            </div>
            
            <button 
              onClick={() => setShowEditProfileModal(true)}
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
                onClick={item.action}
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
            <div className={`w-full flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </div>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Units
                </span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={appPreferences.units}
                  onChange={(e) => handleUnitsChange(e.target.value)}
                  className={`px-3 py-1 rounded border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-emerald-500 outline-none`}
                >
                  <option value="Metric">Metric</option>
                  <option value="Imperial">Imperial</option>
                </select>
              </div>
            </div>

            <div className={`w-full flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <Globe className="w-5 h-5 text-blue-500" />
                </div>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Language
                </span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={appPreferences.language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className={`px-3 py-1 rounded border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-emerald-500 outline-none`}
                >
                  <option value="English">English</option>
                  <option value="French">French</option>
                </select>
              </div>
            </div>

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
                onClick={item.action}
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

        <div className="text-center py-4">
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            AgriTwin v1.0.0
          </p>
        </div>
      </main>

      {/* MODALS */}
      
      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl max-w-md w-full p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Edit Profile
              </h3>
              <button onClick={() => setShowEditProfileModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditProfile} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={editData.lastname}
                  onChange={(e) => setEditData({...editData, lastname: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-emerald-500 outline-none`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  First Name
                </label>
                <input
                  type="text"
                  value={editData.firstname}
                  onChange={(e) => setEditData({...editData, firstname: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-emerald-500 outline-none`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-emerald-500 outline-none`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Phone
                </label>
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-emerald-500 outline-none`}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} transition-colors`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl max-w-md w-full p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Change Password
              </h3>
              <button onClick={() => setShowChangePasswordModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Old Password
                </label>
                <input
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-emerald-500 outline-none`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-emerald-500 outline-none`}
                  required
                  minLength={8}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-emerald-500 outline-none`}
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowChangePasswordModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} transition-colors`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Manage Subscription
              </h3>
              <button onClick={() => setShowSubscriptionModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Current Plan */}
            <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-2 border-emerald-500">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold text-emerald-700 dark:text-emerald-300">Current Plan: Pro</h4>
                <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-sm font-semibold">Active</span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                Your subscription renews on December 31, 2025
              </p>
              <p className="text-2xl font-bold text-emerald-600">$29/month</p>
            </div>

            {/* Available Plans */}
            <div className="space-y-4">
              <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Available Plans</h4>
              
              {[
                { name: 'Starter', price: 'Free', features: ['Up to 3 fields', 'Basic analytics', 'Community support'] },
                { name: 'Pro', price: '$29', features: ['Unlimited fields', 'Advanced analytics', 'Priority support', 'API access'], current: true },
                { name: 'Enterprise', price: 'Custom', features: ['Everything in Pro', 'Dedicated support', 'Custom integrations', 'SLA guarantee'] }
              ].map((plan) => (
                <div key={plan.name} className={`p-4 rounded-lg border-2 ${plan.current ? 'border-emerald-500' : darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h5>
                      <p className={`text-xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{plan.price}{plan.price !== 'Free' && plan.price !== 'Custom' && '/month'}</p>
                    </div>
                    {!plan.current && (
                      <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                        {plan.price === 'Free' ? 'Downgrade' : 'Upgrade'}
                      </button>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <Check className="w-4 h-4 text-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => alert('Cancel subscription - Contact support')}
                className="text-red-600 dark:text-red-400 hover:underline text-sm"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Help & Support
              </h3>
              <button onClick={() => setShowHelpModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contact Us</h4>
                <div className="space-y-3">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email Support</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>support@agritwin.com</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Response time: 24-48 hours</p>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Phone Support</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>+1 (555) 123-4567</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Mon-Fri: 9AM - 6PM EST</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>FAQ</h4>
                <div className="space-y-3">
                  {[
                    { q: 'How do I add a new field?', a: 'Go to "My Fields" and click the "Add Field" button. Follow the wizard to trace your field boundaries.' },
                    { q: 'Can I export my data?', a: 'Yes! Go to Reports and use the export function to download your data in CSV or PDF format.' },
                    { q: 'How accurate are the simulations?', a: 'Our simulations use advanced algorithms and real weather data to provide 85-90% accuracy in predictions.' }
                  ].map((faq, i) => (
                    <details key={i} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <summary className={`font-medium cursor-pointer ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {faq.q}
                      </summary>
                      <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
                <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                  Need more help? Visit our <a href="#" className="underline font-medium">documentation</a> or join our <a href="#" className="underline font-medium">community forum</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Privacy Policy
              </h3>
              <button onClick={() => setShowPrivacyModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className={`space-y-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p className="text-xs text-gray-500">Last updated: October 5, 2025</p>
              
              <div>
                <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>1. Information We Collect</h4>
                <p>We collect information you provide directly to us, including your name, email address, phone number, and farm data. We also collect data from your use of our services, including field locations, crop information, and simulation results.</p>
              </div>

              <div>
                <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>2. How We Use Your Information</h4>
                <p>We use the information we collect to provide, maintain, and improve our services, to develop new features, and to protect AgriTwin and our users. We also use your information to communicate with you about updates and promotional offers.</p>
              </div>

              <div>
                <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>3. Information Sharing</h4>
                <p>We do not share your personal information with third parties except as described in this policy. We may share aggregated, non-personally identifiable information publicly and with our partners.</p>
              </div>

              <div>
                <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>4. Data Security</h4>
                <p>We use industry-standard security measures to protect your information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
              </div>

              <div>
                <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>5. Your Rights</h4>
                <p>You have the right to access, update, or delete your personal information at any time. You can also opt out of marketing communications. Contact us at privacy@agritwin.com to exercise these rights.</p>
              </div>

              <div className={`p-4 rounded-lg mt-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  For questions about this Privacy Policy, please contact us at privacy@agritwin.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Terms of Service
              </h3>
              <button onClick={() => setShowTermsModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className={`space-y-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p className="text-xs text-gray-500">Last updated: October 5, 2025</p>
              
              <div>
                <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>1. Acceptance of Terms</h4>
                <p>By accessing and using AgriTwin, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, you should not use this service.</p>
              </div>

              <div>
                <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>2. Use License</h4>
                <p>Permission is granted to temporarily use AgriTwin for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials.</p>
              </div>

              <div>
                <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>3. User Account</h4>
                <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.</p>
              </div>

              <div>
                <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>4. Service Modifications</h4>
                <p>AgriTwin reserves the right to modify or discontinue the service at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.</p>
              </div>

              <div>
                <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>5. Disclaimer</h4>
                <p>The materials on AgriTwin are provided on an 'as is' basis. AgriTwin makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties for a particular purpose.</p>
              </div>

              <div>
                <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>6. Limitations</h4>
                <p>In no event shall AgriTwin or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use AgriTwin.</p>
              </div>

              <div className={`p-4 rounded-lg mt-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  For questions about these Terms, please contact us at legal@agritwin.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <ChatSupport />
    </div>
  );
};

export default Settings;