import { getPlainTextFromHTMLString } from "../../utils";

interface ITableDataProps {
    title: string,
    imgSrc?: string,
    imgAlt?: string,
    primaryData?: string | number,
    secondaryData?: string,
    className: string,
    second?: boolean,
};

const TableData = ({ title, imgSrc, imgAlt, primaryData, secondaryData, className, second = false }: ITableDataProps) => {

    if (second) {
        return (
            <td className={`${className} text-center p-1.5 ${title === "posts" && "pb-3"} text-dark-0 dark:text-lite-2`}>
                {title !== "posts" ? primaryData : (
                    <>
                        <h5 className="font-bold pb-1.5 line-clamp-1">{primaryData}</h5>
                        <p className="line-clamp-2 text-start text-sm">{getPlainTextFromHTMLString(secondaryData as string)}</p>
                    </>
                )}
            </td>
        );
    }

    return (
        <td className={`${title !== "comments" ? "py-1.5" : "h-12"} flex justify-center items-center ${className}`}>
            {title === "users" ? (
                <img 
                    src={imgSrc} 
                    alt={imgAlt} 
                    className="h-9 w-9 rounded-full"
                />
            ) : title === "comments" ? (
                <div className={`max-h-full ${(primaryData as string).length >= 70 && "text-sm"} text-center break-all line-clamp-2 text-dark-0 dark:text-lite-2`}>{primaryData}</div>
            ) : (
                <img 
                    src={imgSrc}
                    alt={imgAlt}
                    className="h-[70px] rounded-md" 
                />
            )}
        </td>
    );
};

export default TableData;
