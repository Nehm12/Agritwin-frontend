import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, Calendar, Layers, Thermometer, Droplet, Wind, Sprout, TrendingUp, Activity, Beaker, Edit, Share2, Trash2 } from 'lucide-react';

const FieldDetail = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('NDVI');
  const [showOptions, setShowOptions] = useState(false);

  const tabs = [
    { id: 'NDVI', label: 'NDVI', icon: <Activity className="w-4 h-4" /> },
    { id: 'Yield', label: 'Yield', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'Moisture', label: 'Moisture', icon: <Droplet className="w-4 h-4" /> },
    { id: 'Nutrients', label: 'Nutrients', icon: <Sprout className="w-4 h-4" /> }
  ];

  const climateData = [
    { icon: <Thermometer className="w-6 h-6" />, label: 'Temperature', value: '24°C', color: 'text-orange-500' },
    { icon: <Droplet className="w-6 h-6" />, label: 'Humidity', value: '75%', color: 'text-blue-500' },
    { icon: <Wind className="w-6 h-6" />, label: 'Wind', value: '12 km/h', color: 'text-cyan-500' }
  ];

  const fieldInfo = [
    { label: 'Crop Type', value: 'Corn', icon: <Sprout className="w-5 h-5 text-green-500" /> },
    { label: 'Area', value: '50 ha', icon: <TrendingUp className="w-5 h-5 text-purple-500" /> }
  ];

  const soilMoisture = 68;

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
                Field Alpha
              </h1>
            </div>
            
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
                      <Edit className="w-4 h-4" />
                      Edit Field
                    </button>
                    <button className={`w-full px-4 py-3 text-left text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} transition-colors flex items-center gap-2`}>
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    <button className={`w-full px-4 py-3 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 rounded-b-lg`}>
                      <Trash2 className="w-4 h-4" />
                      Delete Field
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Satellite Image */}
        <div className="mb-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="relative">
              <img 
                alt="Satellite NDVI imagery of Field Alpha showing vegetation health"
                className="w-full h-80 object-cover"
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=600&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full mb-2">
                    NDVI Active
                  </span>
                  <p className="text-white text-sm">Last updated: 2h ago</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-white/90 hover:bg-white rounded-lg transition-colors">
                    <Calendar className="w-5 h-5 text-gray-800" />
                  </button>
                  <button className="p-2 bg-white/90 hover:bg-white rounded-lg transition-colors">
                    <Layers className="w-5 h-5 text-gray-800" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Field Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {fieldInfo.map((info, index) => (
            <div 
              key={index}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center gap-3 mb-2">
                {info.icon}
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {info.label}
                </p>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {info.value}
              </p>
            </div>
          ))}
        </div>

        {/* Climate Data */}
        <div className="mb-8">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Climate Data
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {climateData.map((data, index) => (
              <div 
                key={index}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-md transition-all`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-3`}>
                    <div className={data.color}>
                      {data.icon}
                    </div>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                    {data.label}
                  </p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {data.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soil Moisture */}
        <div className="mb-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                  <Droplet className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Soil Moisture
                  </p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {soilMoisture}%
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${soilMoisture}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Dry (0%)</span>
                <span>Optimal (50-70%)</span>
                <span>Wet (100%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Visualization Tabs */}
        <div className="mb-8">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Data Visualization
          </h2>
          
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
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

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} min-h-[300px] flex items-center justify-center`}>
            <div className="text-center">
              {activeTab === 'NDVI' && (
                <>
                  <Activity className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    NDVI Visualization
                  </h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>
                    Normalized Difference Vegetation Index data will be displayed here
                  </p>
                </>
              )}
              {activeTab === 'Yield' && (
                <>
                  <TrendingUp className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Yield Prediction Data
                  </h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>
                    Historical and predicted yield data will be displayed here
                  </p>
                </>
              )}
              {activeTab === 'Moisture' && (
                <>
                  <Droplet className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Soil Moisture Analysis
                  </h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>
                    Detailed soil moisture mapping will be displayed here
                  </p>
                </>
              )}
              {activeTab === 'Nutrients' && (
                <>
                  <Sprout className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Nutrient Levels
                  </h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md`}>
                    Soil nutrient analysis will be displayed here
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Run Simulation Button */}
        <button 
          onClick={() => alert('Simulation started for Field Alpha')}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
        >
          <Beaker className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="text-lg">Run Simulation</span>
        </button>
      </main>
    </div>
  );
};

export default FieldDetail;