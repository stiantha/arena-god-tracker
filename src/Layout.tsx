// Layout.tsx
import React, { ChangeEvent } from "react";
import { Users } from 'lucide-react';
import Achievement from "./components/ui/Achievement";
import Filter from "./components/ui/Filter";
import Champions from "./components/ui/Champions";
import Controls from "./components/ui/Controls";
import { Champion } from "./types";
import { SortOption } from "./hooks/useChampions";

interface LayoutProps {
  achievementIcon: string;
  achievementTitle: string;
  achievementRank: string;
  achievementDescription: string;
  progress: number;
  total: number;
  progressPercentage: number;
  localStorageKey: string;
  champions: Champion[];
  onResetProgress: () => void;
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hideCompleted: boolean;
  onToggleHideCompleted: () => void;
  hidePending: boolean;
  onToggleHidePending: () => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  filteredChampions: Champion[];
  completedChampionIds: number[];
  onToggleCompletion: (championId: number) => void;
  isLoading: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  achievementIcon,
  achievementTitle,
  achievementRank,
  achievementDescription,
  progress,
  total,
  progressPercentage,
  localStorageKey,
  champions,
  onResetProgress,
  searchTerm,
  onSearchChange,
  hideCompleted,
  onToggleHideCompleted,
  hidePending,
  onToggleHidePending,
  sortOption,
  onSortChange,
  filteredChampions,
  completedChampionIds,
  onToggleCompletion,
  isLoading
}) => (
  <div className="champion-dashboard">
    <Achievement
      icon={achievementIcon}
      title={achievementTitle}
      rank={achievementRank}
      rarity={<><Users size={15} /> 0.1% of players have this</>}
      description={achievementDescription}
      progress={progress}
      total={total}
      progressPercentage={progressPercentage}
    />

    <Controls
      localStorageKey={localStorageKey}
      champions={champions}
      onResetProgress={onResetProgress}
    />

    <Filter
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      hideCompleted={hideCompleted}
      onToggleHideCompleted={onToggleHideCompleted}
      hidePending={hidePending}
      onToggleHidePending={onToggleHidePending}
      sortOption={sortOption}
      onSortChange={onSortChange}
    />

    <Champions
      champions={filteredChampions}
      completedChampionIds={completedChampionIds}
      onToggleCompletion={onToggleCompletion}
      isLoading={isLoading}
    />
  </div>
);

export default Layout;
