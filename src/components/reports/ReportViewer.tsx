import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Filter, SortAsc, FileText } from "lucide-react";
import { ExcelViewer } from "./ExcelViewer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FileItem {
  name: string;
  size: string;
  uploadDate: string;
}

interface ReportViewerProps {
  files?: FileItem[];
  isLoading?: boolean;
}

interface ExcelViewerState {
  selectedFile: string | null;
}

const downloadFile = (data: any, filename: string, type: string) => {
  // For demo purposes, we'll create a simple CSV/PDF-like content
  let content = "";

  if (type === "csv" || type === "xlsx") {
    // Create CSV content
    content = data.columns.join(",") + "\n";
    data.rows.forEach((row: string[]) => {
      content += row.join(",") + "\n";
    });
  } else if (type === "pdf") {
    // Create a simple text representation for PDF
    content = data.columns.join("\t") + "\n";
    data.rows.forEach((row: string[]) => {
      content += row.join("\t") + "\n";
    });
  }

  const blob = new Blob([content], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.${type}`;
  a.click();
  window.URL.revokeObjectURL(url);
};

const ReportViewer = ({ files = [], isLoading = false }: ReportViewerProps) => {
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
  return (
    <div className="h-full w-full bg-background p-4">
      <Card className="h-full">
        <div className="p-4">
          {/* Report Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Files</h2>
            <div className="flex gap-2">
              {/* Filter Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Date Range</DropdownMenuItem>
                  <DropdownMenuItem>Department</DropdownMenuItem>
                  <DropdownMenuItem>Status</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SortAsc className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Sort by Date</DropdownMenuItem>
                  <DropdownMenuItem>Sort by Amount</DropdownMenuItem>
                  <DropdownMenuItem>Sort by Status</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Export Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() =>
                      downloadFile({ columns: [], rows: [] }, "report", "pdf")
                    }
                  >
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      downloadFile({ columns: [], rows: [] }, "report", "xlsx")
                    }
                  >
                    Export as Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      downloadFile({ columns: [], rows: [] }, "report", "csv")
                    }
                  >
                    Export as CSV
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* File List */}
          <div className="rounded-md border mb-4">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-2 text-left font-medium">Name</th>
                  <th className="p-2 text-left font-medium">Size</th>
                  <th className="p-2 text-left font-medium">Upload Date</th>
                  <th className="p-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={index} className="border-t">
                    <td
                      className="p-2 cursor-pointer hover:text-primary"
                      onClick={() => setSelectedFile(file.name)}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {file.name}
                      </div>
                    </td>
                    <td className="p-2">{file.size}</td>
                    <td className="p-2">{file.uploadDate}</td>
                    <td className="p-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          downloadFile(
                            { columns: [], rows: [] },
                            file.name,
                            "xlsx",
                          )
                        }
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {files.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-4 text-center text-muted-foreground"
                    >
                      No files in this folder
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Excel Content Viewer */}
          {selectedFile && (
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">{selectedFile}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                >
                  Close
                </Button>
              </div>
              <ExcelViewer fileName={selectedFile} />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ReportViewer;
