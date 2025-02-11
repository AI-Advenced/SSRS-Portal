import React from "react";
import FolderNavigation from "./FolderNavigation";
import ReportViewer from "./ReportViewer";

interface FolderFile {
  name: string;
  size: string;
  uploadDate: string;
}

interface FolderItem {
  id: string;
  name: string;
  children?: FolderItem[];
  files?: FolderFile[];
}

interface ReportExplorerProps {
  selectedFolderId?: string;
  onFolderSelect?: (folderId: string) => void;
  reportData?: any;
  isLoading?: boolean;
}

const defaultFolders: FolderItem[] = [
  {
    id: "1",
    name: "Finance",
    children: [
      {
        id: "1-1",
        name: "Annual Reports",
        files: [
          {
            name: "2023_annual.xlsx",
            size: "2.3 MB",
            uploadDate: "2024-03-15",
          },
          {
            name: "2022_annual.xlsx",
            size: "2.1 MB",
            uploadDate: "2023-03-10",
          },
        ],
      },
      {
        id: "1-2",
        name: "Quarterly Reports",
        files: [
          { name: "Q1_2024.xlsx", size: "1.2 MB", uploadDate: "2024-04-01" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Marketing",
    children: [
      {
        id: "2-1",
        name: "Campaign Analytics",
        files: [
          {
            name: "social_campaign_2024.xlsx",
            size: "3.4 MB",
            uploadDate: "2024-03-20",
          },
        ],
      },
      {
        id: "2-2",
        name: "Social Media Metrics",
        files: [
          {
            name: "metrics_march_2024.xlsx",
            size: "1.8 MB",
            uploadDate: "2024-04-01",
          },
        ],
      },
    ],
  },
];

const ReportExplorer = ({
  selectedFolderId = "1",
  onFolderSelect = () => {},
  reportData,
  isLoading = false,
}: ReportExplorerProps) => {
  const [currentFolderId, setCurrentFolderId] =
    React.useState(selectedFolderId);
  const [currentFiles, setCurrentFiles] = React.useState<FolderFile[]>([]);

  const findFolderFiles = (folderId: string): FolderFile[] => {
    for (const folder of defaultFolders) {
      if (folder.id === folderId) return folder.files || [];
      if (folder.children) {
        const childFolder = folder.children.find(
          (child) => child.id === folderId,
        );
        if (childFolder) return childFolder.files || [];
      }
    }
    return [];
  };

  const handleFolderSelect = (folderId: string) => {
    setCurrentFolderId(folderId);
    setCurrentFiles(findFolderFiles(folderId));
    onFolderSelect(folderId);
  };

  return (
    <div className="flex h-full w-full bg-background">
      <FolderNavigation
        selectedFolderId={currentFolderId}
        onFolderSelect={handleFolderSelect}
      />
      <div className="flex-1 overflow-hidden">
        <ReportViewer files={currentFiles} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ReportExplorer;
