
import React, { useState, useRef } from 'react';
import { Camera, Upload, Type, ArrowLeft, Flashlight, FlashlightOff, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ScanPage = () => {
  const [activeTab, setActiveTab] = useState<'scan' | 'upload' | 'manual'>('scan');
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [bikeNumber, setBikeNumber] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/home');
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const detectedBikeId = 'BK2024001';
      toast.success("QR Code detected!", {
        description: `Bike #${detectedBikeId} found`,
      });
      navigate(`/bike/${detectedBikeId}`);
    }, 2000);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast.success("Processing image...", {
        description: "Scanning QR code from uploaded image",
      });
      setTimeout(() => {
        const detectedBikeId = 'BK2024002';
        toast.success("QR Code found in image!", {
          description: `Bike #${detectedBikeId} found`,
        });
        navigate(`/bike/${detectedBikeId}`);
      }, 1500);
    }
  };

  const handleManualEntry = () => {
    if (bikeNumber.trim()) {
      toast.success("Bike number verified!", {
        description: `Bike #${bikeNumber} found`,
      });
      navigate(`/bike/${bikeNumber}`);
    } else {
      toast.error("Please enter a valid bike number");
    }
  };

  const toggleFlash = () => {
    setIsFlashOn(!isFlashOn);
    toast.info(isFlashOn ? "Flash turned off" : "Flash turned on");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Modern Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-xl"></div>
        <div className="relative flex items-center justify-between p-6">
          <button 
            onClick={handleBack}
            className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="text-center">
            <h1 className="text-white text-2xl font-bold">Unlock Bike</h1>
            <p className="text-white/70 text-sm">Scan QR code to get started</p>
          </div>
          <div className="w-12" />
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="px-6 mb-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
          <div className="flex">
            {['scan', 'upload', 'manual'].map((tab) => {
              const icons = { scan: Camera, upload: Upload, manual: Type };
              const Icon = icons[tab as keyof typeof icons];
              const labels = { scan: 'Scan QR', upload: 'Upload', manual: 'Manual' };
              
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-primary text-white shadow-lg transform scale-105' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{labels[tab as keyof typeof labels]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 pb-6">
        {activeTab === 'scan' && (
          <div className="space-y-8">
            {/* Enhanced Camera Viewfinder */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-2 border-primary/30 shadow-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center relative">
                  {isScanning ? (
                    <div className="text-center">
                      <div className="relative">
                        <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                        <QrCode className="w-8 h-8 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <p className="text-white text-lg font-semibold">Scanning QR Code...</p>
                      <p className="text-white/60 text-sm mt-2">Keep steady</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <QrCode className="w-10 h-10 text-primary" />
                      </div>
                      <p className="text-white text-lg font-semibold mb-2">Position QR Code</p>
                      <p className="text-white/60 text-sm">Align the code within the frame</p>
                    </div>
                  )}
                  
                  {/* Animated Scanning Frame */}
                  <div className="absolute inset-8 border-4 border-primary rounded-3xl">
                    <div className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-primary rounded-tl-2xl"></div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 border-r-4 border-t-4 border-primary rounded-tr-2xl"></div>
                    <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-4 border-b-4 border-primary rounded-bl-2xl"></div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-primary rounded-br-2xl"></div>
                    {!isScanning && (
                      <div className="absolute inset-0 border-t-2 border-primary animate-pulse" style={{ 
                        animation: 'scanning 2s infinite linear',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(20, 183, 129, 0.3) 50%, transparent 100%)'
                      }}></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Flash Toggle */}
              <button
                onClick={toggleFlash}
                className="absolute top-4 right-4 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 hover:bg-black/70 transition-all duration-300"
              >
                {isFlashOn ? (
                  <Flashlight className="w-6 h-6 text-yellow-400" />
                ) : (
                  <FlashlightOff className="w-6 h-6 text-white" />
                )}
              </button>
            </div>

            {/* Enhanced Scan Button */}
            <div className="max-w-md mx-auto">
              <Button
                onClick={handleScan}
                disabled={isScanning}
                className="w-full h-16 text-lg font-bold rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isScanning ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Scanning...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Camera className="w-6 h-6" />
                    <span>Start Scanning</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="max-w-md mx-auto text-center space-y-8">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Upload className="w-16 h-16 text-primary" />
            </div>
            
            <div>
              <h2 className="text-white text-2xl font-bold mb-3">Upload QR Image</h2>
              <p className="text-white/70 text-lg">Select a photo containing the QR code</p>
            </div>

            <Button
              onClick={handleImageUpload}
              className="w-full h-16 text-lg font-bold rounded-2xl bg-white/10 backdrop-blur-md border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              <Upload className="w-6 h-6 mr-3" />
              Choose from Gallery
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}

        {activeTab === 'manual' && (
          <div className="max-w-md mx-auto text-center space-y-8">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Type className="w-16 h-16 text-primary" />
            </div>
            
            <div>
              <h2 className="text-white text-2xl font-bold mb-3">Enter Bike ID</h2>
              <p className="text-white/70 text-lg">Type the bike number manually</p>
            </div>

            <div className="space-y-6">
              <Input
                type="text"
                placeholder="e.g., BK2024001"
                value={bikeNumber}
                onChange={(e) => setBikeNumber(e.target.value)}
                className="h-16 text-xl text-center rounded-2xl border-2 border-primary/30 bg-white/10 backdrop-blur-md text-white placeholder-white/50 focus:border-primary focus:bg-white/20 transition-all duration-300"
              />

              <Button
                onClick={handleManualEntry}
                className="w-full h-16 text-lg font-bold rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                disabled={!bikeNumber.trim()}
              >
                <Type className="w-6 h-6 mr-3" />
                Confirm Bike ID
              </Button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scanning {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </div>
  );
};

export default ScanPage;
