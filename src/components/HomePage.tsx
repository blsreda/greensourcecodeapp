
import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Minus, Navigation, QrCode, Menu, X, User, Clock, HelpCircle, Bike } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const HomePage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize the map centered on Algeria
      const map = L.map(mapRef.current).setView([28.0339, 1.6596], 6);
      mapInstanceRef.current = map;

      // Add OpenStreetMap tile layer (free, no auth required)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Create custom bike icon
      const bikeIcon = L.divIcon({
        className: 'custom-bike-marker',
        html: '<div class="w-4 h-4 bg-primary rounded-full shadow-lg border-2 border-white animate-pulse"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      // Add bike markers in Algerian cities
      const bikeStations = [
        { coords: [36.75, 3.06], city: 'Algiers', bikes: 5 },
        { coords: [35.6971, -0.6308], city: 'Oran', bikes: 3 },
        { coords: [36.365, 6.6147], city: 'Constantine', bikes: 7 },
      ];

      bikeStations.forEach(station => {
        L.marker(station.coords as [number, number], { icon: bikeIcon })
          .addTo(map)
          .bindPopup(`<div class="bg-primary text-white rounded px-2 py-1 text-xs font-semibold">${station.bikes} bikes available in ${station.city}</div>`);
      });

      // Add city labels
      bikeStations.forEach(station => {
        L.marker(station.coords as [number, number])
          .addTo(map)
          .bindTooltip(station.city, { permanent: true, direction: 'right', className: 'city-label' });
      });

      // Add custom CSS for markers and labels
      const style = document.createElement('style');
      style.textContent = `
        .custom-bike-marker {
          background: transparent;
        }
        .city-label {
          background: white !important;
          border: 1px solid #ccc !important;
          border-radius: 4px !important;
          padding: 2px 6px !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          color: #374151 !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
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

  const handleLocateUser = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.locate({ setView: true, maxZoom: 16 });
    }
  };

  const handleScanToUnlock = () => {
    navigate('/scan');
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-hidden bg-gray-100">
      {/* Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-[1001] bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="/lovable-uploads/4e46b6f1-7d2b-46c0-88cf-917a5a746d7d.png" 
                alt="Green Pedal Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Green Pedal</h1>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200">
            <div className="p-4 space-y-4">
              {/* Profile Section */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">John Doe</p>
                  <p className="text-sm text-gray-500">john.doe@email.com</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                <button 
                  onClick={() => navigate('/all-bikes')}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Bike className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-800">All Bikes</p>
                    <p className="text-sm text-gray-500">Browse available bikes</p>
                  </div>
                </button>

                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-800">My Rides</p>
                    <p className="text-sm text-gray-500">View ride history</p>
                  </div>
                </button>

                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <HelpCircle className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-800">Help & Support</p>
                    <p className="text-sm text-gray-500">Get assistance</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Bar - adjusted top position to account for navbar */}
      <div className="absolute top-20 left-4 right-4 z-[1000]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for bikes or stations..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white rounded-full shadow-lg border-0 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Map Controls - adjusted top position */}
      <div className="absolute right-4 top-36 z-[1000] flex flex-col space-y-2">
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

      {/* Location Button */}
      <div className="absolute right-4 bottom-32 z-[1000]">
        <button 
          onClick={handleLocateUser}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Navigation className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Full Screen Leaflet Map */}
      <div 
        ref={mapRef}
        className="flex-1 w-full h-full min-h-screen"
        style={{ zIndex: 1 }}
      />

      {/* Bottom Action Button */}
      <div className="absolute bottom-8 left-6 right-6 z-[1000]">
        <button 
          onClick={handleScanToUnlock}
          className="w-full h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center space-x-3 font-semibold text-lg hover:bg-primary/90 transition-colors"
        >
          <QrCode className="w-6 h-6" />
          <span>Scan to Unlock Bike</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
