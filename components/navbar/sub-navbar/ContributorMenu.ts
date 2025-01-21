// import { icons } from "lucide-react";

// export const ContributorMenulist = [
//   {
//     path: "/donor-dashboard",
//     title: "Donor",
//     icon: icons.User,
//     active: false,
//   },
//   {
//     path: "/organization-dashboard/dashboard/",
//     title: "Organization",
//     icon: icons.Building2,
//     active: false,
//   },
// ];


import { icons } from "lucide-react";
export const ContributorMenulist = (uuid:string) => [
  {
    path: `/donor-dashboard/${uuid}`,
    title: "Donor",
    icon: icons.User,
    active: false,
  },
  {
    path: `/organization-dashboard/dashboard/${uuid}`,
    title: "Organization",
    icon: icons.Building2, 
    active: false,
  },
];
