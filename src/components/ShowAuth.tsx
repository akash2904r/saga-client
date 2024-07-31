import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import { getUser } from "../features/userSlice";

const ShowAuth = () => {
    const user = useAppSelector(getUser);

    return (
        !user
            ? <Outlet />
            : <Navigate to="/" />
    );
};

export default ShowAuth;
