import { useState, useEffect, ChangeEvent, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Champion } from "../types";
import championService from "../api";
import adaptToAllSituations from "../assets/adapt_to_all_situations.png";

import Achievement from "./ui/Achievement";
import Filter from "./ui/Filter";
import Champions from "./ui/Champions";
import Controls from "./ui/Controls";
import { Users } from 'lucide-react';

type SortOption = "alphabetical" | "completed" | "remaining";

const ChampionDashboard: React.FC = () => {
  // State management
  const [champions, setChampions] = useState<Champion[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);
  const [hidePending, setHidePending] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<SortOption>("alphabetical");
  const [completedChampions, setCompletedChampions] = useLocalStorage<number[]>(
    "completed-champions",
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const progressPercentage =
    champions.length > 0
      ? (completedChampions.length / champions.length) * 100
      : 0;

  // Fetch champions data
  useEffect(() => {
    const fetchChampions = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const championsData = await championService.getChampions();
        setChampions(championsData);
      } catch (error) {
        console.error("Failed to fetch champions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChampions();
  }, []);

  // Filter and sort champions
  const filteredChampions = useMemo(() => {
    let result = [...champions];

    // Filtering
    if (searchTerm) {
      result = result.filter((champion) =>
        champion.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (hideCompleted) {
      result = result.filter(
        (champion) => !completedChampions.includes(champion.id)
      );
    }

    if (hidePending) {
      result = result.filter(
        (champion) => completedChampions.includes(champion.id)
      );
    }

    // Sorting
    switch (sortOption) {
      case "completed":
        result.sort((a, b) => {
          const aCompleted = completedChampions.includes(a.id);
          const bCompleted = completedChampions.includes(b.id);
          return aCompleted === bCompleted
            ? a.name.localeCompare(b.name)
            : aCompleted
            ? -1
            : 1;
        });
        break;
      case "remaining":
        result.sort((a, b) => {
          const aCompleted = completedChampions.includes(a.id);
          const bCompleted = completedChampions.includes(b.id);
          return aCompleted === bCompleted
            ? a.name.localeCompare(b.name)
            : aCompleted
            ? 1
            : -1;
        });
        break;
      case "alphabetical":
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [searchTerm, champions, completedChampions, hideCompleted, hidePending, sortOption]);

  // Event handlers
  const toggleChampionCompletion = (championId: number): void => {
    setCompletedChampions((prev) =>
      prev.includes(championId)
        ? prev.filter((id) => id !== championId)
        : [...prev, championId]
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (option: SortOption): void => {
    setSortOption(option);
  };

  const toggleHideCompleted = (): void => {
    setHideCompleted(!hideCompleted);
    //if (hidePending) setHidePending(false);
  };

  const toggleHidePending = (): void => {
    setHidePending(!hidePending);
    //if (hideCompleted) setHideCompleted(false);
  };

  const resetProgress = (): void => {
    if (window.confirm("Reset ALL progress? This cannot be undone.")) {
      setCompletedChampions([]);
    }
  };

  return (
    <div className="champion-dashboard">
      <Achievement
        icon={adaptToAllSituations}
        title="Adapt to all situations"
        rank="MASTER"
        rarity={<><Users size={15} />  0.1% of players have this</>}
        description="Place first in Arena games with different champions"
        progress={completedChampions.length}
        total={champions.length}
        progressPercentage={progressPercentage}
      />

      <Controls
        localStorageKey="completed-champions"
        champions={champions}
        onResetProgress={resetProgress}
      />

      <Filter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        hideCompleted={hideCompleted}
        onToggleHideCompleted={toggleHideCompleted}
        hidePending={hidePending}
        onToggleHidePending={toggleHidePending}
        sortOption={sortOption}
        onSortChange={handleSortChange}
      />

      <Champions
        champions={filteredChampions}
        completedChampionIds={completedChampions}
        onToggleCompletion={toggleChampionCompletion}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChampionDashboard;
