import React from "react";
import Controls from "./Controls";
import { ScrollText, Users } from "lucide-react";
import adaptToAllSituations from "../../assets/adapt_to_all_situations.png"; // Import the achievement icon
import { useChampionContext } from "../../hooks/useChampionContext";

const Achievement: React.FC = () => {
  // Achievement details
  const achievementDetails = {
    icon: adaptToAllSituations,
    title: "Adapt to all situations",
    rank: "MASTER",
    rarity: (
      <>
        <Users size={15} style={{ marginRight: 5 }} />
        0.1% of players have this
      </>
    ),
    description: "Place first in Arena games with different champions",
    progress: useChampionContext().progress, 
    total: 60,
    progressPercentage: useChampionContext().progressPercentage
  };

  return (
    <div className="achievement-card">
      <div className="achievement-header">
        <div className="achievement-icon">
          <img src={achievementDetails.icon} alt="Achievement Icon" />
        </div>
        <div className="achievement-title">
          <p className="achievement-name">{achievementDetails.title}</p>
          <p className="achievement-rank">{achievementDetails.rank}</p>
          <p className="achievement-rarity">{achievementDetails.rarity}</p>
        </div>
      </div>

      <div className="achievement-description">
        {achievementDetails.description}
      </div>

      <div className="achievement-progress-container">
        <div
          className="achievement-progress-bar"
          style={{ width: `${achievementDetails.progressPercentage}%` }}
        />
        <span className="achievement-progress-text">
          {achievementDetails.progress} / {achievementDetails.total}
        </span>
      </div>

      <div className="achievement-footer">
        <p>
          <ScrollText size={20} /> Arena God</p>
        <Controls />
      </div>
    </div>
  );
};

export default Achievement;
