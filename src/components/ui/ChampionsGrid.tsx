import React from "react";
import { useChampionContext } from "../../hooks/useChampionContext";

const ChampionGrid: React.FC = () => {
  const {
    filteredChampions,
    completedChampionIds,
    toggleChampionCompletion,
    isLoading,
  } = useChampionContext();

  if (isLoading) {
    return (
      <div className="loading-skeleton">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="champion-card-skeleton"></div>
        ))}
      </div>
    );
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
              <img src={champion.image} alt={champion.name} />
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
