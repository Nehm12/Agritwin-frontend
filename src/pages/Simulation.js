import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, Download, Share2, Play, TrendingUp, TrendingDown, Droplet, Sprout, DollarSign, Zap, CheckCircle, AlertTriangle, ChevronDown, BarChart3 } from 'lucide-react';

const Simulation = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('standard');
  const [showDetailedData, setShowDetailedData] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const scenarios = [
    { id: 'standard', label: 'Standard Irrigation' },
    { id: 'reduced', label: 'Reduced Fertilizer' },
    { id: 'newcrop', label: 'New Crop' }
  ];

  const summaryCards = [
    {
      title: 'Predicted Yield',
      value: '120 tons',
      change: '+5%',
      trend: 'up',
      icon: <Sprout className="w-5 h-5" />,
      color: 'emerald'
    },
    {
      title: 'Estimated Profit',
      value: '$45,000',
      change: '-2%',
      trend: 'down',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'blue'
    },
    {
      title: 'Water Consumption',
      value: '500k L',
      change: '-10%',
      trend: 'down',
      icon: <Droplet className="w-5 h-5" />,
      color: 'cyan'
    },
    {
      title: 'Fertilizer Use',
      value: '250 kg',
      change: '+3%',
      trend: 'up',
      icon: <Zap className="w-5 h-5" />,
      color: 'amber'
    }
  ];

  const recommendations = [
    {
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-500',
      text: 'Reduce irrigation by 15% in July to optimize water usage without impacting yield.'
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-500',
      text: 'Apply nitrogen fertilizer during the vegetative growth stage for maximum absorption.'
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-amber-500',
      text: 'Monitor for signs of pest activity near the northern field boundary.'
    }
  ];

  const detailedData = [
    { metric: 'Soil Moisture', value: '45%', change: '-5%', changeColor: 'text-green-500', notes: 'Optimal range' },
    { metric: 'Nitrogen Level', value: '120 ppm', change: '+10%', changeColor: 'text-green-500', notes: 'Slightly high' },
    { metric: 'Photosynthesis Rate', value: '92%', change: '-1.5%', changeColor: 'text-red-500', notes: 'Monitor closely' }
  ];

  const getColorClass = (color) => {
    const colors = {
      emerald: 'text-emerald-500',
      blue: 'text-blue-500',
      cyan: 'text-cyan-500',
      amber: 'text-amber-500'
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300 pb-20`}>
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
              Simulation Results
            </h1>
            
            <div className="relative">
              <button 
                onClick={() => setShowOptions(!showOptions)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <MoreVertical className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
              </button>
              
              {showOptions && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowOptions(false)} />
                  <div className={`absolute top-12 right-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg z-40 min-w-[180px] border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <button className={`w-full px-4 py-3 text-left text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} transition-colors flex items-center gap-2 rounded-t-lg`}>
                      <Download className="w-4 h-4" />
                      Export Data
                    </button>
                    <button className={`w-full px-4 py-3 text-left text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} transition-colors flex items-center gap-2`}>
                      <Share2 className="w-4 h-4" />
                      Share Results
                    </button>
                    <button className={`w-full px-4 py-3 text-left text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'} transition-colors flex items-center gap-2 rounded-b-lg`}>
                      <Play className="w-4 h-4" />
                      Run New Simulation
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Scenario Selector */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-2 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex gap-2`}>
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id)}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                selectedScenario === scenario.id
                  ? 'bg-emerald-500 text-white shadow-md'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {scenario.label}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card, index) => (
            <div 
              key={index}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:shadow-md transition-all`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className={getColorClass(card.color)}>
                    {card.icon}
                  </div>
                </div>
                <div className={`flex items-center gap-1 ${card.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {card.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm font-semibold">{card.change}</span>
                </div>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                {card.title}
              </p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Growth Chart */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="mb-4">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                Crop Growth Over Time
              </h3>
              <div className="flex items-center gap-2">
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  +1.2%
                </p>
                <span className="text-green-500 text-sm font-medium">Last 6 months</span>
              </div>
            </div>
            <div className={`h-48 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-lg flex items-center justify-center`}>
              <div className="text-center">
                <BarChart3 className={`w-16 h-16 mx-auto mb-3 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Growth chart visualization
                </p>
              </div>
            </div>
          </div>

          {/* Yield Comparison */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="mb-4">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                Yield Comparison
              </h3>
              <div className="flex items-center gap-2">
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  +2.5%
                </p>
                <span className="text-green-500 text-sm font-medium">vs. Standard</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 h-48 items-end">
              <div className="flex flex-col items-center gap-2">
                <div className="w-full bg-blue-400 rounded-t-lg" style={{ height: '70%' }}></div>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Standard</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-full bg-emerald-500 rounded-t-lg" style={{ height: '85%' }}></div>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Reduced Fert.</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-full bg-cyan-400 rounded-t-lg" style={{ height: '60%' }}></div>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>New Crop</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Recommendations
          </h3>
          <ul className="space-y-4">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className={rec.color}>
                  {rec.icon}
                </div>
                <p className={`flex-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {rec.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Detailed Data Toggle */}
        <div>
          <button
            onClick={() => setShowDetailedData(!showDetailedData)}
            className={`w-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between transition-colors`}
          >
            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              View Detailed Data
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${showDetailedData ? 'rotate-180' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
          
          {showDetailedData && (
            <div className={`mt-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    <tr>
                      <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Metric</th>
                      <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Value</th>
                      <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Change</th>
                      <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailedData.map((data, index) => (
                      <tr 
                        key={index}
                        className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors`}
                      >
                        <td className={`py-3 px-4 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {data.metric}
                        </td>
                        <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {data.value}
                        </td>
                        <td className={`py-3 px-4 font-semibold ${data.changeColor}`}>
                          {data.change}
                        </td>
                        <td className={`py-3 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {data.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating Compare Button */}
      <button 
        onClick={() => alert('Compare scenarios')}
        className="fixed bottom-8 right-8 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50"
      >
        <BarChart3 className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Simulation;