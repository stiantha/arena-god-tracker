import React from "react";
import ExcelJS from "exceljs";
import { Champion } from "../types";

interface FloatingButtonsProps {
  localStorageKey: string;
  champions: Champion[];
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  localStorageKey,
  champions,
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

  const openDonationPage = () => {
    window.open("https://ko-fi.com/yourusername", "_blank");
  };

  return (
    <div className="floating-buttons">
      <button
        className="floating-button download-button"
        onClick={downloadExcel}
        title="Download to Excel"
      >
        Download Progress
      </button>
      <button
        className="floating-button donate-button"
        onClick={openDonationPage}
        title="Buy me a coffee"
      >Support Creator
      </button>
    </div>
  );
};

export default FloatingButtons;
