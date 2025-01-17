import { useDispatch } from "react-redux";
import { setToken } from "@/redux/features/auth/authSlice";

// Custom hook for dispatching the accessToken
export const useHandleDispatchNextAuth = () => {
  // Use the useDispatch hook to dispatch the accessToken
  const dispatch = useDispatch();
  // Create a function that dispatches the accessToken to the store
  const handleDispatch = (res: any) => {
    // Dispatch the accessToken to the store
    dispatch(setToken(res.accessToken));
  };
  // Return the function that dispatches the accessToken
  return handleDispatch;
};
