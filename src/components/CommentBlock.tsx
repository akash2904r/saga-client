import moment from "moment";
import { useState } from "react";
import { LikeFilled, LikeOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";

import { useAppSelector } from "../app/hooks";
import { getUser } from "../features/userSlice";
import { useDeleteCommentMutation, useEditCommentMutation, useLikeACommentMutation } from "../features/commentApiSlice";

import { defaultImgSrc } from "../constants";
import { errorType, IFetchedComment } from "../constants/interfaces";

const CommentBlock = ({ comment }: { comment: IFetchedComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.comment);

  const user = useAppSelector(getUser);
  const [likeComment] = useLikeACommentMutation();
  const [updateComment] = useEditCommentMutation();
  const [destroyComment] = useDeleteCommentMutation();

  const Likes = () => {
    const length = comment.totalLikes;

    return (
      <>
        {!user
            ? <LikeOutlined className="text-dark-3" /> 
            : comment.hasLiked 
                ? <LikeFilled className="text-blue-600" /> 
                : <LikeOutlined className="text-blue-600" />
        }
  
        <span className={`text-xs ${!user ? "text-dark-3" : "text-blue-600"}`}>
          &nbsp;&nbsp;
          {!user
              ? length === 1 
                  ? "1 Like" 
                  : length > 1 && `${length} Likes`
              : comment.hasLiked
                  ? length === 1 
                      ? "You have liked" 
                      : length === 2 
                          ? `You and ${length - 1} other liked`
                          : `You and ${length - 1} others liked`
                  : length === 1
                      ? "1 Like"
                      : length > 1 && `${length} Likes`
          }
        </span>
      </>
    );
  };

  const likeOrUnlike = async () => await likeComment({ id: user?._id as string, commentId: comment._id });

  const editComment = async () => {
    const { error } = await updateComment({ id: comment._id, content });
    const err = error as errorType | undefined;

    if ((err as errorType).originalStatus === 200) {
      setIsEditing(false);
    }
  }

  const deleteComment = async () => await destroyComment(comment._id);

  return (
    <li className="px-1.5 py-3.5 border-b-2 border-lite-2.5 dark:border-lite-3">
      <div className="flex gap-2">
        <img 
          src={comment.commentedBy.avatar || defaultImgSrc} 
          alt={comment.commentedBy.username || "Default Image"}
          className="h-12 w-12 rounded-full"
        />
        <div className="w-full">
          <span className="flex items-center gap-3 text-[13px]">
            <span className="font-semibold text-dark-0 dark:text-lite-1">@{comment.commentedBy.username}</span>
            <span className="text-dark-2 dark:text-dark-3">{moment(comment.createdAt).fromNow()}</span>
          </span>

          {!isEditing ? (
            <p className="text-sm text-dark-1 break-all dark:text-lite-1.5/50">{comment.comment}</p>
          ) : (
            <textarea 
              rows={3} 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mt-1 px-2 py-1.5 resize-none outline outline-1 outline-dark-3 rounded-[5px] text-sm focus:outline-dark-1 dark:bg-dark-2 dark:outline-dark-3 dark:placeholder:text-lite-2/70 dark:text-lite-1 dark:focus:outline-sky-300" 
            />
          )}

          {!isEditing ? (
            <div className="mt-1 flex justify-between items-center">
              <span className="cursor-pointer" onClick={likeOrUnlike}>
                <Likes />
              </span>
              {comment.isCommentator && (
                <span className="flex gap-5">
                  <EditFilled 
                    className="text-dark-2 hover:text-dark-0 cursor-pointer dark:text-dark-3 dark:hover:text-lite-1.5"
                    onClick={() => setIsEditing(true)}
                  />
                  <DeleteFilled 
                    className="text-red-600 hover:text-red-700 cursor-pointer" 
                    onClick={deleteComment}
                  />
                </span>
              )}
            </div>  
          ) : (
            <div className="mt-1 flex gap-3 justify-end">
              <button 
                type="submit" 
                className="h-fit bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 rounded-md"
                onClick={editComment}
              >
                <div className="p-0.5 rounded-md">
                  <div className="text-sm px-1.5 py-1 font-semibold bg-white rounded-md md:px-2 md:py-1 hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:bg-dark-0 dark:text-white">Save</div>
                </div>
              </button>
              <button 
                className="text-sm font-semibold bg-lite-2/70 hover:bg-lite-2 px-2 py-1 border-2 border-lite-2/70 rounded-md dark:bg-dark-1.5 dark:text-lite-1 dark:hover:bg-dark-1.5/60 dark:border-dark-1.5"
                onClick={() => {
                  setIsEditing(false);
                  setContent(comment.comment);
                }}
              >Cancel</button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default CommentBlock;
