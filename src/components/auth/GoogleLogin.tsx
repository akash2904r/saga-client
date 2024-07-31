import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetGoogleUserDataMutation } from "../../features/authApiSlice";
import { setUser } from "../../features/userSlice";
import { getTheme } from "../../features/themeSlice";

import { toastify } from "../../utils";
import { errorType } from "../../constants/interfaces";

const GoogleLogin = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getTheme);
  const [googleUserData] = useGetGoogleUserDataMutation();

  const handleSuccess = async ({ code }: { code: string }) => {
    const { data, error } = await googleUserData(code);
    const err = error as errorType | undefined;

    if (err?.originalStatus === 500) {
      toastify("Something went wrong. Please try again...", 0);
      return;
    }
    
    dispatch(setUser(data));
    navigate("/");
  };

  const handleError = (error: any) => console.log("Google Login Failed... ", error);

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
    flow: "auth-code"
  });

  return (
    <button 
      type="button"
      onClick={() => login()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-fit mt-0.5 google-login rounded-[4px]"
    >
      <div className="p-0.5 rounded-[4px]">
        <div className="flex items-center justify-center gap-5 text-xs font-semibold p-2 bg-white rounded-[4px] md:text-sm md:px-4 md:py-2 hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:bg-gray-800 dark:text-white">
          <img 
            src={(isHovered || theme === "dark") ? "/svgs/google-white.svg" : "/svgs/google.svg"}
            alt="Google Logo" 
            className="w-6 h-6"
          />
          <span className="pr-2">Continue With Google</span>
        </div>
      </div>
    </button>
  );
};

export default GoogleLogin;
