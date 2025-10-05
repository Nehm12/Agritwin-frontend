
import React, { useState } from 'react';
import { Menu, Bell, Sprout, Sun, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className={`fixed top-0 left-0 right-0 ${darkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm shadow-sm z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <Link to="/dashboard" className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                AgriTwin
              </Link>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/create')} 
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}
            >
              Create a field
            </button>
            <button 
              onClick={() => navigate('/map')} 
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}
            >
              Card
            </button>
            <button 
              onClick={() => navigate('/simulation')} 
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}
            >
              Simulations
            </button>
            <button 
              onClick={() => navigate('/notification')} 
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}
            >
              Notifications
            </button>
            
            <button 
              onClick={() => navigate('/settings')} 
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} font-medium transition-colors`}
            >
              Settings
            </button>
          </div>

          {/* Actions (Dark Mode + Notifications + Mobile Menu) */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              <Sun className={`w-5 h-5 ${darkMode ? 'text-amber-400' : 'text-gray-600'}`} />
            </button>

            {/* Notifications */}
            <button 
              onClick={() => navigate('/notification')} 
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors relative`}
            >
              <Bell className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => {
                  navigate('/dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}
              >
                Home
              </button>
              <button 
                onClick={() => {
                  navigate('/create');
                  setMobileMenuOpen(false);
                }}
                className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}
              >
                Create a field
              </button>
              <button 
                onClick={() => {
                  navigate('/map');
                  setMobileMenuOpen(false);
                }}
                className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}
              >
                Card
              </button>
              <button 
                onClick={() => {
                  navigate('/simulation');
                  setMobileMenuOpen(false);
                }}
                className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}
              >
                Simulations
              </button>
              <button 
                onClick={() => {
                  navigate('/notification');
                  setMobileMenuOpen(false);
                }}
                className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}
              >
                Notifications
              </button>
              
              <button 
                onClick={() => {
                  navigate('/settings');
                  setMobileMenuOpen(false);
                }}
                className={`text-left font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-emerald-600'} transition-colors`}
              >
                Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;