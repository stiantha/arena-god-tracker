// context/ChampionContext.tsx
import { createContext } from 'react';
import { ChampionContextType } from '../types';

// Create context with undefined default value
export const ChampionContext = createContext<ChampionContextType | undefined>(undefined);