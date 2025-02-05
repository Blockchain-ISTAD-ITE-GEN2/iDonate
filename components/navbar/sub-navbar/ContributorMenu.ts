import { useGetUserProfileQuery } from "@/redux/services/user-profile";
import { icons } from "lucide-react";
import { useRouter } from "next/navigation";

export const ContributorMenulist = () => {
  const router = useRouter();
  const { data: user, isLoading, error } = useGetUserProfileQuery({});

  return [
    {
      path: `/donor-dashboard/${user?.uuid}`,
      title: "អ្នកបរិច្ចាគ",
      icon: icons.User,
      active: false,
    },
    {
      path: `/organization-list/${user?.uuid}`,
      title: "អង្គភាព",
      icon: icons.Building2,
      active: false,
    },
  ];
};