import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter, Grid, List, MapPin, Sprout, TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import ChatSupport from './chatbot';
const MyFields = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCrop, setFilterCrop] = useState('all');
  const navigate = useNavigate();
  const fields = [
    {
      id: 1,
      name: 'Field Alpha',
      crop: 'Corn',
      area: '50 ha',
      health: 88,
      moisture: 65,
      status: 'Healthy',
      lastUpdate: '2h ago',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop',
      trend: 'up'
    },
    {
      id: 2,
      name: 'Field Beta',
      crop: 'Wheat',
      area: '75 ha',
      health: 92,
      moisture: 72,
      status: 'Excellent',
      lastUpdate: '5h ago',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      trend: 'up'
    },
    {
      id: 3,
      name: 'Field Gamma',
      crop: 'Soybean',
      area: '60 ha',
      health: 75,
      moisture: 45,
      status: 'Needs Attention',
      lastUpdate: '1d ago',
      image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop',
      trend: 'down'
    },
    {
      id: 4,
      name: 'Field Delta',
      crop: 'Rice',
      area: '45 ha',
      health: 85,
      moisture: 80,
      status: 'Healthy',
      lastUpdate: '3h ago',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
      trend: 'up'
    }
  ];

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

  const cropTypes = ['all', ...new Set(fields.map(f => f.crop))];

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
              My Fields
            </h1>
            <button 
              onClick={() => navigate('/create')}
              className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Stats Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Fields</p>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{fields.length}</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Area</p>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>230 ha</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Avg Health</p>
            <p className={`text-2xl font-bold text-green-500`}>85%</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Alerts</p>
            <p className={`text-2xl font-bold text-amber-500`}>3</p>
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
              {cropTypes.map(crop => (
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

        {/* Fields Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFields.map((field) => (
              <div
                key={field.id}
                onClick={() => alert(`View ${field.name} details`)}
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

                  <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} text-center pt-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
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
                onClick={() => alert(`View ${field.name} details`)}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-md transition-all cursor-pointer`}
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
                          {field.crop} • {field.area}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(field.status)}`}>
                        {field.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
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
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Updated</p>
                        <p className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {field.lastUpdate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredFields.length === 0 && (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-12 text-center border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <Sprout className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              No fields found
            </h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyFields;