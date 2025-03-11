import React, { ChangeEvent } from "react";

type SortOption = "alphabetical" | "completed" | "uncompleted";

interface ControlPanelProps {
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hideCompleted: boolean;
  onToggleHideCompleted: () => void;
  hideUncompleted: boolean;
  onToggleHideUncompleted: () => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  searchTerm,
  onSearchChange,
  hideCompleted,
  onToggleHideCompleted,
  hideUncompleted,
  onToggleHideUncompleted,
  sortOption,
  onSortChange,
}) => {
  return (
    <div
      className="controls-container"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
        width: "100%",
      }}
    >
      <button
        className={hideCompleted ? "filter-button active" : "filter-button"}
        onClick={onToggleHideCompleted}
      >
        {hideCompleted ? "Show Completed" : "Hide Completed"}
      </button>

      <button
        className={hideUncompleted ? "filter-button active" : "filter-button"}
        onClick={onToggleHideUncompleted}
      >
        {hideUncompleted ? "Show Uncompleted" : "Hide Uncompleted"}
      </button>

      <div className="search-container" style={{ flex: 1 }}>
        <input
          type="text"
          placeholder="Search champions..."
          value={searchTerm}
          onChange={onSearchChange}
          className="search-input"
        />
      </div>
      <button
        className={
          sortOption === "alphabetical" ? "sort-button active" : "sort-button"
        }
        onClick={() => onSortChange("alphabetical")}
      >
        A-Z
      </button>
      <button
        className={
          sortOption === "completed" ? "sort-button active" : "sort-button"
        }
        onClick={() => onSortChange("completed")}
      >
        Completed
      </button>
      <button
        className={
          sortOption === "uncompleted" ? "sort-button active" : "sort-button"
        }
        onClick={() => onSortChange("uncompleted")}
      >
        Uncompleted
      </button>
    </div>
  );
};

export default ControlPanel;
