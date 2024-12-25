"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { logoutUser } from "@/store/slices/authSlice";
import type { AppDispatch } from "@/store/store";

export function LogoutButton() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await dispatch(logoutUser()).unwrap();
      router.push("/auth/sign-in"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logging out...
        </>
      ) : (
        "Logout"
      )}
    </Button>
  );
}
