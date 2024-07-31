import moment from "moment";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useFetchPostQuery } from "../features/postApiSlice";

import Loader from "./Loader";
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { data: post, isLoading, isSuccess, isError, refetch } = useFetchPostQuery(postId as string);

  useEffect(() => {
    refetch();
  }, [post]);

  if (isLoading) return (
    <main className="w-full h-96">
      <Loader />
    </main>
  );
  
  return (
    <main className="w-full">
      {isError && (
        <p className="font-semibold text-3xl text-dark-0 dark:text-lite-1">Something went wrong. Please try again...</p>
      )}

      {isSuccess && !isError && post && (
        <>
          <article className="flex flex-col items-center py-10">
            <h1 className="mb-5 text-4xl text-dark-0 dark:text-lite-1">{post.title}</h1>
            <span 
              className="font-semibold text-xs px-2 py-1.5 mb-5 border rounded-l-full rounded-r-full cursor-pointer text-dark-3 border-dark-2/20 hover:text-dark-0 hover:bg-dark-2/10 dark:text-lite-2/70 dark:border-lite-2/40 dark:hover:bg-lite-2/40 dark:hover:text-lite-1"
              onClick={() => navigate(`/search?for=NIL&sort=latest&category=${post.category}`)}
            >{post.category}</span>
            <div className="px-3 my-5">
              <img 
                src={post.image} 
                alt={post.title} 
                className="max-h-[580px]" 
              />
            </div>
            <div className="md:w-[675px] w-[92%]">
              <div className="w-full flex justify-between text-sm text-dark-0 dark:text-lite-2">
                <span>Recently updated on: </span>
                <span>{moment(post.updatedAt).format('DD/MM/YYYY')}</span>
              </div>
              <div className="w-full mt-2 mb-3.5 border border-1 border-[#e5e7eb] dark:border-lite-2/50" />
              <div className="post-contents text-dark-0 dark:text-lite-1" dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
          </article>

          <section className="w-full flex justify-center py-10">
            <CommentSection postId={postId as string} />
          </section>
        </>
      )}
    </main>
  );
};

export default PostDetails;
