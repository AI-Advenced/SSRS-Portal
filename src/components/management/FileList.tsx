import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileListProps {
  files: Array<{ name: string; size: string; uploadDate: string }>;
  onDelete?: (fileName: string) => void;
}

export const FileList = ({ files = [], onDelete }: FileListProps) => {
  return (
    <ScrollArea className="h-[300px] w-full">
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {file.size} • {file.uploadDate}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete?.(file.name)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
