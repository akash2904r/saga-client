import { useFetchDashDetailsQuery } from "../../features/userApiSlice";

import Loader from "../Loader";
import TotalInfo from "./TotalInfo";
import RecentInfo from "./RecentInfo";

const Dashboard = () => {
  const { data, isLoading } = useFetchDashDetailsQuery('fetchDashDetails');

  return (
    isLoading && !data ? (
      <main className="w-full h-96">
        <Loader />
      </main>
      ) : (
        <main className="w-full h-fit flex flex-col items-center gap-4 p-5">
          <section className="w-fit h-fit flex justify-center flex-wrap gap-4">
            <TotalInfo title="users" totalCount={data.users.total} lastMonthCount={data.users.last30days} />
            <TotalInfo title="comments" totalCount={data.comments.total} lastMonthCount={data.comments.last30days} />
            <TotalInfo title="posts" totalCount={data.posts.total} lastMonthCount={data.posts.last30days} />
          </section>
  
          <section className="flex gap-4 flex-wrap justify-center">
            <RecentInfo title="users" recent={data.users.latest} />
            <RecentInfo title="comments" recent={data.comments.latest} />
            <RecentInfo title="posts" recent={data.posts.latest} />
          </section>
        </main>
      )
    );
};

export default Dashboard;
