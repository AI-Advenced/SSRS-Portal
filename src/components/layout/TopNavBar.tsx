import React from "react";
import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopNavBarProps {
  userEmail?: string;
  userAvatar?: string;
  onSearch?: (query: string) => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
}

const TopNavBar = ({
  userEmail = "user@example.com",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
  onSearch = () => {},
  onNotificationsClick = () => {},
  onProfileClick = () => {},
  onLogout = () => {},
}: TopNavBarProps) => {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b bg-background px-4">
      {/* Logo and Brand */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">SSRS Portal</h1>
      </div>

      {/* Search Bar */}
      <div className="flex w-1/3 min-w-[300px]">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            className="w-full pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onNotificationsClick}
          className="relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage src={userAvatar} alt="User avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onProfileClick}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavBar;
