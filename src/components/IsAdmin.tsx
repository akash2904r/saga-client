import { Outlet, Navigate } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import { getUser } from "../features/userSlice";

const IsAdmin = () => {
    const user = useAppSelector(getUser);

    return (
        user?.isAdmin 
            ? <Outlet /> 
            : <Navigate to="/" replace />
    );
};

export default IsAdmin;
