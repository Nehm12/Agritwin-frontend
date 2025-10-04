import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sprout, Sun, Moon, User, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas!');
      return;
    }
    
    console.log('Registration submitted:', { 
      nom, 
      prenom, 
      email, 
      telephone, 
      password 
    });
    alert('Inscription réussie! Bienvenue sur AgriTwin.');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-emerald-50 to-green-100'} transition-colors duration-300 flex items-center justify-center p-4`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-6 right-6 p-3 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-lg transition-colors z-10`}
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600" />
        )}
      </button>

      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {/* Logo and Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl mb-4 shadow-lg">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              Rejoignez AgriTwin
            </h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Votre compagnon agricole digital
            </p>
          </div>

          {/* Registration Form */}
          <div className="space-y-5">
            {/* Nom et Prénom */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Nom
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Votre nom"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-emerald-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                    } focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Prénom
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    placeholder="Votre prénom"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-emerald-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                    } focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none`}
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Email <span className="text-gray-500 text-xs">(optionnel)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="email"
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

            {/* Telephone Field */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Numéro de téléphone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="+33 1 23 45 67 89"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-emerald-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                  } focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Créez votre mot de passe"
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
                  {showPassword ? (
                    <EyeOff className={`w-5 h-5 ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors`} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmez votre mot de passe"
                  className={`w-full pl-12 pr-12 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-emerald-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                  } focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className={`w-5 h-5 ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors`} />
                  )}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3.5 px-4 rounded-lg hover:from-emerald-600 hover:to-green-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              S'inscrire
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-4 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                Ou continuer avec
              </span>
            </div>
          </div>

          {/* Social Register Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => alert('Inscription Google à venir!')}
              className={`flex items-center justify-center gap-3 py-3 px-4 rounded-lg border ${
                darkMode 
                  ? 'border-gray-700 bg-gray-700 hover:bg-gray-600' 
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              } transition-all duration-200`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Google
              </span>
            </button>

            <button 
              onClick={() => alert('Inscription Apple à venir!')}
              className={`flex items-center justify-center gap-3 py-3 px-4 rounded-lg border ${
                darkMode 
                  ? 'border-gray-700 bg-gray-700 hover:bg-gray-600' 
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              } transition-all duration-200`}
            >
              <svg className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-900'}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Apple
              </span>
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Vous avez déjà un compte?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            En vous inscrivant, vous acceptez nos{' '}
            <button onClick={() => alert('Conditions d\'utilisation')} className="underline hover:text-emerald-600 transition-colors">
              Conditions d'utilisation
            </button>{' '}
            et notre{' '}
            <button onClick={() => alert('Politique de confidentialité')} className="underline hover:text-emerald-600 transition-colors">
              Politique de confidentialité
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;