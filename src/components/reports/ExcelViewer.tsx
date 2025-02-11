import React from "react";
import { Table } from "@/components/ui/table";

interface ExcelData {
  headers: string[];
  rows: any[][];
}

interface ExcelViewerProps {
  fileName: string;
}

const mockExcelData: Record<string, ExcelData> = {
  "2023_annual.xlsx": {
    headers: ["Department", "Q1", "Q2", "Q3", "Q4", "Total"],
    rows: [
      ["Sales", "$250,000", "$280,000", "$310,000", "$350,000", "$1,190,000"],
      ["Marketing", "$120,000", "$140,000", "$150,000", "$180,000", "$590,000"],
      ["R&D", "$180,000", "$190,000", "$200,000", "$220,000", "$790,000"],
      [
        "Operations",
        "$300,000",
        "$320,000",
        "$340,000",
        "$360,000",
        "$1,320,000",
      ],
    ],
  },
  "2022_annual.xlsx": {
    headers: ["Department", "Q1", "Q2", "Q3", "Q4", "Total"],
    rows: [
      ["Sales", "$220,000", "$240,000", "$260,000", "$290,000", "$1,010,000"],
      ["Marketing", "$100,000", "$110,000", "$120,000", "$140,000", "$470,000"],
      ["R&D", "$150,000", "$160,000", "$170,000", "$180,000", "$660,000"],
      [
        "Operations",
        "$280,000",
        "$290,000",
        "$300,000",
        "$320,000",
        "$1,190,000",
      ],
    ],
  },
  "Q1_2024.xlsx": {
    headers: ["Month", "Sales", "Expenses", "Profit"],
    rows: [
      ["January", "$95,000", "$65,000", "$30,000"],
      ["February", "$105,000", "$70,000", "$35,000"],
      ["March", "$120,000", "$75,000", "$45,000"],
    ],
  },
  "social_campaign_2024.xlsx": {
    headers: ["Campaign", "Impressions", "Clicks", "Conversions", "ROI"],
    rows: [
      ["Spring Sale", "250,000", "12,500", "1,250", "325%"],
      ["Summer Launch", "180,000", "9,000", "900", "275%"],
      ["Brand Awareness", "500,000", "25,000", "2,000", "400%"],
    ],
  },
  "metrics_march_2024.xlsx": {
    headers: ["Platform", "Followers", "Engagement", "Growth"],
    rows: [
      ["Instagram", "50,000", "5.2%", "+15%"],
      ["Twitter", "35,000", "3.8%", "+10%"],
      ["LinkedIn", "25,000", "4.5%", "+20%"],
    ],
  },
};

export const ExcelViewer = ({ fileName }: ExcelViewerProps) => {
  const data = mockExcelData[fileName] || {
    headers: ["No Data Available"],
    rows: [["Please select a valid Excel file"]],
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th key={index} className="border px-4 py-2 bg-muted">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
