import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, Plus, Minus, Navigation, Battery, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const RidePage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [rideDuration, setRideDuration] = useState('00:12:34');
  const [currentCost, setCurrentCost] = useState('$2.75');
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Fake bike data for current ride
  const currentBike = {
    name: 'EcoRide Pro',
    battery: 78,
    speed: '15.2 km/h',
    distance: '3.2 km',
    calories: 125
  };

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize the map centered on Algeria with a more zoomed in view for city riding
      const map = L.map(mapRef.current).setView([36.75, 3.06], 13);
      mapInstanceRef.current = map;

      // Add OpenStreetMap tile layer with a darker style for the ride view
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Create custom user location icon (current position)
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: '<div class="w-4 h-4 bg-blue-500 rounded-full shadow-lg border-2 border-white animate-pulse"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      // Create bike icon for destination
      const bikeIcon = L.divIcon({
        className: 'custom-bike-marker',
        html: '<div class="w-4 h-4 bg-primary rounded-full shadow-lg border-2 border-white"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      // Add user current location marker
      const userLocation = [36.75, 3.06] as [number, number];
      L.marker(userLocation, { icon: userIcon })
        .addTo(map)
        .bindPopup('<div class="bg-blue-500 text-white rounded px-2 py-1 text-xs font-semibold">Your Location</div>');

      // Add route line (simulated route)
      const routeCoordinates = [
        [36.75, 3.06],
        [36.752, 3.062],
        [36.754, 3.064],
        [36.756, 3.066],
        [36.758, 3.068],
      ] as [number, number][];

      const routeLine = L.polyline(routeCoordinates, {
        color: '#14b781',
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 5'
      }).addTo(map);

      // Add destination marker
      L.marker([36.758, 3.068], { icon: bikeIcon })
        .addTo(map)
        .bindPopup('<div class="bg-primary text-white rounded px-2 py-1 text-xs font-semibold">Destination</div>');

      // Add custom CSS for markers
      const style = document.createElement('style');
      style.textContent = `
        .custom-user-marker, .custom-bike-marker {
          background: transparent;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Simulate ride timer
  useEffect(() => {
    const timer = setInterval(() => {
      setRideDuration(prev => {
        const [hours, minutes, seconds] = prev.split(':').map(Number);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;
        const newHours = Math.floor(totalSeconds / 3600);
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSecs = totalSeconds % 60;
        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSecs.toString().padStart(2, '0')}`;
      });
      
      // Update cost based on time
      setCurrentCost(prev => {
        const currentValue = parseFloat(prev.replace('$', ''));
        const newValue = (currentValue + 0.01).toFixed(2);
        return `$${newValue}`;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleEndRide = () => {
    navigate('/home');
  };

  const handleClose = () => {
    navigate('/home');
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-hidden bg-gray-100">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex items-center justify-between">
        <button 
          onClick={handleClose}
          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <h1 className="text-gray-800 text-lg font-semibold">
            {currentBike.name}
          </h1>
        </div>
        <div className="w-10" />
      </div>

      {/* Bike Stats Bar */}
      <div className="absolute top-16 left-4 right-4 z-[1000] mt-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Battery className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">{currentBike.battery}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-600">Speed:</span>
              <span className="text-sm font-medium">{currentBike.speed}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-600">Distance:</span>
              <span className="text-sm font-medium">{currentBike.distance}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="absolute top-32 left-4 right-4 z-[1000] mt-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search destination (optional)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white rounded-full shadow-lg border-0 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute right-4 top-48 z-[1000] flex flex-col space-y-2">
        <button 
          onClick={handleZoomIn}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Plus className="w-6 h-6 text-gray-600" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Minus className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Full Screen Leaflet Map */}
      <div 
        ref={mapRef}
        className="flex-1 w-full h-full min-h-screen"
        style={{ zIndex: 1 }}
      />

      {/* Bottom Ride Info Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-white rounded-t-3xl shadow-lg p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-4 h-4 text-gray-500 mr-1" />
              <p className="text-gray-600 text-sm">Duration</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{rideDuration}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-1">Cost</p>
            <p className="text-2xl font-bold text-primary">{currentCost}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="text-center">
            <p className="text-gray-600 text-xs mb-1">Calories Burned</p>
            <p className="text-lg font-semibold text-gray-900">{currentBike.calories}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-xs mb-1">Avg Speed</p>
            <p className="text-lg font-semibold text-gray-900">{currentBike.speed}</p>
          </div>
        </div>
        
        <Button
          onClick={handleEndRide}
          className="w-full h-14 text-lg font-semibold rounded-full bg-primary hover:bg-primary/90"
        >
          End Ride
        </Button>
        
        <div className="flex items-center justify-center mt-4 space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-xs">🛡️</span>
            </div>
            <span className="text-sm text-gray-600">Safety / Help</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RidePage;
