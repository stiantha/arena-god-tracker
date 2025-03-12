// context/ChampionProvider.tsx
import React from 'react';
import { ChampionContext } from './ChampionContext';
import { useChampions } from '../hooks/useChampions';

// Only export the provider component from this file
export const ChampionProvider: React.FC<{
  children: React.ReactNode;
  localStorageKey: string;
}> = ({ children, localStorageKey }) => {
  const value = useChampions(localStorageKey);
  
  return (
    <ChampionContext.Provider value={value}>
      {children}
    </ChampionContext.Provider>
  );
};
