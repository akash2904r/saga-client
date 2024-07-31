import { BrowserRouter ,Routes, Route } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

import { useAppSelector } from "./app/hooks";
import { getTheme } from "./features/themeSlice";

import IsAdmin from "./components/IsAdmin";
import ShowAuth from "./components/ShowAuth";
import IsAuthenticated from "./components/IsAuthenticated";
import { 
  Auth, 
  Home, 
  Portal, 
  Navbar, 
  Search,
  NotFound, 
  CreatePost, 
  UpdatePost, 
  PostDetails,
} from "./components";

const App = () => {
  const theme = useAppSelector(getTheme);

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portal/posts/:postId" element={<PostDetails />} />
          <Route path="/search" element={<Search />} />

          <Route element={<ShowAuth />}>
            <Route path="/auth" element={<Auth />} />
          </Route>
          
          <Route element={<IsAuthenticated />}>
            <Route path="/portal" element={<Portal />} />

            <Route element={<IsAdmin />}>
              <Route path="/portal/posts/create-post" element={<CreatePost />} />
              <Route path="/portal/posts/update-post/:postId" element={<UpdatePost />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer autoClose={1750} transition={Zoom} theme={theme === "light" ? "light" : "dark"} pauseOnHover={false} className="text-[15px]" />
      </BrowserRouter>
    </>
  );
};

export default App;
