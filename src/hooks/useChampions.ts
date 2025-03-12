import { useState, useEffect, ChangeEvent, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import { Champion } from "../types";
import championService from "../api";

export type SortOption = "alphabetical" | "completed" | "remaining";

export const useChampions = () => {
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
  };

  const toggleHidePending = (): void => {
    setHidePending(!hidePending);
  };

  const resetProgress = (): void => {
    if (window.confirm("Reset ALL progress? This cannot be undone.")) {
      setCompletedChampions([]);
    }
  };

  return {
    // State
    champions,
    searchTerm,
    hideCompleted,
    hidePending,
    sortOption,
    completedChampions,
    isLoading,
    progressPercentage,
    filteredChampions,
    
    // Event handlers
    toggleChampionCompletion,
    handleSearchChange,
    handleSortChange,
    toggleHideCompleted,
    toggleHidePending,
    resetProgress
  };
};
