import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { RootState } from "@/store/store";
import { setUser } from "@/store/slices/authSlice";

export const userAuth = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (session?.user) {
      dispatch(setUser(session.user));
    }
  }, [session, dispatch]);

  return {
    user,
    isAuthenticated,
    loading: status === "loading" || loading,
    error,
  };
};
