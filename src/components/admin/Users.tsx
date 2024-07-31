import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTheme } from "../../features/themeSlice";
import { getUser, setUser } from "../../features/userSlice";
import { useDeleteMutation } from "../../features/authApiSlice";
import { useFetchUsersQuery, useDeleteUserMutation } from "../../features/userApiSlice";

import TableRow from "./UserTableRow";
import { Loader } from "..";
import { toastify } from "../../utils";
import { UsersTH } from "../../constants";
import { errorType, IUserTableRowProps } from "../../constants/interfaces";

const Users = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getTheme);
  const user = useAppSelector(getUser);
  const { data, isLoading, isError, refetch } = useFetchUsersQuery('fetchUsers');
  const [deleteuser] = useDeleteUserMutation();
  const [deleteCurrUser] = useDeleteMutation();

  const navigate = useNavigate();

  const deleteUser = async (id: string) => {
    if (id === user?._id) {
      const { error } = await deleteCurrUser(id);
      const err = error as errorType | undefined;

      if (err?.originalStatus === 204) {
        dispatch(setUser(null));
        navigate("/auth");
      }

      return;
    }

    const { error } = await deleteuser(id);
    const err = error as errorType | undefined;

    if (err) {
      switch (err.originalStatus) {
        case 400:
        case 404:
          toastify("Something went wrong. Try once again !!!", 0);
          break;
        case 200:
          await refetch();
          toastify("User deleted successfully !!!", 1);
          break;
      }
    }
  };

  if (isLoading) return (
    <main className="w-full h-96">
      <Loader />
    </main>
  );

  return (
    <main className="w-full my-2.5 overflow-hidden">
      <div className={`${theme === "light" ? "table-container-lite" : "table-container-dark"} shadow-lg sm:w-fit w-full max-sm:px-3.5 max-h-[560px] sm:mx-auto overflow-y-auto overflow-x-auto`}>
        <table className="lg-md:w-[770px] md:w-[720px] sm:w-[600px] w-[700px] max-h-full bg-lite-1 text-dark-0 dark:text-lite-2 dark:bg-dark-0.5">
          <thead className="sticky top-0 max-md:text-sm max-xs:text-xs bg-lite-1.5 text-dark-0 dark:bg-dark-6 dark:text-dark-3">
            <tr>
              {UsersTH.map(th => (
                <th key={th.id} className={th.className}>
                  {th.data}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {!isLoading && !isError && data && (
              data.map((user: IUserTableRowProps) => (
                <TableRow key={user._id} user={user} deleteUser={deleteUser} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Users;
