import { useState, useEffect, ChangeEvent } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Champion } from "../types";
import championService from "../api";
import adaptToAllSituations from "../assets/adapt_to_all_situations.png";

type SortOption = "alphabetical" | "completed" | "uncompleted";

const ChampionDashboard: React.FC = () => {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [filteredChampions, setFilteredChampions] = useState<Champion[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<SortOption>("alphabetical");
  const [completedChampions, setCompletedChampions] = useLocalStorage<number[]>(
    "completed-champions",
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const resetProgress = (): void => {
    if (
      window.confirm(
        "Are you sure you want to reset all your progress? This cannot be undone."
      )
    ) {
      setCompletedChampions([]);
    }
  };

  useEffect(() => {
    const fetchChampions = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const championsData = await championService.getChampions();
        setChampions(championsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch champions:", error);
        setIsLoading(false);
      }
    };

    fetchChampions();
  }, []);

  useEffect(() => {
    // Apply filtering and sorting
    let result = [...champions];

    // Filter by search term
    if (searchTerm) {
      result = result.filter((champion) =>
        champion.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by completion status
    if (hideCompleted) {
      result = result.filter(
        (champion) => !completedChampions.includes(champion.id)
      );
    }

    // Apply sorting
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

    setFilteredChampions(result);
  }, [searchTerm, champions, completedChampions, hideCompleted, sortOption]);

  const toggleChampionCompletion = (championId: number): void => {
    setCompletedChampions((prev) => {
      if (prev.includes(championId)) {
        return prev.filter((id) => id !== championId);
      } else {
        return [...prev, championId];
      }
    });
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

  return (
    <div className="champion-dashboard">
      <div className="achievement-card">
        <div className="achievement-icon">
          <img src={adaptToAllSituations} alt="Achievement Icon" />
        </div>
        <div className="achievement-header">
          <div className="achievement-title">
            <h2 className="achievement-name">Adapt to all situations</h2>
            <p className="achievement-rank">MASTER</p>
            <p className="achievement-rarity">0.1% of players earned</p>
          </div>
        </div>

        <div className="achievement-description">
          Place first in Arena games with different champions
        </div>

        <div className="achievement-progress-container">
          <div
            className="achievement-progress-bar"
            style={{
              width: `${(completedChampions.length / champions.length) * 100}%`,
            }}
          ></div>
        </div>

        <div className="achievement-progress-text">
          {completedChampions.length} / {champions.length}
        </div>

        <div className="arena-god-label">
          <span>📜 Arena God</span>
        </div>
      </div>
          <button className="reset-button" onClick={resetProgress}>
            Reset Progress
          </button>

      <div className="controls-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search champions..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="filter-options">
          <button
            className={hideCompleted ? "filter-button active" : "filter-button"}
            onClick={toggleHideCompleted}
          >
            {hideCompleted ? "Show All" : "Hide Completed"}
          </button>

          <div className="sort-options">
            <span>Sort by:</span>
            <button
              className={
                sortOption === "alphabetical"
                  ? "sort-button active"
                  : "sort-button"
              }
              onClick={() => handleSortChange("alphabetical")}
            >
              A-Z
            </button>
            <button
              className={
                sortOption === "completed"
                  ? "sort-button active"
                  : "sort-button"
              }
              onClick={() => handleSortChange("completed")}
            >
              Completed
            </button>
            <button
              className={
                sortOption === "uncompleted"
                  ? "sort-button active"
                  : "sort-button"
              }
              onClick={() => handleSortChange("uncompleted")}
            >
              Uncompleted
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-skeleton">
          {[...Array(20)].map((_, index) => (
            <div key={index} className="champion-card-skeleton"></div>
          ))}
        </div>
      ) : (
        <div className="champions-grid">
          {filteredChampions.map((champion) => (
            <div
              key={champion.id}
              className={`champion-card ${
                completedChampions.includes(champion.id) ? "completed" : ""
              }`}
              onClick={() => toggleChampionCompletion(champion.id)}
              style={{ visibility: "visible", display: "flex" }}
            >
              <div className="image-container">
                <img src={champion.image} alt={champion.name} />
                {completedChampions.includes(champion.id) && (
                  <div className="checkmark-overlay">✓</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChampionDashboard;
