import { useState, useEffect, ChangeEvent, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Champion } from "../types";
import championService from "../api";
import adaptToAllSituations from "../assets/adapt_to_all_situations.png";

import AchievementCard from "./ui/AchievementCard";
import ControlPanel from "./ui/ControlPanel";
import Champions from "./ui/Champions";
import ActionButtons from "./ui/ActionButtons";

type SortOption = "alphabetical" | "completed" | "uncompleted";

const ChampionDashboard: React.FC = () => {
  // State management
  const [champions, setChampions] = useState<Champion[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);
  const [hideUncompleted, setHideUncompleted] = useState<boolean>(false);
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

    if (hideUncompleted) {
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
      case "uncompleted":
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
  }, [searchTerm, champions, completedChampions, hideCompleted, hideUncompleted, sortOption]);

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
    if (hideUncompleted) setHideUncompleted(false); // Ensure both filters aren't active simultaneously
  };

  const toggleHideUncompleted = (): void => {
    setHideUncompleted(!hideUncompleted);
    if (hideCompleted) setHideCompleted(false); // Ensure both filters aren't active simultaneously
  };

  const resetProgress = (): void => {
    if (window.confirm("Reset ALL your progress? This cannot be undone.")) {
      setCompletedChampions([]);
    }
  };

  return (
    <div className="champion-dashboard">
      <AchievementCard
        icon={adaptToAllSituations}
        title="Adapt to all situations"
        rank="MASTER"
        rarity="0.1% of players have this"
        description="Place first in Arena games with different champions"
        progress={completedChampions.length}
        total={champions.length}
        progressPercentage={progressPercentage}
      />

      <ActionButtons
        localStorageKey="completed-champions"
        champions={champions}
        onResetProgress={resetProgress}
      />

      <ControlPanel
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        hideCompleted={hideCompleted}
        onToggleHideCompleted={toggleHideCompleted}
        hideUncompleted={hideUncompleted}
        onToggleHideUncompleted={toggleHideUncompleted}
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
