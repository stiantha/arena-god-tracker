import React from "react";
import { useChampionContext } from "../../hooks/useChampionContext";
import LoadingState from './LoadingState';

const ChampionGrid: React.FC = () => {
  const {
    filteredChampions,
    completedChampionIds,
    toggleChampionCompletion,
    isLoading,
  } = useChampionContext();

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="champions-grid-wrapper">
      <div className="champions-grid">
        {filteredChampions.map((champion) => (
          <div
            key={champion.id}
            className={`champion-card ${
              completedChampionIds.includes(champion.id) ? "completed" : ""
            }`}
            onClick={() => toggleChampionCompletion(champion.id)}
            style={{ visibility: "visible", display: "flex" }}
          >
            <div className="image-container">
              <img 
                src={champion.image} 
                alt={champion.name} 
                loading="lazy" 
              />
              {completedChampionIds.includes(champion.id) && (
                <div className="checkmark-overlay">✓</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChampionGrid;
