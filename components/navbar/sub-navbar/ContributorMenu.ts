import { useGetUserProfileQuery } from "@/redux/services/user-profile";
import { icons } from "lucide-react";
import { useRouter } from "next/navigation";

export const ContributorMenulist = () => {
  const router = useRouter();
  const { data: user, isLoading, error } = useGetUserProfileQuery({});

  // if(!user){
  //   router.push(`/login`)
  // }

 
  return [
    {
      path: `/donor-dashboard/${user?.uuid}`,
      title: "Donor",
      icon: icons.User,
      active: false,
    },
    {
      path: `/organization-list/${user?.uuid}`,
      title: "Organization",
      icon: icons.Building2,
      active: false,
    },
  ];
};
