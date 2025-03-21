
import React from "react";
import { useChampionContext } from "../../hooks/useChampionContext";
import { useDownload } from "../../hooks/useDownload";
import { Download, Trash2 } from 'lucide-react';

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
        <Trash2 size={22}/>
      </button>
      <button
        className="action-button download-button"
        onClick={downloadProgress}
        title="Download progress to .xlsx file"
      >
        <Download size={22}/>
      </button>
    </div>
  );
};

export default Controls;
