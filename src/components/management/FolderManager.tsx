import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Folder, Upload, X, FileText } from "lucide-react";
import { FileList } from "./FileList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FolderItem {
  id: string;
  name: string;
  children?: FolderItem[];
  files?: Array<{ name: string; size: string; uploadDate: string }>;
}

export const FolderManager = () => {
  const [folders, setFolders] = React.useState<FolderItem[]>([
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
    {
      id: "1",
      name: "Finance",
      children: [
        { id: "1-1", name: "Annual Reports" },
        { id: "1-2", name: "Quarterly Reports" },
      ],
    },
    {
      id: "2",
      name: "Marketing",
      children: [
        { id: "2-1", name: "Campaign Analytics" },
        { id: "2-2", name: "Social Media Metrics" },
      ],
    },
  ]);

  const [newFolderName, setNewFolderName] = React.useState("");
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [selectedFolder, setSelectedFolder] = React.useState<string | null>(
    null,
  );

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: FolderItem = {
        id: `${folders.length + 1}`,
        name: newFolderName,
        children: [],
      };
      setFolders([...folders, newFolder]);
      setNewFolderName("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    if (selectedFolder && selectedFiles.length > 0) {
      const updatedFolders = folders.map((folder) => {
        if (folder.id === selectedFolder) {
          return {
            ...folder,
            files: [
              ...(folder.files || []),
              ...selectedFiles.map((file) => ({
                name: file.name,
                size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                uploadDate: new Date().toISOString().split("T")[0],
              })),
            ],
          };
        }
        if (folder.children) {
          return {
            ...folder,
            children: folder.children.map((child) =>
              child.id === selectedFolder
                ? {
                    ...child,
                    files: [
                      ...(child.files || []),
                      ...selectedFiles.map((file) => ({
                        name: file.name,
                        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                        uploadDate: new Date().toISOString().split("T")[0],
                      })),
                    ],
                  }
                : child,
            ),
          };
        }
        return folder;
      });

      setFolders(updatedFolders);
      setSelectedFiles([]);
    }
  };

  const getCurrentFolderFiles = () => {
    for (const folder of folders) {
      if (folder.id === selectedFolder) return folder.files || [];
      if (folder.children) {
        const childFolder = folder.children.find(
          (child) => child.id === selectedFolder,
        );
        if (childFolder) return childFolder.files || [];
      }
    }
    return [];
  };

  const handleDeleteFile = (fileName: string) => {
    const updatedFolders = folders.map((folder) => {
      if (folder.id === selectedFolder) {
        return {
          ...folder,
          files: folder.files?.filter((file) => file.name !== fileName) || [],
        };
      }
      if (folder.children) {
        return {
          ...folder,
          children: folder.children.map((child) =>
            child.id === selectedFolder
              ? {
                  ...child,
                  files:
                    child.files?.filter((file) => file.name !== fileName) || [],
                }
              : child,
          ),
        };
      }
      return folder;
    });

    setFolders(updatedFolders);
  };

  return (
    <div className="p-6 bg-background">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Folder Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <div className="flex gap-2">
              <Input
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
              <Button onClick={handleAddFolder}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Folder Structure */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Folder Structure</h3>
          <ScrollArea className="h-[400px]">
            {folders.map((folder) => (
              <div key={folder.id} className="mb-4">
                <div
                  className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                    selectedFolder === folder.id
                      ? "bg-accent"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <Folder className="h-4 w-4" />
                  <span>{folder.name}</span>
                </div>
                {folder.children?.map((child) => (
                  <div
                    key={child.id}
                    className={`flex items-center gap-2 p-2 pl-6 rounded cursor-pointer ${
                      selectedFolder === child.id
                        ? "bg-accent"
                        : "hover:bg-accent/50"
                    }`}
                    onClick={() => setSelectedFolder(child.id)}
                  >
                    <Folder className="h-4 w-4" />
                    <span>{child.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* File Upload and List */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">
            {selectedFolder
              ? "Files in Selected Folder"
              : "Select a Folder to View Files"}
          </h3>
          <div className="space-y-4">
            <Input
              type="file"
              multiple
              accept=".xlsx,.xls,.csv,.pdf"
              onChange={handleFileChange}
            />
            {selectedFolder && (
              <>
                <div className="space-y-2 mb-4">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-accent/50 p-2 rounded"
                    >
                      <span className="truncate">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setSelectedFiles(
                            selectedFiles.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-2">Existing Files</h4>
                  <FileList
                    files={getCurrentFolderFiles()}
                    onDelete={handleDeleteFile}
                  />
                </div>
              </>
            )}
            <Button
              className="w-full"
              disabled={!selectedFolder || selectedFiles.length === 0}
              onClick={handleUpload}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload to Selected Folder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderManager;
