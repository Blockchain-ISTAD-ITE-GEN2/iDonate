import { useGetUserProfileQuery } from "@/redux/services/user-profile";
import { icons } from "lucide-react";
import { useMemo } from "react";

export const useContributorMenuList = () => {
  const { data: user, isLoading, error } = useGetUserProfileQuery({});

  const menuList = useMemo(
    () => [
      {
        path: user?.uuid ? `/donor-dashboard/${user.uuid}` : "#",
        title: "អ្នកបរិច្ចាគ",
        icon: icons.User,
        active: false,
      },
      {
        path: user?.uuid ? `/organization-list/${user.uuid}` : "#",
        title: "អង្គភាព",
        icon: icons.Building2,
        active: false,
      },
    ],
    [user],
  );

  return { menuList, isLoading, error };
};
