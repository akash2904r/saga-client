import { useAppSelector } from "../../app/hooks";
import { useDeleteCommentMutation, useFetchCommentsQuery } from "../../features/commentApiSlice";
import { getTheme } from "../../features/themeSlice";

import TableRow from "./CommentTableRow";
import NotAvailable from "./NotAvailable";
import { Loader } from "..";
import { CommentsTH } from "../../constants";
import { errorType, IFetchComments } from "../../constants/interfaces";
import { toastify } from "../../utils";

const Comments = () => {
  const theme = useAppSelector(getTheme);
  const { data, isLoading, isSuccess, isError, refetch } = useFetchCommentsQuery('fetchComments');
  const [destroyComment] = useDeleteCommentMutation();

  const deleteComment = async (id: string) => {
    const { error } = await destroyComment(id);
    const err = error as errorType | undefined;

    if (err) {
      switch (err.originalStatus) {
        case 400:
        case 500:
          toastify("Something went wrong. Try once again !!!", 0);
          break;
        case 200:
          await refetch();
          toastify("Comment deleted successfully !!!", 1);
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
        <NotAvailable tabName="comments" />
      )}

      {!isError && data && data.length > 0 && (
        <div className={`${theme === "light" ? "table-container-lite" : "table-container-dark"} shadow-lg sm:w-fit w-full max-sm:px-3.5 max-h-[560px] sm:mx-auto overflow-y-auto overflow-x-auto`}>
          <table className="lg-md:w-[770px] md:w-[720px] sm:w-[600px] w-[700px] max-h-full bg-lite-1 text-dark-0 dark:text-lite-2 dark:bg-dark-0.5">
            <thead className="sticky top-0 max-md:text-sm max-xs:text-xs bg-lite-1.5 text-dark-0 dark:bg-dark-6 dark:text-dark-3">
              <tr>
                {CommentsTH.map(th => (
                  <th key={th.id} className={th.className}>
                    {th.data}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((comment: IFetchComments) => (
                <TableRow key={comment._id} comment={comment} deleteComment={deleteComment} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default Comments;
