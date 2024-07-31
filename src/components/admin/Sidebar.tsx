import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FileFilled, 
  PieChartFilled, 
  UserOutlined, 
  UsergroupAddOutlined, 
  WechatWorkOutlined, 
  AlignLeftOutlined, 
  CloseOutlined 
} from "@ant-design/icons"

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPortal, setPortal } from "../../features/portalSlice";

import { SideBarData } from "../../constants";

const Sidebar = ({ tab }: { tab: string }) => {
  const [showHamburger, setShowHamburger] = useState(true);

  const dispatch = useAppDispatch();
  const portal = useAppSelector(getPortal);

  const SideBarIcons = [
    <PieChartFilled className={`admin-icons ${portal === "dashboard" && "is-active"}`} />,
    <UserOutlined className={`admin-icons ${portal === "profile" && "is-active"}`} />,
    <WechatWorkOutlined className={`admin-icons ${portal === "comments" && "is-active"}`} />,
    <UsergroupAddOutlined className={`admin-icons ${portal === "users" && "is-active"}`} />,
    <FileFilled className={`admin-icons ${portal === "posts" && "is-active"}`} />
  ];

  useEffect(() => {
    if (tab !== "" && portal !== tab) {
      dispatch(setPortal(tab));
    }
  }, [tab]);

  return (
    <>
      <section className={`max-lg:fixed max-lg:h-full transition-transform duration-700 ${showHamburger ? "max-lg:-translate-x-96" : "max-lg:translate-x-0"} z-10 min-w-60 flex flex-col gap-2 py-5 px-1.5 bg-lite-1 dark:bg-dark-0`}>
        {
          SideBarData.map((data, i) => (
            <div 
              key={data.primary}
              className={`group rounded-md cursor-pointer ${portal === data.primary && 'bg-lite-1.5 dark:bg-dark-2'}`}
              onClick={() => setShowHamburger(true)}
            >
              <Link to={data.to} className="w-full h-full py-1.5 px-2 flex gap-3 items-center">
                {SideBarIcons[i]}
                <span className="capitalize text-lg text-dark-1.5 dark:text-lite-1 pointer-events-none">{data.primary}</span>
                {data.secondary && <span className={`${portal === data.primary ? "bg-lite-1" : "bg-lite-1.5" }  text-dark-1.5 dark:bg-dark-1 dark:text-lite-1 py-0.5 px-2 rounded-md ml-10`}>{data.secondary}</span>}
              </Link>
            </div>
          ))
        }
      </section>

      <span 
        className={`lg:hidden max-sm:fixed max-sm:-translate-y-11 transition-transform duration-700 ${!showHamburger && "fixed translate-x-60 max-sm:translate-y-[1px] bg-lite-1 dark:bg-dark-0"} h-fit px-2.5 py-1.5 z-50 cursor-pointer text-dark-0 hover:bg-gray-200 dark:text-lite-1.5 dark:hover:text-lite-1 dark:hover:bg-dark-2`}
        onClick={() => setShowHamburger(prev => !prev)}
      >
        {showHamburger 
          ? <AlignLeftOutlined /> 
          : <CloseOutlined />
        }
      </span>
    </>
  );
};

export default Sidebar;
