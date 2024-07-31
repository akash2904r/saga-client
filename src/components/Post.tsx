import { useNavigate } from "react-router-dom";

import { getPlainTextFromHTMLString } from "../utils";
import { IPostProps } from "../constants/interfaces";

const Post = ({ post, className }: { post: IPostProps, className?: string }) => {
    const navigate = useNavigate();

    return (
        <div className={`post ${className} w-60 h-72`}>
            <div className="post-img">
                <img 
                    src={post.image} 
                    alt={post.title}
                    className="h-28 w-full rounded-t-[10px]"
                />
            </div>
            <div className="post-content-box">
                <h1 className="post-title line-clamp-1">{post.title}</h1>
                <p className="post-content line-clamp-4">{getPlainTextFromHTMLString(post.content)}</p>
                <span 
                    className="read-article"
                    onClick={() => navigate(`/portal/posts/${post._id}`)}
                >Read article</span>
            </div>
            <div className="post-category">
                <span>{post.category.charAt(0).toUpperCase()}</span>
            </div>
        </div>
    );
};

export default Post;
