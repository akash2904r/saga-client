import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import { getUser } from "../features/userSlice";
import { useAddCommentMutation } from "../features/commentApiSlice";
import { useFetchPostCommentsQuery } from "../features/commentApiSlice";

import CommentBlock from "./CommentBlock";
import { toastify } from "../utils";
import { errorType, IComment, IFetchedComment } from "../constants/interfaces";

const CommentSection = ({ postId }: { postId: string }) => {
  const maxCommentLength = 200;
  const [comment, setComment] = useState("");

  const user = useAppSelector(getUser);
  const { data: comments, refetch } = useFetchPostCommentsQuery({ id: user?._id as string, postId }, { skip: !user });
  const [addComment] = useAddCommentMutation();

  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const currVal = e.target.value.substring(comment.length, e.target.value.length);

    if ((comment + currVal).length <= maxCommentLength) {
      setComment(e.target.value);
    } else {
      setComment((comment + currVal).substring(0, 200));
    }
  }

  const submitComment = async () => {
    if (comment === "") {
      toastify("No comment content", 0);
      return;
    }

    const formData: IComment = {
      comment,
      commentedBy: user?._id as string,
      commentedOn: postId
    };

    const { error } = await addComment(formData);
    const err = error as errorType | undefined;

    switch ((err as errorType).originalStatus) {
      case 401:
        toastify("Unauthorized User !!!", 0);
        break;
      case 404:
        toastify("Post not found !!!", 0);
        break;
      case 500:
        toastify("Something went wrong. Try again !!!", 0);
        break;
      case 200:
        refetch();
        toastify("Comment posted successfully !!!", 1);
        setComment("");
        break;
    }
  }

  return (
    <div className="md:w-[675px] w-[92%] mb-10">
      {user ? (
        <span className="flex items-center gap-2 text-[15px] dark:text-lite-2">
          <span>Signed in as: </span>
          <img 
            src={user?.avatar} 
            alt={user?.name}
            className="h-6 w-6 rounded-full" 
          />
          <Link to={'/portal?tab=profile'}>
            <span className="text-blue-500 hover:underline">@{user?.name}</span>
          </Link>
        </span>
      ) : (
        <>
          <span className="text-[15px] text-dark-0 dark:text-lite-1">You need to login inorder to comment. </span>
          <Link to={'/auth'} className="text-[15px] text-blue-500 hover:underline">Login</Link>
        </>
      )}

      {user && (
        <div className="p-3 my-5 border border-dark-0 rounded-lg dark:border-blue-400">
          <textarea 
            rows={3} 
            placeholder="Add a comment..."
            value={comment}
            onChange={handleComment}
            className="w-full px-2 py-1.5 resize-none outline outline-1 outline-dark-3 rounded-[5px] text-[15px] focus:outline-dark-1 dark:bg-dark-2 dark:outline-dark-3 dark:placeholder:text-lite-2/70 dark:text-lite-1 dark:focus:outline-sky-300" 
          />
          <div className="flex items-center justify-between mt-3">
            <p className="text-sm text-dark-3">{maxCommentLength - comment.length} characters remaining</p>
            <button 
              type="submit" 
              className="h-fit bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 rounded-md"
              onClick={submitComment}
            >
              <div className="p-0.5 rounded-md">
                <div className="text-sm p-2 font-semibold bg-white rounded-md md:px-4 md:py-2 hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:bg-dark-0 dark:text-white">Submit</div>
              </div>
            </button>
          </div>
        </div>

        <div className="pt-3.5">
          <h5 className="flex items-center">
            <span className="text-dark-0 dark:text-lite-1.5">Comments&nbsp;</span>
            <span className="min-w-8 px-1 py-0.5 border border-dark-3 text-center text-dark-2 text-sm dark:text-lite-2">{!comments ? 0 : comments.length}</span>
          </h5>

          <ul className="px-2 py-4">
            {comments && comments.map((comment: IFetchedComment) => (
              <CommentBlock key={comment._id} comment={comment} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
