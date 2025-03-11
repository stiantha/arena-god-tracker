import React from 'react';
import { Champion } from '../../types';

interface ChampionsProps {
  champions: Champion[];
  completedChampionIds: number[];
  onToggleCompletion: (id: number) => void;
  isLoading: boolean;
}

const Champions: React.FC<ChampionsProps> = ({ 
  champions, 
  completedChampionIds, 
  onToggleCompletion,
  isLoading
}) => {
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
    <div className="champions-grid">
      {champions.map((champion) => (
        <div
          key={champion.id}
          className={`champion-card ${
            completedChampionIds.includes(champion.id) ? "completed" : ""
          }`}
          onClick={() => onToggleCompletion(champion.id)}
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
  );
};

export default Champions;
