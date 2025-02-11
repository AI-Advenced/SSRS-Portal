import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  onNavigate?: (item: BreadcrumbItem) => void;
}

const defaultItems: BreadcrumbItem[] = [
  { id: "home", label: "Home" },
  { id: "finance", label: "Finance" },
  { id: "reports", label: "Reports" },
  { id: "annual", label: "Annual Reports" },
];

const Breadcrumbs = ({
  items = defaultItems,
  onNavigate = () => {},
}: BreadcrumbsProps) => {
  return (
    <nav className="w-full bg-background border-b px-4 py-2">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            )}
            <Button
              variant="link"
              className={`p-0 h-auto ${index === items.length - 1 ? "text-primary font-medium" : "text-muted-foreground"}`}
              onClick={() => onNavigate(item)}
            >
              {item.label}
            </Button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
