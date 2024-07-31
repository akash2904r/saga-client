import { useState, useEffect } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { getUser, setUser } from "../features/userSlice";
import { useRefreshMutation } from "../features/authApiSlice";

const IsAuthenticated = () => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    const user = useAppSelector(getUser);
    const dispatch = useAppDispatch();
    const [refresh] = useRefreshMutation();

    async function refreshing() {
        try {
            setIsLoading(true);
            const { data, error } = await refresh();

            if (error) {
                const err = error as FetchBaseQueryError & { originalStatus?: number };
                
                if (err.originalStatus || !user?.accessToken) dispatch(setUser(null));
            } else {
                dispatch(setUser({ ...data }));
            }
        } catch (error) {
            console.log("Error occured while refreshing the token: ", error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!user?.accessToken && user?.email) {
            (async () => await refreshing())();
        } else {
            setIsLoading(false);
        }
    }, [user?.accessToken]);

    if (isLoading) return <p className="text-white">Loading...</p>

    return (
        user?.accessToken 
            ? <Outlet /> 
            : <Navigate to="/auth" state={{ from: location }} replace />
    );
};

export default IsAuthenticated;