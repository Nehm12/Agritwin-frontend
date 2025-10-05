import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Search, Filter, Grid, List, MapPin, Sprout, TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatSupport from './chatbot';
import Navbar from './nav';
import axios from 'axios';

const MyField2 = ({ darkMode, setDarkMode }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCrop, setFilterCrop] = useState('all');
  const [fields, setFields] = useState([]);
  const [cropTypes, setCropTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Charger les champs et les types de culture au montage du composant
  useEffect(() => {
    loadFields();
    loadCropTypes();
  }, []);

  const loadFields = async () => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        navigate('/login');
        return;
      }

      // Récupérer TOUS les champs
      const response = await axios.get(`http://localhost:5000/fields/`);
      
      // Filtrer uniquement les champs de l'utilisateur connecté
      /*const userFields = response.data.filter(field => field.user_id === parseInt(userId));*/
      
      console.log('Fetched fields for user:', response);
      
      // Charger les types de cultures
      const cropResponse = await axios.get(`http://localhost:5000/crops/get`);
      setCropTypes(cropResponse.data);
      
      // Transformer les données
      const enhancedFields = response.data.map((field) => {
        const cropInfo = cropResponse.data.find(crop => crop.id === field.crop_type_id) || {};
        const health = Math.floor(Math.random() * 30) + 70;
        const moisture = Math.floor(Math.random() * 50) + 30;
        const status = health >= 90 ? 'Excellent' : health >= 80 ? 'Healthy' : 'Needs Attention';
        const trend = health >= 85 ? 'up' : 'down';

        return {
          id: field.id,
          name: field.name,
          crop: cropInfo.name || 'Unknown Crop',
          area: `${field.area || 0}`,
          health: health,
          moisture: moisture,
          status: status,
          lastUpdate: '2h ago',
          image: getFieldImage(field.crop_type_id),
          trend: trend,
          lat: field.lat,
          lon: field.lon,
          country: field.country,
          city: field.city,
          crop_type_id: field.crop_type_id
        };
      });

      setFields(enhancedFields);
    } catch (error) {
      console.error('Error loading fields:', error);
      setError('Failed to load fields');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCropTypes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/crops');
      setCropTypes(response.data);
    } catch (error) {
      console.error('Error loading crop types:', error);
    }
  };

  const getFieldImage = (cropTypeId) => {
    const images = {
      1: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop', // Corn
      2: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop', // Wheat
      3: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop', // Soybean
      4: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop', // Rice
    };
    return images[cropTypeId] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Excellent': return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'Healthy': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'Needs Attention': return 'text-amber-500 bg-amber-100 dark:bg-amber-900/30';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-700';
    }
  };

  const filteredFields = fields.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         field.crop.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = filterCrop === 'all' || field.crop === filterCrop;
    return matchesSearch && matchesCrop;
  });

  const availableCropTypes = ['all', ...new Set(fields.map(f => f.crop))];

  const handleFieldClick = (fieldId) => {
    navigate(`/field?id=${fieldId}`);
  };

  const handleDeleteField = async (fieldId, fieldName) => {
    if (window.confirm(`Are you sure you want to delete "${fieldName}"?`)) {
      try {
        await axios.delete(`http://localhost:5000/fields/${fieldId}`);
        // Recharger la liste des champs
        await loadFields();
        alert('Field deleted successfully!');
      } catch (error) {
        console.error('Error deleting field:', error);
        alert('Failed to delete field!');
      }
    }
  };

  const totalArea = fields.reduce((sum, field) => sum + (parseFloat(field.area) || 0), 0);
  const avgHealth = fields.length > 0 ? Math.round(fields.reduce((sum, field) => sum + field.health, 0) / fields.length) : 0;
  const alertCount = fields.filter(field => field.health < 80).length;

  if (isLoading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className={`mt-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Loading fields...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 space-y-6">
        
        {/* Stats Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Fields</p>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{fields.length}</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Area</p>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{totalArea} ha</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Avg Health</p>
            <p className={`text-2xl font-bold ${avgHealth >= 80 ? 'text-green-500' : 'text-amber-500'}`}>
              {avgHealth}%
            </p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Alerts</p>
            <p className={`text-2xl font-bold ${alertCount > 0 ? 'text-amber-500' : 'text-green-500'}`}>
              {alertCount}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search fields..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              } focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none`}
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterCrop}
              onChange={(e) => setFilterCrop(e.target.value)}
              className={`px-4 py-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none`}
            >
              {availableCropTypes.map(crop => (
                <option key={crop} value={crop}>
                  {crop === 'all' ? 'All Crops' : crop}
                </option>
              ))}
            </select>

            <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-800 shadow-sm' : ''}`}
              >
                <Grid className={`w-5 h-5 ${viewMode === 'grid' ? 'text-emerald-500' : darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-800 shadow-sm' : ''}`}
              >
                <List className={`w-5 h-5 ${viewMode === 'list' ? 'text-emerald-500' : darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'} border`}>
            <p className={`text-sm ${darkMode ? 'text-red-300' : 'text-red-800'}`}>{error}</p>
          </div>
        )}

        {/* Fields Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFields.map((field) => (
              <div
                key={field.id}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-md transition-all cursor-pointer group`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={field.image}
                    alt={field.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(field.status)}`}>
                      {field.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-lg mb-1">{field.name}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{field.area}</span>
                      {field.city && <span>• {field.city}</span>}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sprout className="w-5 h-5 text-green-500" />
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {field.crop}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {field.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Health</span>
                      <span className={`font-semibold ${field.health >= 80 ? 'text-green-500' : 'text-amber-500'}`}>
                        {field.health}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${field.health >= 80 ? 'bg-green-500' : 'bg-amber-500'}`}
                        style={{ width: `${field.health}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Moisture</span>
                    <span className="font-semibold text-blue-500">{field.moisture}%</span>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFieldClick(field.id);
                      }}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteField(field.id, field.name);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>

                  <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} text-center`}>
                    Updated {field.lastUpdate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFields.map((field) => (
              <div
                key={field.id}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-md transition-all`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={field.image}
                    alt={field.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {field.name}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {field.crop} • {field.area} {field.city && `• ${field.city}`}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(field.status)}`}>
                        {field.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Health</p>
                        <p className={`font-semibold ${field.health >= 80 ? 'text-green-500' : 'text-amber-500'}`}>
                          {field.health}%
                        </p>
                      </div>
                      <div>
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Moisture</p>
                        <p className="font-semibold text-blue-500">{field.moisture}%</p>
                      </div>
                      <div>
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Location</p>
                        <p className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {field.city || 'Unknown'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleFieldClick(field.id)}
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-1 px-2 rounded text-xs font-medium transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteField(field.id, field.name)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredFields.length === 0 && !isLoading && (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-12 text-center border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <Sprout className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              No fields found
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              {fields.length === 0 ? 'You haven\'t created any fields yet.' : 'Try adjusting your search or filters'}
            </p>
            {fields.length === 0 && (
              <button
                onClick={() => navigate('/create')}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Create Your First Field
              </button>
            )}
          </div>
        )}
      </main>

      <ChatSupport />
    </div>
  );
};

// Composant wrapper pour gérer l'état darkMode
const MyFieldsWithDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <MyField2 
      darkMode={darkMode} 
      setDarkMode={setDarkMode} 
    />
  );
};

export default MyFieldsWithDarkMode;