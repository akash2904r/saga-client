import moment from "moment";
import { DeleteFilled } from "@ant-design/icons";

import { IFetchComments } from "../../constants/interfaces";

const CommentTableRow = ({ comment, deleteComment }: { comment: IFetchComments, deleteComment: (id: string) => Promise<void> }) => {
    return (
        <tr className="text-[13px] max-sm:text-sm">
            <td className="w-[13%] text-center">{moment(comment.updatedAt).format('DD/MM/YYYY')}</td>
            <td className="w-[27%] text-center break-all py-3">{comment.comment}</td>
            <td className="w-[20%] text-center break-all">{comment.commentedOn}</td>
            <td className="w-[20%] text-center break-all">{comment.commentedBy}</td>
            <td className="w-[10%] text-center">{comment.likes}</td>
            <td className="w-[10%] text-center">
                <button 
                    className="text-red-500 hover:text-red-600"
                    onClick={() => deleteComment(comment._id)}
                >
                    <DeleteFilled className="text-xl" />
                </button>
            </td>
        </tr>
    );
};

export default CommentTableRow;