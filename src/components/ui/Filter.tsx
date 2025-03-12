import React, { useState, useRef, useEffect } from "react";
import { useChampionContext } from "../../hooks/useChampionContext";
import { SortOption } from "../../types";
import { ListFilter } from "lucide-react";

const Filter: React.FC = () => {
  const {
    searchTerm,
    handleSearchChange,
    hideCompleted,
    toggleHideCompleted,
    hidePending,
    toggleHidePending,
    sortOption,
    handleSortChange
  } = useChampionContext();
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortOptions = [
    { value: 'name-asc', label: 'A - Z' },
    { value: 'name-desc', label: 'Z - A' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' }
  ];
  
  const getLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortOption);
    return option ? option.label : '';
  };

  return (
    <div className="filter-controls">
      <input
        id="search-champions"
        type="text"
        placeholder="Search champions..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      
      <div className="filter-options">
        <label className="filter-label">
          <input
            id="hide-completed"
            type="checkbox"
            checked={hideCompleted}
            onChange={toggleHideCompleted}
            className="filter-checkbox"
          />
          Hide Completed
        </label>
        
        <label className="filter-label">
          <input
            id="hide-pending"
            type="checkbox"
            checked={hidePending}
            onChange={toggleHidePending}
            className="filter-checkbox"
          />
          Hide Pending
        </label>
        
        <div className="custom-select-wrapper" ref={dropdownRef}>
          <button 
            className="custom-select-button" 
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            {getLabel()}
            <ListFilter size={18} className="select-icon" />
          </button>
          
          {isOpen && (
            <div className="custom-select-dropdown">
              {sortOptions.map((option) => (
                <div 
                  key={option.value}
                  className={`custom-select-option ${sortOption === option.value ? 'selected' : ''}`}
                  onClick={() => {
                    handleSortChange(option.value as SortOption);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
