import { ChangeEvent } from "react";

export interface Champion {
  id: number;
  name: string;
  image: string;
}

export type SortOption = 'name-asc' | 'name-desc' | 'completed' | 'pending';

export interface ChampionContextType {
  champions: Champion[];
  filteredChampions: Champion[];
  completedChampionIds: number[];
  searchTerm: string;
  hideCompleted: boolean;
  hidePending: boolean;
  sortOption: SortOption;
  isLoading: boolean;
  progressPercentage: number;
  progress: number;
  toggleChampionCompletion: (id: number) => void;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSortChange: (option: SortOption) => void;
  toggleHideCompleted: () => void;
  toggleHidePending: () => void;
  resetProgress: () => void;
}
