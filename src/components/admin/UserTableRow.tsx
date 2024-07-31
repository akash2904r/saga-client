import moment from "moment";
import { DeleteFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { IUserTableRowProps } from "../../constants/interfaces";
import { defaultImgSrc } from "../../constants";

const UserTableRow = ({ user, deleteUser }: { user: IUserTableRowProps, deleteUser: (id: string) => Promise<void> }) => {
    return (
        <tr className="text-sm">
            <td className="w-[15%] text-center">{moment(user.createdAt).format('DD/MM/YYYY')}</td>
            <td className="md:w-[15%] sm:w-[10%] py-2">
                <img 
                    src={user?.avatar?.url ? user.avatar.url : defaultImgSrc} 
                    alt={user.username ? user.username : "Default image"} 
                    className="h-9 w-9 rounded-full mx-auto max-sm:h-8 max-sm:w-8" 
                />
            </td>
            <td className="w-[20%] text-center">{user.username}</td>
            <td className="md:w-[30%] sm:w-[35%] text-center">{user.email}</td>
            <td className="w-[10%] text-center">
                {user.isAdmin 
                    ? <CheckOutlined className="text-green-600 text-lg" /> 
                    : <CloseOutlined className="text-red-600 text-lg" />
                }
            </td>
            <td 
                className="w-[10%] text-center"
                onClick={() => deleteUser(user._id)}
            >
                <button className="text-red-500 hover:text-red-600">
                    <DeleteFilled className="text-xl" />
                </button>
            </td>
        </tr>
    );
};

export default UserTableRow;
