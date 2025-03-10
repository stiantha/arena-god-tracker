import { createContext } from 'react';
import { ChampionContextType } from '../utils/types';

export const ChampionContext = createContext<ChampionContextType | undefined>(undefined);