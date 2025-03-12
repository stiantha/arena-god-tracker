// components/ChampionDashboard.tsx
import React from "react";
import adaptToAllSituations from "../assets/adapt_to_all_situations.png";
import { ChampionProvider } from "../context/ChampionProvider";
import Layout from "../Layout";

const ChampionDashboard: React.FC = () => {
  return (
    <ChampionProvider localStorageKey="completed-champions">
      <Layout
        achievementIcon={adaptToAllSituations}
        achievementTitle="Adapt to all situations"
        achievementRank="MASTER"
        achievementRarity="0.1% of players have this"
        achievementDescription="Place first in Arena games with different champions"
      />
    </ChampionProvider>
  );
};

export default ChampionDashboard;
