import { useSearchParams } from "react-router-dom";

import { useSearchPostQuery } from "../features/postApiSlice";

import Post from "./Post";
import Loader from "./Loader";
import SearchSideBar from "./SearchSideBar";
import { IPostProps } from "../constants/interfaces";
import { rand } from "../utils";

const Search = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('for');
    const sort = searchParams.get('sort');
    const category = searchParams.get('category');

    const searchQuery = {
        term: !searchTerm ? "__NO_TERM__" : searchTerm,
        sort: !sort ? "latest" : sort,
        category: !category ? "__UNCATEGORIZED__" : category
    };

    const { data: posts, isLoading, isError, isSuccess } = useSearchPostQuery(searchQuery);

    return (
        <main className="min-h-[calc(100vh-56px)] h-fit max-md:min-h-[calc(100vh-52px)] flex">
            <SearchSideBar
                searchTerm={!searchTerm ? "" : searchTerm}
                sortOrder={!sort ? "latest" : sort}
                category={!category ? "" : category}
            />

            <section className="w-[calc(100%-288px)] max-sm:w-full">
                <h1 className="py-2 px-5 text-[28px] font-bold border-b-[1px] border-lite-2 text-dark-0 dark:border-gray-500 dark:text-lite-1">Search Results: </h1>

                {isLoading && (
                    <div className="h-full w-full flex items-center justify-center">
                        <Loader />
                    </div>
                )}

                {isSuccess && posts && posts.length === 0 && (
                    <p className="px-6 py-5 text-[22px] text-dark-3">No Posts Found...</p>
                )}

                {!isError && posts && posts.length > 0 && (
                    <ul className="px-10 py-8 flex flex-wrap max-sm:justify-center gap-8">
                        {posts.map((post: IPostProps) => (
                            <Post key={post._id} post={post} className={rand()} />
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
};

export default Search;
