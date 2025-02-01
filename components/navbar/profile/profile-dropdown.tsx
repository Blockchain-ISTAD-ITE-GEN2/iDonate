"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, LogOut, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { selectToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import AvartarPlaceHolder from "@/public/images/user-idonate.png";
import { useGetUserProfileQuery } from "@/redux/services/user-profile";
export const ProfileDropdown = ({
  session,
  signOut,
  token,
}: {
  session?: any;
  signOut?: any;
  token?: string | any;
}) => {
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  // const {data:userProfile} = useGetUserProfileQuery({});
  const { data: userProfile, error, isLoading } = useGetUserProfileQuery({});
  console.log("The value of Token: ", userProfile);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user profile</div>;
  }

  console.log("User Profile: ", userProfile);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {session?.user?.image ? (
          <Image
            src={session.user.image ?? AvartarPlaceHolder}
            alt={`${session.user.name ?? "user"}'s avatar`}
            width={40}
            height={40}
            className="rounded-full border-2 border-iDonate-navy-primary"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-iDonate-navy-primary flex items-center justify-center">
            <User className="text-white" size={20} />
          </div>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-2">
        {/* User Info */}
        <div className="p-3">
          <div className="flex items-center space-x-3">
            {session?.user?.image ? (
              <Image
                src={session.user.image || AvartarPlaceHolder}
                alt={`${session.user.name ?? "User"}'s avatar`}
                width={40}
                height={40}
                className="rounded-full border-2 border-iDonate-navy-primary"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-iDonate-navy-primary flex items-center justify-center">
                <User className="text-white" size={20} />
              </div>
            )}
            <div className="text-sm">
              <div className="font-medium text-gray-900">
                {session?.user?.name || "Guest User"}
              </div>
              <div className="text-gray-500">
                {session?.user?.email || "No email"}
              </div>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Donate Button */}
        <div className="p-2">
          <Button className="w-full group bg-iDonate-white-space border-2 border-iDonate-navy-primary px-2 text-iDonate-navy-primary hover:bg-iDonate-navy-primary hover:text-white hover:border-iDonate-navy-primary rounded-[12px]">
            <Heart
              style={{ width: "25px", height: "25px" }}
              className="bg-iDonate-navy-primary rounded-full p-1 fill-white group-hover:fill-iDonate-navy-primary group-hover:text-iDonate-navy-primary group-hover:bg-iDonate-green-secondary"
            />
            <span className="text-lg">Donate Now</span>
          </Button>
        </div>

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem
          onClick={handleSignOut} // Use handleSignOut instead of signOut directly
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
