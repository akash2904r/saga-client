import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useFetchRecentPostsQuery } from "../features/postApiSlice";

import { color } from "../utils";
import { Loader, Post } from "./";
import { IPostProps } from "../constants/interfaces";

const Posts = () => {
    const navigate = useNavigate();

    const { data: posts, isLoading, isSuccess, isError, refetch } = useFetchRecentPostsQuery('fetchRecentPosts');

    useEffect(() => {
        refetch();
    }, [posts]);

    return (
        <section className="py-10 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold text-dark-2 dark:text-lite-1">Recent Posts</h1>

            {isLoading && (
                <Loader />
            )}  
            
            {isSuccess && posts && posts.length === 0 && (
                <span className="py-5 text-lg text-red-600 font-semibold">No Posts Available</span>
            )}
            
            {!isError && posts && posts.length > 0 && (
                <>
                    <ul className="max-w-[850px] flex justify-center gap-10 flex-wrap px-5 py-10">
                        {posts.map((post: IPostProps, i: number) => (
                            <Post key={post._id} post={post} className={color[i]} />
                        ))}
                    </ul>
                    <span 
                        className="text-lg text-blue-500 cursor-pointer hover:underline"
                        onClick={() => navigate("/search?for=@all&sort=latest&category=NIL")}
                    >View all posts</span>
                </>
            )}
        </section>
    );
};

export default Posts;
