import React from "react";
import { useChampionContext } from "../../hooks/useChampionContext";
import { useDownload } from "../../hooks/useDownload";
import { Download, RefreshCw } from 'lucide-react';

const Controls: React.FC = () => {
  const { resetProgress } = useChampionContext();
  const { downloadProgress } = useDownload();
  
  return (
    <div className="action-buttons-container">
      <button
        className="action-button reset-button"
        onClick={resetProgress}
        title="Reset Progress"
      >
        <RefreshCw size={22}/>
      </button>
      <button
        className="action-button download-button"
        onClick={downloadProgress}
        title="Download Progress as Excel"
      >
        <Download size={22}/>
      </button>
    </div>
  );
};

export default Controls;
