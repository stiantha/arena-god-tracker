// hooks/useChampionContext.ts
import { useContext } from 'react';
import { ChampionContext } from '../context/ChampionContext';
import { ChampionContextType } from '../types';

// Move the hook to its own file
export const useChampionContext = (): ChampionContextType => {
    const context = useContext(ChampionContext);
    if (context === undefined) {
        throw new Error('useChampionContext must be used within a ChampionProvider');
    }
    return context;
};
