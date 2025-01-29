import { icons } from "lucide-react";


export const OrganizationSidebarMenuList = (uuid: string)=>[

  {
    path: `/organization-dashboard/${uuid}/dashboard`,
    icon: icons.LayoutDashboard,
    title: "Dashboard",
    active: false,
  },
  {
    path: `/organization-dashboard/${uuid}/transactions`,
    icon: icons.History,
    title: "Transactions",
    active: false,
  },
  {
    path: `/organization-dashboard/${uuid}/events`,
    icon: icons.CalendarRange,
    title: "Events",
    active: false,
  },
  {
    path: `/organization-dashboard/${uuid}/setting`,
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
