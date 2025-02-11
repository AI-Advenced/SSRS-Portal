import React from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  Home,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FolderItem {
  id: string;
  name: string;
  children?: FolderItem[];
}

interface FolderNavigationProps {
  folders?: FolderItem[];
  selectedFolderId?: string;
  onFolderSelect?: (folderId: string) => void;
}

const defaultFolders: FolderItem[] = [
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
  {
    id: "3",
    name: "Sales",
    children: [
      { id: "3-1", name: "Regional Performance" },
      { id: "3-2", name: "Product Sales" },
    ],
  },
];

const FolderTreeItem = ({
  item,
  selectedId,
  onSelect,
}: {
  item: FolderItem;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = React.useState(item.id === selectedId);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="py-1">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center gap-2">
          {hasChildren ? (
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          ) : (
            <div className="w-6" />
          )}
          <Button
            variant="ghost"
            className={`h-8 justify-start gap-2 px-2 hover:bg-accent ${item.id === selectedId ? "bg-accent" : ""}`}
            onClick={() => onSelect?.(item.id)}
          >
            <Folder className="h-4 w-4" />
            <span className="truncate">{item.name}</span>
          </Button>
        </div>
        {hasChildren && (
          <CollapsibleContent>
            <div className="ml-6">
              {item.children.map((child) => (
                <FolderTreeItem
                  key={child.id}
                  item={child}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  );
};

const FolderNavigation = ({
  folders = defaultFolders,
  selectedFolderId,
  onFolderSelect,
}: FolderNavigationProps) => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-[280px] border-r bg-background">
      <div className="p-4 border-b space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => navigate("/")}
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => navigate("/manage")}
        >
          <Settings className="h-4 w-4" />
          <span>Manage</span>
        </Button>
      </div>
      <ScrollArea className="h-[calc(100%-64px)]">
        <div className="p-4">
          {folders.map((folder) => (
            <FolderTreeItem
              key={folder.id}
              item={folder}
              selectedId={selectedFolderId}
              onSelect={onFolderSelect}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FolderNavigation;
