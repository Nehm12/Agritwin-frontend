import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sprout, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /*const handleSubmit = async () => {
    setError('');
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    try {
      setLoading(true);
      // Remplace l'URL par l'endpoint correct de ton API Flask
      const response = await axios.post('http://localhost:5000/login', {
        phone: email,  // ici on envoie "phone" car ton Flask login utilise phone
        password: password
      });

      // Connexion réussie
      console.log('Connexion réussie :', response.data);
      
      
      // Exemple : stocker les infos utilisateur dans localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirection vers la page d'accueil ou dashboard
      navigate('/dashboard');

    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError('Identifiants incorrects.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };*/

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/users/login', {
      phone: email,
      password: password
    });

    if (response.data.user) {
      // Sauvegarder les informations utilisateur
      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      localStorage.setItem('isLoggedIn', 'true');
      
      // Rediriger vers le dashboard
      navigate('/dashboard');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed!');
  }
};

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-emerald-50 to-green-100'} transition-colors duration-300 flex items-center justify-center p-4`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-6 right-6 p-3 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-lg transition-colors z-10`}
      >
        {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
      </button>

      <div className="w-full max-w-md">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl mb-4 shadow-lg">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              Welcome to AgriTwin
            </h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Your digital farm companion
            </p>
          </div>

          <div className="space-y-5">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Email or Phone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@agritwin.com"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-emerald-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                  } focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-12 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-emerald-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                  } focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? <EyeOff className={`w-5 h-5 ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors`} /> : <Eye className={`w-5 h-5 ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors`} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3.5 px-4 rounded-lg hover:from-emerald-600 hover:to-green-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? 'Connexion...' : 'Sign In'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Don't have an account?{' '}
              <button onClick={() => navigate('/register')} className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
