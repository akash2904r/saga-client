import moment from "moment";
import { Link } from "react-router-dom";
import { NavigateFunction } from 'react-router-dom';
import { DeleteFilled, EditFilled } from "@ant-design/icons";

import { IPostTableRowProps } from "../../constants/interfaces";

const PostTableRow = ({ post, deletePost, navigate }: { post: IPostTableRowProps, deletePost: (id: string) => Promise<void>, navigate: NavigateFunction }) => {
    return (
        <tr className="text-sm">
            <td className="w-[15%] text-center">{moment(post.updatedAt).format('DD/MM/YYYY')}</td>
            <td className="w-[20%] py-2">
                <Link to={`/portal/posts/${post._id}`}>
                    <img 
                        src={post.image.url} 
                        alt={post.title} 
                        className="h-12 w-28 mx-auto max-md:h-10 max-md:w-24" 
                    />
                </Link>
            </td>
            <td className="w-[30%] text-center">{post.title}</td>
            <td className="w-[15%] text-center">{post.category}</td>
            <td className="w-[10%] text-center">
                <button 
                    className="text-dark-2 hover:text-dark-0 dark:text-lite-2 dark:hover:text-white"
                    onClick={() => navigate(`/portal/posts/update-post/${post._id}`)}
                >
                    <EditFilled className="text-xl" />
                </button>
            </td>
            <td className="w-[10%] text-center">
                <button 
                    className="text-red-500 hover:text-red-600"
                    onClick={() => deletePost(post._id)}
                >
                    <DeleteFilled className="text-xl" />
                </button>
            </td>
        </tr>
    );
};

export default PostTableRow;
