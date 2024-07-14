import { useContext } from 'react';
import { TechnologiesContext } from './DataManager';

const useTechnologies = () => {
    const context = useContext(TechnologiesContext);
    if (!context) {
        throw new Error('useTechnologies must be used within a TechnologiesProvider');
    }
    return context;
};

export default useTechnologies;