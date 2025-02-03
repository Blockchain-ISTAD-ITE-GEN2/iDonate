import { icons } from "lucide-react";
export const ContributorMenulist = (uuid: string) => [
  {
    path: `/donor-dashboard/${uuid}`,
    title: "Donor",
    icon: icons.User,
    active: false,
  },
  {
    path: `/organization-dashboard/${uuid}/dashboard`,
    title: "Organization",
    icon: icons.Building2,
    active: false,
  },
];