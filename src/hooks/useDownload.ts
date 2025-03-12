// hooks/useExcelDownload.ts
import { useCallback } from 'react';
import { useChampionContext } from './useChampionContext';
import ExcelJS from 'exceljs';

export const useDownload = () => {
  const { completedChampionIds, champions } = useChampionContext();
  
  const downloadProgress = useCallback(async () => {
    try {
      if (champions.length === 0) {
        alert("No champions data available");
        return;
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Champions");

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
  }, [champions, completedChampionIds]);
  
  return { downloadProgress };
};
