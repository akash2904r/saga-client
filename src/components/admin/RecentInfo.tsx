import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { getTheme } from "../../features/themeSlice";

import TableData from "./TableData";
import { recentInfoData, defaultImgSrc } from "../../constants";
import { ILatestComments, ILatestPosts, ILatestUsers } from "../../constants/interfaces";

interface IRecentInfoProps {
  title: string,
  recent: ILatestUsers[] | ILatestPosts[] | ILatestComments[]
}

const RecentInfo = ({ title, recent }: IRecentInfoProps) => {
  const checkTitle = (users: string, comments: string, posts: string) => 
    title === "users" ? users : title === "comments" ? comments : posts;
  
  const data = title === "users" ? recentInfoData.users 
    : title === "comments" ? recentInfoData.comments 
      : recentInfoData.posts;

  const navigate = useNavigate();

  const theme = useAppSelector(getTheme);

  const showAll = () => title === "users" 
    ? navigate("/portal?tab=users") 
    : title === "posts" 
      ? navigate("/portal?tab=posts") 
      : navigate("/portal?tab=comments");

  return (
    <section className={`${data.size} py-2 rounded-lg shadow-lg bg-lite-1 dark:bg-dark-0.5`}>
      <div className="flex justify-between px-5 my-2.5 text-dark-1.5 text-[16px] font-medium dark:text-lite-2">
        <h4>Recent {title}</h4>
        <button onClick={showAll}>See all</button>
      </div>

      <table className="w-full bg-lite-1.5 text-dark-0 dark:bg-dark-6 dark:text-dark-3 my-0.5">
        <thead>
          <tr className="text-sm">
            <th className={`${data.firstTH} recent-th`}>{data.firstH5}</th>
            <th className={`${data.secondTH} recent-th`}>{data.secondH5}</th>
          </tr>
        </thead>
      </table>

      <div className={`${theme === "light" ? "table-container-lite" : "table-container-dark"} w-full max-h-[315px] overflow-y-auto`}>
        <table className="w-full">
          <tbody>
            {recent.map(info => (
              <tr key={info._id}>
                <TableData 
                  className={checkTitle("", "pl-5", "px-2")} 
                  title={title} 
                  imgSrc={checkTitle((info as ILatestUsers).avatar || defaultImgSrc, "", (info as ILatestPosts).image)}
                  imgAlt={checkTitle((info as ILatestUsers).username, "", (info as ILatestPosts).title)}
                  primaryData={title === "comments" ? (info as ILatestComments).comment : ""}
                />
                <TableData 
                  second
                  className={checkTitle("w-[60%]", "w-[15%]", "w-[75%]")} 
                  title={title} 
                  primaryData={checkTitle((info as ILatestUsers).username, (info as ILatestComments).likes, (info as ILatestPosts).title)}
                  secondaryData={title === "posts" ? (info as ILatestPosts).content : ""}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentInfo;
