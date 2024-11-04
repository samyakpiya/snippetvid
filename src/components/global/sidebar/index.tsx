"use client";

import { getWorkspaces } from "@/actions/workspace";
import { CompanyLogo } from "@/components/global/logos";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/global/modal";
import { Menu, PlusCircle } from "lucide-react";
import Search from "@/components/global/search";
import SidebarItem from "@/components/global/sidebar/sidebar-item";
import { MENU_ITEMS } from "@/constants";
import { getNotifications } from "@/actions/user";
import WorkspacePlaceholder from "@/components/global/sidebar/workspace-placeholder";
import GlobalCard from "@/components/global/global-card";
import { Button } from "@/components/ui/button";
import Loader from "@/components/global/loader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import InfoBar from "@/components/global/info-bar";
import { useDispatch } from "react-redux";
import { WORKSPACES } from "@/redux/slices/workspaces";

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  // WIP: Add upgrade button
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();

  const { data, isFetched } = useQuery({
    queryKey: ["user-workspaces"],
    queryFn: getWorkspaces,
  });

  const { data: notifications } = useQuery({
    queryKey: ["user-notifications"],
    queryFn: getNotifications,
  });

  const menuItems = MENU_ITEMS(activeWorkspaceId);

  const workspace = data?.data;
  const count = notifications?.data;

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  const currentWorkspace = workspace?.workspace.find(
    (s) => s.id === activeWorkspaceId
  );

  if (isFetched && workspace) {
    dispatch(WORKSPACES({ workspaces: workspace.workspace }));
  }

  const SidebarSection = (
    <div className="bg-[#111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <CompanyLogo />
        <p className="text-2xl">SnippetVid</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace" />
        </SelectTrigger>
        <SelectContent className="bg-[#111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workspace?.workspace.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id}>
                {workspace.name}
              </SelectItem>
            ))}

            {/* The other workspaces that the user is a member of */}
            {workspace?.members &&
              workspace?.members.length > 0 &&
              workspace.members.map(
                (workspace) =>
                  workspace.WorkSpace && (
                    <SelectItem
                      value={workspace.WorkSpace.id}
                      key={workspace.WorkSpace.id}
                    >
                      {workspace.WorkSpace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>

      {currentWorkspace?.type === "PUBLIC" && workspace?.subscription?.plan && (
        <Modal
          trigger={
            <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
              <PlusCircle
                size={15}
                className="text-neutral-800/90 fill-neutral-500"
              />
              <span className="text-neutral-400 font-semibold text-xs">
                Invite To Workspace
              </span>
            </span>
          }
          title="Invite To Workspace"
          description="Invite other users to your workspace"
        >
          <Search workspaceId={activeWorkspaceId} />
        </Modal>
      )}
      <p className="w-full text-[#9d9d9d] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              href={item.href}
              icon={item.icon}
              selected={pathName === item.href}
              title={item.title}
              key={item.title}
              notifications={
                (item.title === "Notifications" &&
                  count?._count &&
                  count._count.notification) ||
                0
              }
            />
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      <p className="w-full text-[#9d9d9d] font-bold">Workspaces</p>

      {workspace?.workspace.length === 1 && workspace.members.length === 0 && (
        <div className="w-full mt-[-10px]">
          <p className="text-[#3c3c3c] font-medium text-sm">
            {workspace.subscription?.plan === "FREE"
              ? "Upgrade to create workspaces"
              : "No Workspaces"}
          </p>
        </div>
      )}

      <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
          {workspace?.workspace &&
            workspace?.workspace.length > 0 &&
            workspace.workspace.map(
              (item) =>
                item.type !== "PERSONAL" && (
                  <SidebarItem
                    href={`/dashboard/${item.id}`}
                    selected={pathName === `/dashboard/${item.id}`}
                    title={item.name}
                    notifications={0}
                    key={item.name}
                    icon={
                      <WorkspacePlaceholder>
                        {item.name.charAt(0)}
                      </WorkspacePlaceholder>
                    }
                  />
                )
            )}
          {workspace?.members &&
            workspace?.members.length > 0 &&
            workspace?.members.map(
              (item) =>
                item.WorkSpace && (
                  <SidebarItem
                    href={`/dashboard/${item.WorkSpace.id}`}
                    selected={pathName === `/dashboard/${item.WorkSpace.id}`}
                    title={item.WorkSpace.name}
                    notifications={0}
                    key={item.WorkSpace.id}
                    icon={
                      <WorkspacePlaceholder>
                        {item.WorkSpace.name.charAt(0)}
                      </WorkspacePlaceholder>
                    }
                  />
                )
            )}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      {workspace?.subscription?.plan === "FREE" && (
        <GlobalCard
          title="Upgrade to Pro"
          description="Unlock AI features like transcription, AI summary, and more."
          footer={
            <Button className="text-sm w-full mt-2">
              <Loader color="#000" state={false}>
                Upgrade
              </Loader>
            </Button>
          }
        />
      )}
    </div>
  );

  return (
    <div className="full">
      <InfoBar />
      {/* Sheet to open sidebar in mobile and desktop */}
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant="ghost" className="mt-[2px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-fit h-full">
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  );
};

export default Sidebar;
