import React from "react";
import FolderNavigation from "./FolderNavigation";
import ReportViewer from "./ReportViewer";

interface ReportExplorerProps {
  selectedFolderId?: string;
  onFolderSelect?: (folderId: string) => void;
  reportData?: any;
  isLoading?: boolean;
}

const ReportExplorer = ({
  selectedFolderId = "1",
  onFolderSelect = () => {},
  reportData,
  isLoading = false,
}: ReportExplorerProps) => {
  return (
    <div className="flex h-full w-full bg-background">
      <FolderNavigation onFolderSelect={onFolderSelect} />
      <div className="flex-1 overflow-hidden">
        <ReportViewer reportData={reportData} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ReportExplorer;
