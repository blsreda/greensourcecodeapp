
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Battery, MapPin, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AllBikesPage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  // Real electric bikes data - MVP test with only 1 bike
  const bikes = [
    {
      id: 1,
      name: 'Trek Verve+ 2',
      image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=400&h=300&fit=crop',
      battery: 85,
      location: 'Downtown Station',
      distance: '0.2 km',
      rating: 4.8,
      price: '$0.15/min',
      available: true,
      model: 'Bosch Performance Line',
      range: '50 miles',
      topSpeed: '20 mph'
    }
  ];

  const filteredBikes = bikes.filter(bike =>
    bike.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    bike.location.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleBikeSelect = (bikeId: number) => {
    navigate(`/bike/${bikeId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">All Bikes</h1>
          <div className="w-10" />
        </div>

        {/* MVP Test Notice */}
        <div className="px-4 pb-2">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800 text-center font-medium">
              📱 This is our MVP test - Limited bike selection available
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bikes or locations..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-gray-100 rounded-full border-0 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Bikes List */}
      <div className="p-4 space-y-4">
        {filteredBikes.map((bike) => (
          <Card 
            key={bike.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              bike.available ? 'hover:scale-[1.02]' : 'opacity-60'
            }`}
            onClick={() => bike.available && handleBikeSelect(bike.id)}
          >
            <CardContent className="p-0">
              <div className="flex">
                {/* Bike Image */}
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                </div>

                {/* Bike Details */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{bike.name}</h3>
                      <p className="text-sm text-gray-500">{bike.model}</p>
                    </div>
                    <span className="text-primary font-bold">{bike.price}</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{bike.location}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{bike.distance}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{bike.range} range</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Battery className={`w-4 h-4 ${bike.battery > 70 ? 'text-green-500' : bike.battery > 30 ? 'text-yellow-500' : 'text-red-500'}`} />
                        <span className="text-sm font-medium">{bike.battery}%</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{bike.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {bike.available ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          Available
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                          In Use
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBikes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No bikes found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default AllBikesPage;
