"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, LogOut, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetUserProfileQuery } from "@/redux/services/user-profile";
import AvartarPlaceHolder from "@/public/images/user-idonate.png";

export const ProfileDropdown = ({
  session,
  signOut,
}: {
  session?: any;
  signOut?: any;
}) => {
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  const { data: userProfile, error, isLoading } = useGetUserProfileQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user profile</div>;

  const avatarSrc = userProfile?.avatar || session?.user?.image || AvartarPlaceHolder;
  const username = userProfile?.username || session?.user?.name || "Guest User";
  const email = userProfile?.email || session?.user?.email || "No Email";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="w-14 h-14 cursor-pointer">
          <AvatarImage
            width={500}
            height={500}
            src={avatarSrc}
            className="object-cover w-full rounded-full ring-2 h-full ring-iDonate-navy-primary"
            alt={`${username}'s avatar`}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <AvatarFallback className="text-gray-700">
            {username?.[0]?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-3">
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <Avatar className="w-14 h-14">
            <AvatarImage
              width={500}
              height={500}
              src={avatarSrc}
              className="object-cover w-full rounded-full ring-2 h-full ring-iDonate-navy-primary"
              alt={`${username}'s avatar`}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <AvatarFallback className="text-gray-700">
              {username?.[0]?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="font-medium text-gray-900">{username}</div>
            <div className="text-gray-500">{email}</div>
          </div>
        </div>

        <Separator className="my-2" />

        {/* Profile Settings */}
        <Link
          href={`/donor-dashboard/${userProfile?.uuid}`}
          className="flex items-center space-x-2 py-2 cursor-pointer hover:bg-gray-100 rounded-md px-2"
        >
          <User className="text-iDonate-navy-primary" size={20} />
          <span>Profile Settings</span>
        </Link>

        <Separator className="my-2" />

        {/* Donate Button */}
        <div className="p-2">
          <Button className="w-full group bg-iDonate-white-space border-2 border-iDonate-navy-primary px-2 text-iDonate-navy-primary hover:bg-iDonate-navy-primary hover:text-white hover:border-iDonate-navy-primary rounded-[12px]">
            <Heart
              style={{ width: "25px", height: "25px" }}
              className="bg-iDonate-navy-primary rounded-full p-1 fill-white group-hover:fill-iDonate-navy-primary group-hover:text-iDonate-navy-primary group-hover:bg-iDonate-green-secondary"
            />
            <span className="text-lg">បរិច្ចាគឥឡូវនេះ</span>
          </Button>
        </div>

        <Separator className="my-2" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 w-full text-left py-2 rounded-md px-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </PopoverContent>
    </Popover>
  );
};
