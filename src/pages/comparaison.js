import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, X, Plus, Download, Share2, Save, Droplet, TrendingUp, BarChart3, Satellite, Cloud } from 'lucide-react';
import ChatSupport from '../components/Chatbot';
const FieldComparison = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFields, setSelectedFields] = useState([
    {
      id: 1,
      name: 'Field Alpha',
      size: '50 Hectares',
      crop: 'Corn',
      health: 88,
      moisture: 65,
      yield: 8.5,
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Field Beta',
      size: '75 Hectares',
      crop: 'Wheat',
      health: 92,
      moisture: 72,
      yield: 9.2,
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop'
    }
  ]);

  const [availableFields] = useState([
    {
      id: 3,
      name: 'Field Gamma',
      size: '60 Hectares',
      crop: 'Soybean',
      health: 85,
      moisture: 68,
      yield: 7.8,
      image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Field Delta',
      size: '45 Hectares',
      crop: 'Corn',
      health: 90,
      moisture: 70,
      yield: 8.9,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop'
    }
  ]);

  const [activeTab, setActiveTab] = useState('keyMetrics');
  const [showOptions, setShowOptions] = useState(false);

  const tabs = [
    { id: 'keyMetrics', label: 'Key Metrics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'satelliteImagery', label: 'Satellite Imagery', icon: <Satellite className="w-4 h-4" /> },
    { id: 'climateData', label: 'Climate Data', icon: <Cloud className="w-4 h-4" /> }
  ];

  const handleRemoveField = (fieldId) => {
    if (selectedFields.length <= 1) {
      alert('You need at least one field for comparison');
      return;
    }
    setSelectedFields(prev => prev.filter(field => field.id !== fieldId));
  };

  const handleAddField = () => {
    if (selectedFields.length >= 4) {
      alert('Maximum 4 fields can be compared at once');
      return;
    }

    const availableField = availableFields.find(field => 
      !selectedFields.some(selected => selected.id === field.id)
    );

    if (availableField) {
      setSelectedFields(prev => [...prev, availableField]);
    } else {
      alert('No more fields available to add');
    }
  };

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
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Field Comparison
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <button 
                  onClick={() => setShowOptions(!showOptions)}
                  className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                >
                  <MoreVertical className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
                </button>
                
                {showOptions && (
                  <>
                    <div 
                      className="fixed inset-0 z-30"
                      onClick={() => setShowOptions(false)}
                    />
                    <div className={`absolute top-12 right-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg z-40 min-w-[180px] border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <button className={`w-full px-4 py-3 text-left text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} transition-colors flex items-center gap-2 rounded-t-lg`}>
                        <Download className="w-4 h-4" />
                        Export Data
                      </button>
                      <button className={`w-full px-4 py-3 text-left text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} transition-colors flex items-center gap-2`}>
                        <Share2 className="w-4 h-4" />
                        Share Comparison
                      </button>
                      <button className={`w-full px-4 py-3 text-left text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} transition-colors flex items-center gap-2 rounded-b-lg`}>
                        <Save className="w-4 h-4" />
                        Save View
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Instructions */}
        <div className="mb-6 text-center">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Select up to 4 fields to compare side-by-side
          </p>
        </div>

        {/* Field Cards */}
        <div className="overflow-x-auto pb-4 mb-8">
          <div className="flex gap-4 min-w-min">
            {selectedFields.map((field) => (
              <div 
                key={field.id}
                className={`flex-shrink-0 w-80 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url("${field.image}")` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <button 
                    onClick={() => handleRemoveField(field.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-800" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                    {field.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                    {field.size} • {field.crop}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Health</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${field.health}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {field.health}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Moisture</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${field.moisture}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {field.moisture}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Est. Yield</span>
                      <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {field.yield} t/ha
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {selectedFields.length < 4 && (
              <button
                onClick={handleAddField}
                className={`flex-shrink-0 w-80 h-[400px] ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl border-2 border-dashed ${darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'} transition-colors flex flex-col items-center justify-center gap-3 group`}
              >
                <div className="p-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-emerald-600" />
                </div>
                <span className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Add Field
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-white shadow-md'
                    : darkMode 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'keyMetrics' && (
            <div className="space-y-6">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                Key Metrics Comparison
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Soil Moisture Chart */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Droplet className="w-5 h-5 text-blue-500" />
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Soil Moisture
                    </h3>
                  </div>
                  <div className={`h-64 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-lg flex items-center justify-center`}>
                    <div className="text-center">
                      <BarChart3 className={`w-16 h-16 mx-auto mb-3 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                      <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Chart visualization
                      </p>
                    </div>
                  </div>
                </div>

                {/* Crop Health Chart */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Crop Health
                    </h3>
                  </div>
                  <div className={`h-64 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-lg flex items-center justify-center`}>
                    <div className="text-center">
                      <BarChart3 className={`w-16 h-16 mx-auto mb-3 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                      <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Chart visualization
                      </p>
                    </div>
                  </div>
                </div>

                {/* Yield Forecast Chart */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} lg:col-span-2`}>
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Yield Forecast (tons/hectare)
                  </h3>
                  <div className={`h-80 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-lg flex items-center justify-center`}>
                    <div className="text-center">
                      <TrendingUp className={`w-20 h-20 mx-auto mb-3 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                      <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Line chart comparing yield forecast over time
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'satelliteImagery' && (
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-12 text-center border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <Satellite className={`w-20 h-20 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Satellite Imagery
              </h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md mx-auto`}>
                Compare NDVI and other satellite data across selected fields
              </p>
            </div>
          )}

          {activeTab === 'climateData' && (
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-12 text-center border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <Cloud className={`w-20 h-20 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Climate Data
              </h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md mx-auto`}>
                Compare temperature, humidity, and precipitation data
              </p>
            </div>
          )}
        </div>
      
      </main>
      <ChatSupport />
    </div>
  );
};

export default FieldComparison;