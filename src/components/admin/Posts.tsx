import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { getTheme } from "../../features/themeSlice";
import { useDeletePostMutation, useFetchPostsQuery } from "../../features/postApiSlice";

import TableRow from "./PostTableRow";
import NotAvailable from "./NotAvailable";
import { Loader } from "..";
import { PostsTH } from "../../constants";
import { errorType, IPostTableRowProps } from "../../constants/interfaces";
import { toastify } from "../../utils";

const Posts = () => {
  const navigate = useNavigate();

  const theme = useAppSelector(getTheme);
  const { data, isLoading, isSuccess, isError, refetch } = useFetchPostsQuery('fetchPosts');
  const [deletepost] = useDeletePostMutation();

  const deletePost = async (id: string) => {
    const { error } = await deletepost(id);
    const err = error as errorType | undefined;

    if (err) {
      switch (err.originalStatus) {
        case 400:
        case 404:
          toastify("Something went wrong. Try once again !!!", 0);
          break;
        case 200:
          await refetch();
          toastify("Post deleted successfully !!!", 1);
          break;
      }
    }
  }

  if (isLoading) return (
    <main className="w-full h-96">
      <Loader />
    </main>
  );

  return (
    <main className="w-full my-3 overflow-hidden">
      {isSuccess && data && data.length === 0 && (
        <NotAvailable tabName="posts" />
      )}

      {!isError && data && data.length > 0 && (
        <div className={`${theme === "light" ? "table-container-lite" : "table-container-dark"} shadow-lg sm:w-fit w-full max-sm:px-3.5 max-h-[560px] sm:mx-auto overflow-y-auto overflow-x-auto`}>
          <table className="lg-md:w-[770px] md:w-[720px] sm:w-[600px] w-[700px] max-h-full bg-lite-1 text-dark-0 dark:text-lite-2 dark:bg-dark-0.5">
            <thead className="sticky top-0 max-md:text-sm max-xs:text-xs bg-lite-1.5 text-dark-0 dark:bg-dark-6 dark:text-dark-3">
              <tr>
                {PostsTH.map(th => (
                  <th key={th.id} className={th.className}>
                    {th.data}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((post: IPostTableRowProps) => (
                <TableRow
                  key={post._id}
                  post={post}
                  deletePost={deletePost}
                  navigate={navigate}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default Posts;
