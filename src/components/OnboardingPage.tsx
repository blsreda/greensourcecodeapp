import React, { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
  const [isLocationRequested, setIsLocationRequested] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    toast.success("Welcome to Green Puddle! Let's find you a bike.", {
      description: "Redirecting to bike finder...",
    });
    // Navigate to home page
    navigate('/home');
  };

  const handleLocationAccess = () => {
    setIsLocationRequested(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast.success("Location access granted!", {
            description: "We can now show you nearby bikes.",
          });
          console.log('Location granted:', position.coords);
        },
        (error) => {
          toast.error("Location access denied", {
            description: "You can still browse bikes manually.",
          });
          console.log('Location denied:', error);
        }
      );
    } else {
      toast.error("Geolocation not supported", {
        description: "Your browser doesn't support location services.",
      });
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
      {/* Hero Section */}
      <div className="flex-grow flex flex-col">
        <div 
          className="w-full bg-center bg-no-repeat bg-cover overflow-hidden h-80 md:h-96 relative"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB78Ol7RjLEU6JPKulChQSovCU3F6SCyEZbfcM2EHgkOpwgajxXPfbbVO9Ao9UOlRgpBVJsZEcLxybfEcJSuAnZ8Y5Hy0cL2tpNidf2abz26DZ4v_IMIDrP5bs71XftiUkqKVoQVKr7JYVwpHvdAtxj-i0QE5HYKindDO2KadKOL5wyh1iA8fMNHfn0rTGHIP_xFcjBtlgQUgwLqiCpiLXguZloYw7YBJ4DV0IdRvGl2JreNSEZ5_DAAHTW_0M4cPA5KZ-3310g8Ls")`
          }}
        >
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-green-puddle-background/40"></div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col items-center justify-center px-6 py-8 text-center flex-grow animate-fade-in">
          <h1 className="text-green-puddle-secondary text-4xl md:text-5xl font-bold leading-tight animate-scale-in">
            Welcome to{' '}
            <span className="text-gradient">Green Puddle</span>
          </h1>
          <p className="text-green-puddle-secondary/80 text-lg md:text-xl font-normal leading-relaxed mt-6 max-w-md animate-fade-in [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            Explore the city on two wheels. Find a bike near you and start your adventure with Green Puddle.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-8 pt-4 space-y-4 animate-slide-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
        <button 
          onClick={handleGetStarted}
          className="flex w-full items-center justify-center rounded-full h-14 px-6 bg-primary text-primary-foreground text-lg font-bold leading-normal tracking-wide shadow-lg hover:bg-primary/90 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 group"
        >
          <span className="material-icons mr-3 text-xl group-hover:rotate-12 transition-transform duration-300">
            directions_bike
          </span>
          <span>Get Started</span>
        </button>

        <button 
          onClick={handleLocationAccess}
          disabled={isLocationRequested}
          className={`flex w-full items-center justify-center rounded-full h-12 px-6 text-base font-semibold leading-normal tracking-wide border transition-all duration-300 group ${
            isLocationRequested 
              ? 'bg-green-100 text-green-700 border-green-300 cursor-not-allowed' 
              : 'bg-accent text-accent-foreground border-gray-300 hover:bg-gray-200 hover:shadow-md transform hover:scale-[1.01]'
          }`}
        >
          <span className={`material-icons mr-3 text-lg transition-transform duration-300 ${
            isLocationRequested ? 'text-green-600' : 'group-hover:pulse'
          }`}>
            location_on
          </span>
          <span>
            {isLocationRequested ? 'Location Requested' : 'Allow Location Access'}
          </span>
        </button>
      </div>

      {/* Bottom spacing */}
      <div className="h-5 bg-green-puddle-background"></div>
    </div>
  );
};

export default OnboardingPage;
