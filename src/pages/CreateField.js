import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Sprout, Droplet, Package, Image, Upload, CheckCircle, Loader } from 'lucide-react';
import axios from 'axios';
import Navbar from './nav';
import ChatSupport from './chatbot';

const FieldCreation = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [step, setStep] = useState(1);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [formData, setFormData] = useState({
    fieldName: '',
    location: '',
    latitude: '',
    longitude: '',
    area: '',
    cropType: '',
    soilType: '',
    irrigationType: '',
    fertilizationType: ''
  });
  const [cropTypes, setCropTypes] = useState([]);
  
  useEffect(() => {
    loadCrops();
  }, []);
  
  const loadCrops = async () => {
    try {
      const response = await axios.get('http://localhost:5000/crops/get');
      setCropTypes(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const irrigationTypes = ['Drip', 'Sprinkler', 'Surface', 'Manual', 'Rain-fed'];
  const fertilizationTypes = ['Organic', 'Chemical', 'Mixed', 'None'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Fonction pour obtenir la localisation actuelle
  const getCurrentLocation = () => {
  setLoadingLocation(true);

  if (!navigator.geolocation) {
    alert('La géolocalisation n\'est pas supportée par votre navigateur');
    setLoadingLocation(false);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude.toFixed(6);
      const lon = position.coords.longitude.toFixed(6);
      
      // Mettre à jour les coordonnées
      handleInputChange('latitude', lat);
      handleInputChange('longitude', lon);

      // Obtenir l'adresse via reverse geocoding (OpenStreetMap Nominatim API)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'AgriTwin-App'
            }
          }
        );

        const data = await response.json(); // ✅ Important : récupérer les données

        if (data && data.display_name) { // ✅ Utiliser 'data' au lieu de 'response.data'
          handleInputChange('location', data.display_name);
        } else {
          // Fallback si pas d'adresse trouvée
          handleInputChange('location', `Lat: ${lat}, Lon: ${lon}`);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'adresse:', error);
        // Fallback en cas d'erreur
        handleInputChange('location', `Lat: ${lat}, Lon: ${lon}`);
      }

      setLoadingLocation(false);
    },
    (error) => {
      setLoadingLocation(false);
      let errorMessage = 'Impossible d\'obtenir votre position';
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Vous avez refusé l\'accès à la géolocalisation. Veuillez autoriser l\'accès dans les paramètres de votre navigateur.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Les informations de localisation ne sont pas disponibles.';
          break;
        case error.TIMEOUT:
          errorMessage = 'La demande de géolocalisation a expiré.';
          break;
        default:
          errorMessage = 'Une erreur inconnue s\'est produite.';
      }
      
      alert(errorMessage);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
};

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Vous devez être connecté pour créer un champ');
        return;
      }

      const response = await axios.post("http://localhost:5000/fields/", {
        user_id: parseInt(userId),
        name: formData.fieldName,
        lat: parseFloat(formData.latitude),
        lon: parseFloat(formData.longitude),
        area: parseFloat(formData.area),
        country: "Benin",
        city: formData.location,
        crop_type_id: formData.cropType.id
      });

      alert("Champ créé avec succès!");
      console.log("Champ créé:", response.data);
      
      // Redirection ou réinitialisation du formulaire
      window.location.href = '/My_Fields';

    } catch (error) {
      console.error("Erreur lors de la création du champ:", error);
      alert("Échec de la création du champ!");
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.fieldName && formData.area;
      case 2:
        return formData.location || (formData.latitude && formData.longitude);
      case 3:
        return formData.cropType?.id;
      case 4:
        return formData.irrigationType && formData.fertilizationType;
      default:
        return false;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                num < step ? 'bg-emerald-500 text-white' : 
                num === step ? 'bg-emerald-500 text-white' : 
                darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
              }`}>
                {num < step ? <CheckCircle className="w-6 h-6" /> : num}
              </div>
              {num < 4 && (
                <div className={`flex-1 h-1 mx-2 ${
                  num < step ? 'bg-emerald-500' : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs">
          <span className={step >= 1 ? 'text-emerald-500 font-semibold' : darkMode ? 'text-gray-500' : 'text-gray-400'}>Basic Info</span>
          <span className={step >= 2 ? 'text-emerald-500 font-semibold' : darkMode ? 'text-gray-500' : 'text-gray-400'}>Location</span>
          <span className={step >= 3 ? 'text-emerald-500 font-semibold' : darkMode ? 'text-gray-500' : 'text-gray-400'}>Crop & Soil</span>
          <span className={step >= 4 ? 'text-emerald-500 font-semibold' : darkMode ? 'text-gray-500' : 'text-gray-400'}>Management</span>
        </div>
      </div>

      {/* Form Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
                  <Sprout className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  Basic Information
                </h2>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Let's start with the essentials
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Field Name *
                </label>
                <input
                  type="text"
                  value={formData.fieldName}
                  onChange={(e) => handleInputChange('fieldName', e.target.value)}
                  placeholder="e.g., North Field, Field Alpha"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  } focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Area (hectares) *
                </label>
                <input
                  type="number"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  placeholder="e.g., 50"
                  step="0.01"
                  min="0"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  } focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none`}
                />
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  Location
                </h2>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Where is your field located?
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Address or Description
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Route 45, Near Riverview"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  } focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none`}
                />
              </div>

              <div className="text-center">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>OR</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={formData.latitude}
                    onChange={(e) => handleInputChange('latitude', e.target.value)}
                    placeholder="e.g., 40.7128"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    } focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={formData.longitude}
                    onChange={(e) => handleInputChange('longitude', e.target.value)}
                    placeholder="e.g., -74.0060"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    } focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none`}
                  />
                </div>
              </div>

              <button 
                onClick={getCurrentLocation}
                disabled={loadingLocation}
                className={`w-full py-3 px-4 ${
                  loadingLocation 
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' 
                    : 'bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                } text-blue-600 dark:text-blue-400 rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
              >
                {loadingLocation ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Récupération de la position...
                  </>
                ) : (
                  <>
                    <MapPin className="w-5 h-5" />
                    Use Current Location
                  </>
                )}
              </button>

              {formData.latitude && formData.longitude && (
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'} border ${darkMode ? 'border-emerald-800' : 'border-emerald-200'}`}>
                  <p className={`text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    ✓ Coordonnées détectées: {formData.latitude}, {formData.longitude}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Crop & Soil */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                  <Sprout className="w-8 h-8 text-green-600" />
                </div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  Crop & Soil Type
                </h2>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  What are you growing?
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Crop Type *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {cropTypes.map((crop) => (
                    <button
                      key={crop.id}
                      onClick={() => handleInputChange('cropType', crop)}
                      className={`py-3 px-4 rounded-lg font-medium transition-all ${
                        formData.cropType?.id === crop.id
                          ? 'bg-emerald-500 text-white shadow-md'
                          : darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {crop.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Management */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-4">
                  <Droplet className="w-8 h-8 text-cyan-600" />
                </div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  Management Practices
                </h2>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  How do you manage your field?
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Irrigation Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {irrigationTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleInputChange('irrigationType', type)}
                      className={`py-3 px-4 rounded-lg font-medium transition-all ${
                        formData.irrigationType === type
                          ? 'bg-emerald-500 text-white shadow-md'
                          : darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Fertilization Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {fertilizationTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleInputChange('fertilizationType', type)}
                      className={`py-3 px-4 rounded-lg font-medium transition-all ${
                        formData.fertilizationType === type
                          ? 'bg-emerald-500 text-white shadow-md'
                          : darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-6">
          {step > 1 && (
            <button
              onClick={handlePrevious}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold ${
                darkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              } transition-colors`}
            >
              Previous
            </button>
          )}
          
          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                isStepValid()
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : darkMode
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                isStepValid()
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : darkMode
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Create Field
            </button>
          )}
        </div>
      </main>

      <ChatSupport />
    </div>
  );
};

export default FieldCreation;