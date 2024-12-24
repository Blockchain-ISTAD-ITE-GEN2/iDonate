export type NavMenuType = {
  path: string;
  title: string;
  active: boolean;
  children?: { path: string; title: string }[];
};

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
};

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}
