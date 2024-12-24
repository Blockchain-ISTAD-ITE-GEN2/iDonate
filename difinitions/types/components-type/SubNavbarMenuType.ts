import { LucideIcon } from "lucide-react";

export type SubNavbarMenuType = {
  path: string;
  title: string;
  active: boolean;
  icon?: LucideIcon;
  children?: { path: string; title: string }[];
};
