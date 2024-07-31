import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlignLeftOutlined, CloseOutlined } from "@ant-design/icons";

import { ISearchSidebarProps } from "../constants/interfaces";

const SearchSideBar = ({ searchTerm, sortOrder, category }: ISearchSidebarProps) => {
    const initialSearchForm = {
        term: (!searchTerm || searchTerm === "NIL" || searchTerm === "@all") ? "" : searchTerm,
        sort: !sortOrder ? "latest" : sortOrder,
        category: category === "NIL" ? "" : category
    };

    const navigate = useNavigate();
    const [search, setSearch] = useState(initialSearchForm);
    const [showHamburger, setShowHamburger] = useState(true);

    const applyFilters = () => {
        if ((search.term === "" && search.category === "") || 
            (searchTerm === search.term && sortOrder === sortOrder && category === search.category)) {
                return;
        }

        const proxy1 = search.term === "" ? "NIL" : search.term.trim();
        const proxy2 = search.category === "" ? "NIL" : search.category;

        navigate(`/search?for=${proxy1}&sort=${search.sort}&category=${proxy2}`);
        setShowHamburger(true);
    };

    return (
        <>
            <section className={`w-72 min-h-full max-sm:h-full px-3.5 py-10 max-sm:fixed transition-transform duration-700 ${showHamburger ? "max-sm:-translate-x-96" : "max-sm:translate-x-0"} z-10 flex flex-col gap-10 border-r-[1px] bg-white dark:bg-dark-9 border-lite-2 dark:border-gray-500`}>
                <div className="flex items-center gap-3">
                    <label className="min-w-fit text-[17px]  font-semibold text-dark-1 dark:text-lite-2">Search Term : </label>
                    <input 
                        type="text"
                        name="search"
                        placeholder="Search For ..."
                        value={search.term}
                        onChange={(e) => setSearch({ ...search, term: e.target.value })}
                        autoFocus
                        className="w-full text-[15px] bg-lite-1 outline outline-1 outline-lite-2 px-2 py-1.5 rounded-[3px] dark:bg-dark-2 dark:outline-dark-3 dark:placeholder:text-lite-2/70 dark:text-lite-2 focus:outline-lite-3 dark:focus:outline-sky-300"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <label className="text-[17px] font-semibold text-dark-1 dark:text-lite-2">Sort : </label>
                    <select 
                        name="sort"
                        className="outline outline-1 outline-lite-2 bg-lite-1 rounded-[3px] text-[15px] px-1.5 py-1.5 dark:bg-dark-2 dark:outline-dark-3 dark:text-lite-2"
                        onChange={(e) => setSearch({ ...search, sort: e.target.value })}
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
                <div className="flex items-center gap-3">
                    <label className="text-[17px] font-semibold text-dark-1 dark:text-lite-2">Category : </label>
                    <select 
                        name="category" 
                        className="outline outline-1 outline-lite-2 bg-lite-1 rounded-[3px] text-[15px] px-1.5 py-1.5 dark:bg-dark-2 dark:outline-dark-3 dark:text-lite-2"
                        onChange={(e) => setSearch({ ...search, category: e.target.value })}
                    >
                        <option hidden>Select</option>
                        <option value="nature">Nature</option>
                        <option value="science">Science</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <button 
                    className="h-fit bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-3xl"
                    onClick={applyFilters}
                >
                    <div className="p-0.5 rounded-3xl">
                        <div className="text-sm font-semibold p-2 bg-white rounded-3xl hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:bg-dark-9 dark:text-white">Apply Filters</div>
                    </div>
                </button>
            </section>

            <span 
                className={`sm:hidden max-sm:absolute max-sm:translate-y-3 max-sm:translate-x-[88vw] bg-white dark:bg-dark-9 h-fit px-2.5 py-1.5 rounded-full cursor-pointer text-dark-0 hover:bg-gray-200 dark:text-lite-1.5 dark:hover:text-lite-1 dark:hover:bg-dark-2`}
                onClick={() => setShowHamburger(prev => !prev)}
            >
                {showHamburger 
                    ? <AlignLeftOutlined /> 
                    : <CloseOutlined />
                }
            </span>
        </>
    );
};

export default SearchSideBar;
