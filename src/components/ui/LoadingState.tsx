// src/components/ui/LoadingState.tsx
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="loading-container" aria-live="polite">
      <div className="loading-skeleton">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="champion-card-skeleton"></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingState;
