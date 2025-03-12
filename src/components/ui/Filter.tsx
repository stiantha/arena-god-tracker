import React, { ChangeEvent } from "react";

type SortOption = "alphabetical" | "completed" | "remaining";

interface FilterProps {
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hideCompleted: boolean;
  onToggleHideCompleted: () => void;
  hidePending: boolean;
  onToggleHidePending: () => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const Filter: React.FC<FilterProps> = ({
  searchTerm,
  onSearchChange,
  hideCompleted,
  onToggleHideCompleted,
  hidePending,
  onToggleHidePending,
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
        className={hidePending ? "filter-button active" : "filter-button"}
        onClick={onToggleHidePending}
      >
        {hidePending ? "Show Pending" : "Hide Pending"}
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
        A - Z
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
          sortOption === "remaining" ? "sort-button active" : "sort-button"
        }
        onClick={() => onSortChange("remaining")}
      >
        Pending
      </button>
    </div>
  );
};

export default Filter;
