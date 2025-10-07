import React, { useState, useEffect, useRef } from 'react';
import { Layers, MapPin, Droplet, Sun, Activity } from 'lucide-react';
import ChatSupport from './chatbot';
import Navbar from './nav';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapView = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [selectedLayer, setSelectedLayer] = useState('satellite');
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [fields, setFields] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Couches de carte disponibles
  const layers = [
    { 
      id: 'satellite', 
      name: 'Satellite', 
      icon: <MapPin className="w-4 h-4" />,
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri'
    },
    { 
      id: 'street', 
      name: 'Street Map', 
      icon: <Activity className="w-4 h-4" />,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors'
    },
    { 
      id: 'terrain', 
      name: 'Terrain', 
      icon: <Droplet className="w-4 h-4" />,
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenTopoMap'
    },
  ];

  // Charger les champs depuis le backend
  useEffect(() => {
    loadFields();
  }, []);

  const loadFields = async () => {
    try {
      // Remplacez par votre endpoint API
      const response = await fetch(`${API_URL}/fields`);
      const data = await response.json();
      
      // Transformer les données si nécessaire
      const transformedFields = data.map(field => ({
        id: field.id,
        name: field.name,
        lat: parseFloat(field.latitude) || 6.3703, // Cotonou par défaut
        lng: parseFloat(field.longitude) || 2.3912,
        health: calculateHealth(field),
        crop: field.crop_type || 'Unknown',
        area: field.area,
        color: getHealthColor(calculateHealth(field))
      }));
      
      setFields(transformedFields);
    } catch (error) {
      console.error('Erreur lors du chargement des champs:', error);
      // Données de démonstration si l'API échoue
      setFields([
        { id: 1, name: 'Field Alpha', lat: 6.3703, lng: 2.3912, health: 88, crop: 'Corn', area: 50, color: 'emerald' },
        { id: 2, name: 'Field Beta', lat: 6.3850, lng: 2.4050, health: 92, crop: 'Wheat', area: 75, color: 'emerald' },
        { id: 3, name: 'Field Gamma', lat: 6.3600, lng: 2.3800, health: 75, crop: 'Soybean', area: 60, color: 'amber' },
      ]);
    }
  };

  const calculateHealth = (field) => {
    // Logique de calcul de la santé du champ basée sur vos données
    // Exemple simplifié
    return Math.floor(Math.random() * 30) + 70;
  };

  const getHealthColor = (health) => {
    if (health >= 85) return 'emerald';
    if (health >= 70) return 'blue';
    return 'amber';
  };

  const getColorHex = (color) => {
    const colors = {
      emerald: '#10b981',
      blue: '#3b82f6',
      amber: '#f59e0b'
    };
    return colors[color];
  };

  // Initialiser la carte
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Créer la carte centrée sur Cotonou, Bénin
    const map = L.map(mapRef.current).setView([6.3703, 2.3912], 13);

    // Ajouter la couche par défaut
    const currentLayer = layers.find(l => l.id === selectedLayer);
    L.tileLayer(currentLayer.url, {
      attribution: currentLayer.attribution,
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Changer de couche de carte
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    
    // Supprimer toutes les couches existantes
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    // Ajouter la nouvelle couche
    const currentLayer = layers.find(l => l.id === selectedLayer);
    L.tileLayer(currentLayer.url, {
      attribution: currentLayer.attribution,
      maxZoom: 18,
    }).addTo(map);
  }, [selectedLayer]);

  // Ajouter les marqueurs des champs
  useEffect(() => {
    if (!mapInstanceRef.current || fields.length === 0) return;

    const map = mapInstanceRef.current;

    // Supprimer les anciens marqueurs
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Ajouter les nouveaux marqueurs
    fields.forEach(field => {
      // Créer une icône personnalisée colorée
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 40px;
            height: 40px;
            background-color: ${getColorHex(field.color)};
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
          ">
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const marker = L.marker([field.lat, field.lng], { icon })
        .addTo(map)
        .on('click', () => {
          setSelectedField(field);
          map.setView([field.lat, field.lng], 15, { animate: true });
        });

      // Popup avec informations
      marker.bindPopup(`
        <div style="font-family: system-ui; min-width: 150px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${field.name}</h3>
          <p style="margin: 4px 0; color: #666; font-size: 13px;">${field.crop}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Health:</strong> <span style="color: ${getColorHex(field.color)};">${field.health}%</span></p>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Area:</strong> ${field.area} ha</p>
        </div>
      `);

      markersRef.current.push(marker);
    });

    // Ajuster la vue pour montrer tous les champs
    if (fields.length > 0) {
      const bounds = L.latLngBounds(fields.map(f => [f.lat, f.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [fields]);

  return (
    <div className={`h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300 overflow-hidden`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Map Header */}
      <div className={`absolute top-16 left-0 right-0 z-[1000] ${darkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm shadow-sm`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Field Map - {fields.length} Fields
            </h1>
            <button 
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors relative`}
            >
              <Layers className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-full pt-28">
        <div 
          ref={mapRef} 
          className="w-full h-full"
          style={{ zIndex: 1 }}
        />

        {/* Layer Menu */}
        {showLayerMenu && (
          <>
            <div className="fixed inset-0 z-[1001]" onClick={() => setShowLayerMenu(false)} />
            <div className={`absolute top-20 right-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg z-[1002] p-2 w-48`}>
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => {
                    setSelectedLayer(layer.id);
                    setShowLayerMenu(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    selectedLayer === layer.id
                      ? 'bg-emerald-500 text-white'
                      : darkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {layer.icon}
                  <span className="font-medium">{layer.name}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Selected Field Info */}
        {selectedField && (
          <div className={`absolute bottom-4 left-4 right-4 md:right-auto md:w-96 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-4 z-[1000] animate-slideUp`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedField.name}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedField.crop} - {selectedField.area} ha
                </p>
              </div>
              <button
                onClick={() => setSelectedField(null)}
                className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Health</p>
                <p className={`text-xl font-bold`} style={{ color: getColorHex(selectedField.color) }}>
                  {selectedField.health}%
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Location</p>
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedField.lat.toFixed(4)}, {selectedField.lng.toFixed(4)}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => window.location.href = `${API_URL}/field/${selectedField.id}`}
                className="flex-1 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
              >
                View Details
              </button>
              <button 
                onClick={() => window.location.href = `/simulation?field=${selectedField.id}`}
                className={`flex-1 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-white' : 'text-gray-800'} rounded-lg font-medium transition-colors`}
              >
                Run Simulation
              </button>
            </div>
          </div>
        )}

        {/* Legend */}
        {!selectedField && (
          <div className={`absolute bottom-4 right-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-3 z-[1000]`}>
            <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Field Health
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Excellent (85%+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Good (70-84%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Needs Attention (&lt;70%)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <ChatSupport />

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .leaflet-container {
          font-family: system-ui, -apple-system, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default MapView;