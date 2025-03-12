import React from "react";
import { Users } from 'lucide-react';
import { useChampionContext } from "./hooks/useChampionContext";
import Achievement from "./components/ui/Achievement";
import Filter from "./components/ui/Filter";
import ChampionGrid from "./components/ui/ChampionsGrid";

interface LayoutProps {
  achievementIcon: string;
  achievementTitle: string;
  achievementRank: string;
  achievementRarity: string;
  achievementDescription: string;
}

const Layout: React.FC<LayoutProps> = ({
  achievementIcon,
  achievementTitle,
  achievementRank,
  achievementRarity,
  achievementDescription
}) => {
  const { progress, progressPercentage } = useChampionContext(); {/*champions*/}
  const total = 60
  
  return (
    <div className="champion-dashboard">
      <Achievement
        icon={achievementIcon}
        title={achievementTitle}
        rank={achievementRank}
        rarity={<><Users size={15} style={{marginRight: 5}} />{achievementRarity}</>}
        description={achievementDescription}
        progress={progress}
        total={total}//{champions.length}
        progressPercentage={progressPercentage}
      />

      <Filter />
      <ChampionGrid />
    </div>
  );
};

export default Layout;