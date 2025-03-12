import { createContext } from 'react';
import { ChampionContextType } from '../types';

export const ChampionContext = createContext<ChampionContextType | undefined>(undefined);