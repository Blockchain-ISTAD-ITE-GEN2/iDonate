import { useGetUserProfileQuery } from "@/redux/services/user-profile";
import { useMemo } from "react";
import { User, Building2 } from "lucide-react"; // ✅ Correct import

export const useContributorMenuList = () => {
  const { data: user, isLoading } = useGetUserProfileQuery({});

  const menuList = useMemo(
    () => [
      {
        path: user?.uuid ? `/donor-dashboard/${user.uuid}` : "/login",
        title: "អ្នកបរិច្ចាគ",
        icon: User,
        active: false,
      },
      {
        path: user?.uuid ? `/organization-list/${user.uuid}` : "/login",
        title: "អង្គភាព",
        icon: Building2,
        active: false,
      },
    ],
    [user]
  );

  return { menuList, isLoading };
};
