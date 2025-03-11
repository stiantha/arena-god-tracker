// ActionButtons.tsx
import React from "react";
import { Champion } from "../../types";
import ExcelJS from "exceljs";

interface ActionButtonsProps {
  localStorageKey: string;
  champions: Champion[];
  onResetProgress: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  localStorageKey,
  champions,
  onResetProgress,
}) => {
  const downloadExcel = async () => {
    try {
      // Get data from local storage
      const storedData = localStorage.getItem(localStorageKey);
      if (!storedData) {
        alert("No data to export");
        return;
      }

      const completedChampionIds = JSON.parse(storedData);

      // Create a new workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Champions");

      // Add headers
      worksheet.columns = [
        { header: "Champion", key: "champion", width: 20 },
        { header: "Value", key: "value", width: 10 },
      ];

      // Add all champions with 0 or 1 value
      champions.forEach((champion) => {
        const isCompleted = completedChampionIds.includes(champion.id);
        worksheet.addRow({
          champion: champion.name || `Champion ID: ${champion.id}`,
          value: isCompleted ? 1 : 0,
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "champions_progress.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download Excel:", error);
      alert("Failed to download data");
    }
  };

  /*   const openDonationPage = () => {
    window.open("https://ko-fi.com/", "_blank");
  }; */

  return (
    <div
      className="action-buttons-container"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        justifyContent: "center",
        margin: "15px 0",
      }}
    >
      <button
        className="action-button reset-button"
        onClick={onResetProgress}
        title="Delete saved data"
      >
        Reset Progress
      </button>
      <button
        className="action-button download-button"
        onClick={downloadExcel}
        title="Download progress to .xlsx file (Excel)" 
      >
        Download Progress
      </button>
      {/*       <button
        className="action-button donate-button"
        onClick={openDonationPage}
        title="Buy me a coffee"
      >
        Support Creator
      </button> */}
    </div>
  );
};

export default ActionButtons;
