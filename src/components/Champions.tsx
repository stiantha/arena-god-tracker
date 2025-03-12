// components/ChampionDashboard.tsx
import React from "react";
import adaptToAllSituations from "../assets/adapt_to_all_situations.png";
import Layout from "../Layout";
import { useChampions } from "../hooks/useChampions";

const Champions: React.FC = () => {
  const {
    champions,
    searchTerm,
    hideCompleted,
    hidePending,
    sortOption,
    completedChampions,
    isLoading,
    progressPercentage,
    filteredChampions,
    toggleChampionCompletion,
    handleSearchChange,
    handleSortChange,
    toggleHideCompleted,
    toggleHidePending,
    resetProgress
  } = useChampions();

  return (
    <Layout
      achievementIcon={adaptToAllSituations}
      achievementTitle="Adapt to all situations"
      achievementRank="MASTER"
      achievementDescription="Place first in Arena games with different champions"
      progress={completedChampions.length}
      total={champions.length}
      progressPercentage={progressPercentage}
      localStorageKey="completed-champions"
      champions={champions}
      onResetProgress={resetProgress}
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      hideCompleted={hideCompleted}
      onToggleHideCompleted={toggleHideCompleted}
      hidePending={hidePending}
      onToggleHidePending={toggleHidePending}
      sortOption={sortOption}
      onSortChange={handleSortChange}
      filteredChampions={filteredChampions}
      completedChampionIds={completedChampions}
      onToggleCompletion={toggleChampionCompletion}
      isLoading={isLoading}
    />
  );
};

export default Champions;
