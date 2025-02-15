import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "./ui/button";
import { MessageCircleCode } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";

export function AppSidebar() {

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 w-full"></SidebarHeader>
      <SidebarContent className="p-5">
        <Link href="/">
          <Button className="cursor-pointer">
            {" "}
            <MessageCircleCode /> Start New Chat
          </Button>
        </Link>
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
