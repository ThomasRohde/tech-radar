import { useContext } from 'react';
import RadarContext from './RadarContext';

const useRadarContext = () => {
  const context = useContext(RadarContext);
  if (!context) {
    throw new Error('useRadarContext must be used within a RadarProvider');
  }
  return context;
};

export default useRadarContext;