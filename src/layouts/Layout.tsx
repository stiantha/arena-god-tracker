import React from "react";
import Filter from "../components/ui/Filter";
import ChampionGrid from "../components/ui/ChampionsGrid";
import KofiBanner from "../components/ui/Ko-fi";
import Achievement from "../components/ui/Achievement";
import { ChampionProvider } from "../context/ChampionProvider";

const Layout: React.FC = () => {
  return (
    <ChampionProvider localStorageKey="completed-champions">
      <KofiBanner />
      <Achievement />
      <Filter />
      <ChampionGrid />
    </ChampionProvider>
  );
};

export default Layout;
