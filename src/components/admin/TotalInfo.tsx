import { ArrowUpOutlined, FileFilled, UsergroupAddOutlined, WechatWorkOutlined } from "@ant-design/icons";

import { ITotalInfoProps } from "../../constants/interfaces"

const TotalInfo = ({ title, totalCount, lastMonthCount }: ITotalInfoProps) => {
  const logoBgColor = title[0] === 'u' ? "bg-orange-500" 
    : title[0] === 'c' ? "bg-purple-800" : "bg-green-500";

  return (
    <section className="w-64 p-2 rounded-lg shadow-lg text-dark-1.5 bg-lite-1 dark:text-dark-3 dark:bg-dark-0.5">
      <div className="flex justify-between items-start">
        <div className="flex flex-col pb-5">
          <h3>TOTAL {title.toUpperCase()}</h3>
          <p className="text-2xl leading-5 text-dark-0 dark:text-lite-1">{totalCount}</p>
        </div>

        <span className={`px-2.5 py-2 rounded-full ${logoBgColor}`}>
          {title.toUpperCase() === "USERS"
            ? <UsergroupAddOutlined className="text-2xl text-lite-1 dark:text-lite-1" /> 
            : title.toUpperCase() === "COMMENTS"
              ? <WechatWorkOutlined className="text-2xl text-lite-1 dark:text-lite-1" /> : <FileFilled className="text-2xl text-lite-1 dark:text-lite-1" />
          }
        </span>
      </div>
      
      <div className="text-sm ">
        <ArrowUpOutlined className="text-green-600" />
        <span className="text-green-600 pr-0.5">{lastMonthCount}</span> Last Month
      </div>
    </section>
  );
};

export default TotalInfo;
