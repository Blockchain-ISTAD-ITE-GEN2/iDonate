import { useGetOrganizationByUserQuery } from "@/redux/services/organization-service";
import { useGetUserProfileQuery } from "@/redux/services/user-profile";
import { icons } from "lucide-react";

export const ContributorMenulist = () => {
  const { data: user } = useGetUserProfileQuery({});

 
  return [
    {
      path: `/donor-dashboard/${user?.uuid}`,
      title: "Donor",
      icon: icons.User,
      active: false,
    },
    {
      path: `/organization-dashboard/organization-list/${user?.uuid}`,
      title: "Organization",
      icon: icons.Building2,
      active: false,
    },
  ];
};
