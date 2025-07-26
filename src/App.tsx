import React, { useState } from 'react';
import LocationTracker from './components/LocationTracker';
import EmergencyAlert from './components/EmergencyAlert';
import NearbyServices from './components/NearbyServices';
import StatusButtons from './components/StatusButtons';
import InformationPanel from './components/InformationPanel';
import KNNDemo from './components/KNNDemo';
import { findNearestServices } from './utils/knnAlgorithm';

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

function App() {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [emergencyStatus, setEmergencyStatus] = useState<'safe' | 'help' | 'accident' | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleLocationUpdate = (location: Location) => {
    setCurrentLocation(location);
  };

  const handleEmergencyHelp = () => {
    setEmergencyStatus('help');
    setShowAlert(true);
  };

  const handleEmergencySafe = () => {
    setEmergencyStatus('safe');
    setShowAlert(true);
  };

  const handleAccidentAlert = () => {
    setEmergencyStatus('accident');
    setShowAlert(true);
  };

  // Compute nearby hospitals and police stations for EmergencyAlert
  const nearest = currentLocation
    ? findNearestServices(currentLocation.latitude, currentLocation.longitude, 3)
    : { hospitals: [], policeStations: [] };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Emergency App</h1>
          <div className="flex justify-center space-x-2">
            <button onClick={() => setShowInfo(true)} className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors">Get Information</button>
          </div>
        </div>

        {showAlert && emergencyStatus && (
          <EmergencyAlert
            status={emergencyStatus}
            location={currentLocation}
            onClose={() => setShowAlert(false)}
            nearbyHospitals={nearest.hospitals}
            nearbyPoliceStations={nearest.policeStations}
            onSafe={handleEmergencySafe}
          />
        )}

        <LocationTracker
          onLocationUpdate={handleLocationUpdate}
          isTracking={isTracking}
          onTrackingChange={setIsTracking}
        />

        <KNNDemo userLocation={currentLocation} />
        <NearbyServices location={currentLocation} />
        <StatusButtons
          onNeedHelp={handleEmergencyHelp}
          onSafe={handleEmergencySafe}
          onAccident={handleAccidentAlert}
          currentStatus={emergencyStatus}
        />

        {showInfo && (
          <InformationPanel onClose={() => setShowInfo(false)} />
        )}
      </div>
    </div>
  );
}

export default App;