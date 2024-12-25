import { icons } from "lucide-react";

export const OrganizationSidebarMenuList = [
  {
    path: "/organization-dashboard/dashboard",
    icon: icons.LayoutDashboard,
    title: "Dashboard",
    active: false,
  },
  {
    path: "/organization-dashboard/transactions",
    icon: icons.History,
    title: "Transactions",
    active: false,
  },
  {
    path: "/organization-dashboard/events",
    icon: icons.CalendarRange,
    title: "Events",
    active: false,
  },
  {
    path: "/organization-dashboard/setting",
    icon: icons.Settings,
    title: "Setting",
    active: false,
  },
  {
    path: "",
    icon: icons.LogOut,
    title: "Log out",
    active: false,
  },
];
