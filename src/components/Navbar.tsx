import { useState, useEffect, KeyboardEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUser, setUser } from "../features/userSlice";
import { getTheme, toggleTheme } from "../features/themeSlice";
import { useSignOutMutation } from "../features/authApiSlice";

import { Logo } from "../components";
import { defaultImgSrc } from "../constants";
import { setPortal } from "../features/portalSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(useAppSelector(getTheme));
  const [showProfileBox, setShowProfileBox] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const [signOut] = useSignOutMutation();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.getElementsByTagName('body')[0].classList.add("bg-dark-9");
    } else {
      document.documentElement.classList.remove("dark");
      document.getElementsByTagName('body')[0].classList.remove("bg-dark-9");
    }
  }, [theme]);

  useEffect(() => {
    const exp = user?.exp;

    if (exp && exp * 1000 < new Date().getTime()) dispatch(setUser({ ...user, accessToken: null }));

    setShowProfileBox(false);
  }, [location])

  const switchTheme = (): void => {
    dispatch(toggleTheme());

    setTheme(theme === "dark" ? "light" : "dark");
  };

  const signout = async (): Promise<void> => {
    await signOut();

    dispatch(setUser(null));

    navigate("/auth");
  };

  const goToPortal = (): void => {
    dispatch(setPortal("Profile"));

    navigate("/portal?tab=profile");
  };

  const showResultsForSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search !== "") {
      navigate(`/search?for=${search}&sort=latest&category=NIL`);
      setSearch("");
    }
  };

  return (
    <nav className="h-fit sticky top-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg flex justify-around items-center py-2 z-40 sm:justify-between sm:px-5 lg:px-10 xl:px-16 outline outline-1 outline-lite-2 dark:bg-dark-1 dark:bg-opacity-50 dark:backdrop-filter dark:backdrop-blur-lg dark:outline-gray-500">
      <Logo className="max-[425px]:ml-3.5" />

      <div className="flex items-center gap-1 outline outline-1 py-1 pl-3 pr-2 lg:pl-2 lg:pr-3 bg-lite-1 outline-lite-2 rounded-full dark:bg-dark-2 dark:outline-dark-3 max-sm:p-1.5">
        <input 
          type="text" 
          name="Search"
          placeholder="Search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={showResultsForSearch}
          className="bg-transparent focus:outline-none placeholder:text-black md:px-2 md:py-0.5 dark:placeholder:text-lite-2 dark:text-lite-2 max-sm:hidden"
        />
        <img 
          src={theme === "light" ? "/svgs/search.svg" : "/svgs/search-lite.svg"} 
          alt="Search" 
          className="w-5 h-5 max-sm:w-4 max-sm:h-4 cursor-pointer"
          onClick={() => navigate("/search")}
        />
      </div>

      <div className="relative flex items-center gap-2 lg:gap-10">
        <button className={`p-2 rounded-full ${theme === "light" ? "hover:bg-gray-200" : "hover:bg-dark-2" }`} onClick={switchTheme}>
            <img 
              src={theme === "light" ? "/svgs/moon.svg" : "/svgs/sun.svg"} 
              alt={theme === "light" ? "Moon" : "Sun"} 
              className="h-5 w-5 md:h-6 md:w-6" 
            />
        </button>

        {!user
          ? (
            <button className="h-fit bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-3xl" onClick={() => navigate("/auth")}>
              <div className="p-0.5 rounded-3xl">
                <div className="text-xs font-semibold p-2 bg-white rounded-3xl md:text-sm md:px-4 md:py-2 hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:bg-gray-800 dark:text-white">SIGN IN</div>
              </div>
            </button>
          )
          : (
            <>
              <img 
                src={user?.avatar || defaultImgSrc}
                alt={user.name} 
                className="h-9 w-9 rounded-full cursor-pointer"
                onMouseEnter={() => setShowProfileBox(true)}
                onMouseLeave={() => setShowProfileBox(false)}
              />
              <div 
                className={`w-64 transition-all duration-500 bg-lite-1 shadow-2xl absolute lg:-right-10 sm:-right-3 xs:-right-1 -right-3 top-10 rounded-[5px] z-10 dark:bg-dark-1.5 ${showProfileBox ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onMouseEnter={() => setShowProfileBox(true)}
                onMouseLeave={() => setShowProfileBox(false)}
              >
                <div className="w-full border-lite-2 border-b-[1px] p-2 dark:border-dark-2">
                  <img 
                    src={user?.avatar || defaultImgSrc} 
                    alt={user.name} 
                    className="h-8 w-8 rounded-full mx-auto"
                  />
                  <h4 className="w-full text-[15px] text-dark-2 truncate text-center dark:text-lite-1">{user.name}</h4>
                  <h5 className="w-full text-[13px] text-dark-3 truncate text-center dark:text-lite-2">{user.email}</h5>
                </div>
                <div className="w-full flex items-center">
                  <button className="w-1/2 text-center border-lite-2 border-r-[1px] text-[15px] text-dark-1 py-[3px] rounded-bl-[4px] dark:text-lite-1 dark:border-dark-2 hover:bg-lite-2 hover:dark:bg-dark-2" onClick={goToPortal}>Profile</button>
                  <button className="w-1/2 text-red-500 text-center rounded-br-[4px] text-[15px] py-[3px] hover:bg-red-600/75 hover:text-lite-1" onClick={signout}>Sign out</button>
                </div>
              </div>
            </>
          )
        }
      </div>
    </nav>
  );
};

export default Navbar;
