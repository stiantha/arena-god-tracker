import { useContext } from 'react';
import { ChampionContext } from '../context/ChampionContext';
import { ChampionContextType } from '../types';

export const useChampionContext = (): ChampionContextType => {
    const context = useContext(ChampionContext);
    if (context === undefined) {
        throw new Error('useChampionContext must be used within a ChampionProvider');
    }
    return context;
};
