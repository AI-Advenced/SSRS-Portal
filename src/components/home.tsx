import React from "react";
import TopNavBar from "./layout/TopNavBar";
import Breadcrumbs from "./navigation/Breadcrumbs";
import ReportExplorer from "./reports/ReportExplorer";

interface HomeProps {
  userEmail?: string;
  userAvatar?: string;
  selectedFolderId?: string;
  breadcrumbItems?: Array<{ id: string; label: string }>;
  onSearch?: (query: string) => void;
  onFolderSelect?: (folderId: string) => void;
  onBreadcrumbNavigate?: (item: { id: string; label: string }) => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
}

const Home = ({
  userEmail = "user@example.com",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
  selectedFolderId = "1",
  breadcrumbItems = [
    { id: "home", label: "Home" },
    { id: "finance", label: "Finance" },
    { id: "reports", label: "Reports" },
  ],
  onSearch = () => {},
  onFolderSelect = () => {},
  onBreadcrumbNavigate = () => {},
  onNotificationsClick = () => {},
  onProfileClick = () => {},
  onLogout = () => {},
}: HomeProps) => {
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <TopNavBar
        userEmail={userEmail}
        userAvatar={userAvatar}
        onSearch={onSearch}
        onNotificationsClick={onNotificationsClick}
        onProfileClick={onProfileClick}
        onLogout={onLogout}
      />
      <Breadcrumbs items={breadcrumbItems} onNavigate={onBreadcrumbNavigate} />
      <div className="flex-1 overflow-hidden">
        <ReportExplorer
          selectedFolderId={selectedFolderId}
          onFolderSelect={onFolderSelect}
        />
      </div>
    </div>
  );
};

export default Home;
