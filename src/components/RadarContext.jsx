/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

const RadarContext = createContext();

export const RadarProvider = ({ children }) => {
  const [selectedRadarId, setSelectedRadarId] = useState('default');
  const [radarName, setRadarName] = useState('Default Radar');

  const updateSelectedRadar = (id, name) => {
    setSelectedRadarId(id);
    setRadarName(name);
  };

  return (
    <RadarContext.Provider value={{ selectedRadarId, radarName, updateSelectedRadar }}>
      {children}
    </RadarContext.Provider>
  );
};

export default RadarContext;