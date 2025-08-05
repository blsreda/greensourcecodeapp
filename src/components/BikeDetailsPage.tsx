
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Battery, MapPin, Clock, Unlock, Zap, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const BikeDetailsPage = () => {
  const navigate = useNavigate();
  const { bikeId } = useParams();

  const handleBack = () => {
    navigate('/all-bikes');
  };

  const handleUnlockBike = () => {
    toast.success("Bike unlocked successfully!", {
      description: `${bikeData.name} is now ready to ride`,
    });
    navigate('/ride');
  };

  // Real bike data based on bike ID
  const getBikeData = (id: string) => {
    const bikes = {
      '1': {
        id: '1',
        name: 'Trek Verve+ 2',
        image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=600&h=400&fit=crop',
        batteryLevel: 85,
        location: 'Downtown Station',
        lastMaintenance: '2 days ago',
        status: 'Available',
        model: 'Bosch Performance Line',
        range: '50 miles',
        topSpeed: '20 mph',
        price: '$0.15/min'
      },
      '2': {
        id: '2',
        name: 'Specialized Turbo Como',
        image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop',
        batteryLevel: 92,
        location: 'University Campus',
        lastMaintenance: '1 day ago',
        status: 'Available',
        model: 'Specialized Turbo',
        range: '45 miles',
        topSpeed: '28 mph',
        price: '$0.18/min'
      },
      '3': {
        id: '3',
        name: 'Giant Explore E+',
        image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=600&h=400&fit=crop',
        batteryLevel: 78,
        location: 'Shopping Mall',
        lastMaintenance: '3 days ago',
        status: 'In Use',
        model: 'Yamaha SyncDrive',
        range: '55 miles',
        topSpeed: '20 mph',
        price: '$0.16/min'
      },
      '4': {
        id: '4',
        name: 'Cannondale Synapse NEO',
        image: 'https://images.unsplash.com/photo-1544191696-15693072ab80?w=600&h=400&fit=crop',
        batteryLevel: 95,
        location: 'Central Park',
        lastMaintenance: '1 day ago',
        status: 'Available',
        model: 'Bosch Performance',
        range: '60 miles',
        topSpeed: '25 mph',
        price: '$0.20/min'
      },
      '5': {
        id: '5',
        name: 'Rad Power RadCity',
        image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop',
        batteryLevel: 67,
        location: 'Business District',
        lastMaintenance: '4 days ago',
        status: 'Available',
        model: 'Rad Power Motor',
        range: '40 miles',
        topSpeed: '20 mph',
        price: '$0.12/min'
      },
      '6': {
        id: '6',
        name: 'VanMoof S3',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        batteryLevel: 89,
        location: 'Riverside Park',
        lastMaintenance: '2 days ago',
        status: 'Available',
        model: 'VanMoof Smart',
        range: '37 miles',
        topSpeed: '20 mph',
        price: '$0.22/min'
      }
    };
    return bikes[id as keyof typeof bikes] || bikes['1'];
  };

  const bikeData = getBikeData(bikeId || '1');

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <button 
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-gray-900 text-lg font-semibold">Bike Details</h1>
        <div className="w-10" />
      </div>

      {/* Bike Image */}
      <div className="bg-white p-6">
        <div className="w-full h-48 rounded-2xl overflow-hidden mb-4">
          <img 
            src={bikeData.image}
            alt={bikeData.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bike Details */}
      <div className="flex-1 bg-white mx-4 rounded-t-3xl shadow-lg">
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{bikeData.name}</h2>
            <p className="text-gray-600 mb-1">{bikeData.model}</p>
            <p className="text-primary font-medium">{bikeData.status}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Battery className="w-6 h-6 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">Battery Level</p>
                  <p className="text-sm text-gray-600">Ready for long rides</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-500">{bikeData.batteryLevel}%</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-sm text-gray-600">Current station</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{bikeData.location}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-purple-500" />
                <div>
                  <p className="font-medium text-gray-900">Range</p>
                  <p className="text-sm text-gray-600">Full charge distance</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{bikeData.range}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Gauge className="w-6 h-6 text-red-500" />
                <div>
                  <p className="font-medium text-gray-900">Top Speed</p>
                  <p className="text-sm text-gray-600">Maximum assisted speed</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{bikeData.topSpeed}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="font-medium text-gray-900">Last Maintenance</p>
                  <p className="text-sm text-gray-600">Service history</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{bikeData.lastMaintenance}</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <div className="mb-4 p-4 bg-primary/10 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Rate:</span>
                <span className="text-xl font-bold text-primary">{bikeData.price}</span>
              </div>
            </div>
            
            {bikeData.status === 'Available' ? (
              <Button
                onClick={handleUnlockBike}
                className="w-full h-14 text-lg font-semibold rounded-full"
              >
                <Unlock className="w-5 h-5 mr-2" />
                Unlock Bike
              </Button>
            ) : (
              <Button
                disabled
                className="w-full h-14 text-lg font-semibold rounded-full"
              >
                Bike Currently In Use
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetailsPage;
