import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Filter, SortAsc } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ReportViewerProps {
  reportTitle?: string;
  reportData?: any;
  isLoading?: boolean;
}

const ReportViewer = ({
  reportTitle = "Sample Financial Report",
  reportData = {
    columns: ["Date", "Department", "Amount", "Status"],
    rows: [
      ["2024-03-01", "Sales", "$5,000", "Completed"],
      ["2024-03-02", "Marketing", "$3,500", "Pending"],
      ["2024-03-03", "Finance", "$7,200", "Completed"],
    ],
  },
  isLoading = false,
}: ReportViewerProps) => {
  return (
    <div className="h-full w-full bg-background p-4">
      <Card className="h-full">
        <div className="p-4">
          {/* Report Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">{reportTitle}</h2>
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
                  <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                  <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                  <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Report Content */}
          <Tabs defaultValue="table" className="w-full">
            <TabsList>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="chart">Chart View</TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="mt-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      {reportData.columns.map(
                        (column: string, index: number) => (
                          <th key={index} className="p-2 text-left font-medium">
                            {column}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.rows.map((row: string[], index: number) => (
                      <tr key={index} className="border-t">
                        {row.map((cell: string, cellIndex: number) => (
                          <td key={cellIndex} className="p-2">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="chart" className="mt-4">
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  Chart view coming soon...
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default ReportViewer;
