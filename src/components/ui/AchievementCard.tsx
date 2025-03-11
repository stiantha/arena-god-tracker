import React from 'react';

interface AchievementCardProps {
  icon: string;
  title: string;
  rank: string;
  rarity: string;
  description: string;
  progress: number;
  total: number;
  progressPercentage: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  icon,
  title,
  rank,
  rarity,
  description,
  progress,
  total,
  progressPercentage,
}) => {
  return (
    <div className="achievement-card">
      <div className="achievement-icon">
        <img src={icon} alt="Achievement Icon" />
      </div>
      <div className="achievement-header">
        <div className="achievement-title">
          <h2 className="achievement-name">{title}</h2>
          <p className="achievement-rank">{rank}</p>
          <p className="achievement-rarity">{rarity}</p>
        </div>
      </div>

      <div className="achievement-description">{description}</div>

      <div className="achievement-progress-container">
        <div
          className="achievement-progress-bar"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="achievement-progress-text">
        {progress} / {total}
      </div>

      <div className="arena-god-label">
        <span>📜 Arena God</span>
      </div>
    </div>
  );
};

export default AchievementCard;
