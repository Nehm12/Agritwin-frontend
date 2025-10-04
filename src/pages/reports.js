import React, { useState } from 'react';
import { ArrowLeft, Download, Calendar, TrendingUp, Droplet, DollarSign, Sprout, BarChart3, FileText, Filter } from 'lucide-react';
import ChatSupport from './chatbot';
const ReportsAnalytics = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedReport, setSelectedReport] = useState('overview');

  const periods = [
    { id: 'month', label: 'Last Month' },
    { id: '3months', label: 'Last 3 Months' },
    { id: '6months', label: 'Last 6 Months' },
    { id: 'year', label: 'This Year' }
  ];

  const reportTypes = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'yield', label: 'Yield Analysis', icon: <Sprout className="w-5 h-5" /> },
    { id: 'resources', label: 'Resources Used', icon: <Droplet className="w-5 h-5" /> },
    { id: 'financial', label: 'Financial', icon: <DollarSign className="w-5 h-5" /> }
  ];

  const keyMetrics = [
    { label: 'Total Yield', value: '458 tons', change: '+12%', trend: 'up', icon: <Sprout className="w-5 h-5 text-green-500" /> },
    { label: 'Revenue', value: '$125,400', change: '+8%', trend: 'up', icon: <DollarSign className="w-5 h-5 text-blue-500" /> },
    { label: 'Water Used', value: '2.5M L', change: '-15%', trend: 'down', icon: <Droplet className="w-5 h-5 text-cyan-500" /> },
    { label: 'Avg Yield/Ha', value: '6.8 tons', change: '+5%', trend: 'up', icon: <TrendingUp className="w-5 h-5 text-purple-500" /> }
  ];

  const seasonalData = [
    { season: 'Winter 2024', yield: 95, cost: 24000, revenue: 42000 },
    { season: 'Spring 2024', yield: 120, cost: 28000, revenue: 48000 },
    { season: 'Summer 2024', yield: 145, cost: 32000, revenue: 58000 },
    { season: 'Fall 2024', yield: 98, cost: 26000, revenue: 44000 }
  ];

  const handleExportReport = (format) => {
    alert(`Exporting report as ${format.toUpperCase()}`);
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
              Reports & Analytics
            </h1>
            <button 
              onClick={() => handleExportReport('pdf')}
              className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Period Selector */}
        <div className="flex flex-wrap gap-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                selectedPeriod === period.id
                  ? 'bg-emerald-500 text-white shadow-md'
                  : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Report Type Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {reportTypes.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                selectedReport === report.id
                  ? 'bg-emerald-500 text-white shadow-md'
                  : darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {report.icon}
              {report.label}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyMetrics.map((metric, index) => (
            <div 
              key={index}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  {metric.icon}
                </div>
                <span className={`text-sm font-semibold ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change}
                </span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                {metric.label}
              </p>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* Seasonal Comparison */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Seasonal Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <tr>
                  <th className={`text-left py-3 px-4 font-semibold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Season
                  </th>
                  <th className={`text-left py-3 px-4 font-semibold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Yield (tons)
                  </th>
                  <th className={`text-left py-3 px-4 font-semibold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Cost
                  </th>
                  <th className={`text-left py-3 px-4 font-semibold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Revenue
                  </th>
                  <th className={`text-left py-3 px-4 font-semibold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Profit
                  </th>
                </tr>
              </thead>
              <tbody>
                {seasonalData.map((data, index) => {
                  const profit = data.revenue - data.cost;
                  return (
                    <tr 
                      key={index}
                      className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors`}
                    >
                      <td className={`py-3 px-4 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {data.season}
                      </td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {data.yield}
                      </td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        ${data.cost.toLocaleString()}
                      </td>
                      <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        ${data.revenue.toLocaleString()}
                      </td>
                      <td className={`py-3 px-4 font-semibold ${profit > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ${profit.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Yield Trend
            </h3>
            <div className={`h-64 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-lg flex items-center justify-center`}>
              <div className="text-center">
                <BarChart3 className={`w-16 h-16 mx-auto mb-3 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Yield trend chart
                </p>
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Resource Usage
            </h3>
            <div className={`h-64 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-lg flex items-center justify-center`}>
              <div className="text-center">
                <Droplet className={`w-16 h-16 mx-auto mb-3 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Resource usage breakdown
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Export Report
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['pdf', 'excel', 'csv', 'json'].map((format) => (
              <button
                key={format}
                onClick={() => handleExportReport(format)}
                className={`flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                  darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                {format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </main>

      <ChatSupport />
    </div>
  );
};

export default ReportsAnalytics;