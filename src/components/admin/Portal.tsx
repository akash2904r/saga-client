import { useSearchParams, Navigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { getUser } from "../../features/userSlice";

import Posts from "./Posts";
import { 
  SideBar, 
  Dashboard, 
  Profile, 
  Users,  
  Comments, 
  NotFound 
} from ".."

const Portal = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('tab');
  
  const user = useAppSelector(getUser);

  const renderJSX = (jsxElement: JSX.Element) => user?.isAdmin ? jsxElement : <Navigate to={'/portal?tab=profile'} />

  const renderQueryContent = () => {
    switch (query) {
      case 'dashboard': return renderJSX(<Dashboard />)
      case 'profile': return <Profile />
      case 'users': return renderJSX(<Users />)
      case 'posts': return renderJSX(<Posts />)
      case 'comments': return renderJSX(<Comments />)
      default: return <NotFound />
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-56px)] max-md:min-h-[calc(100vh-52px)]">
      {user?.isAdmin && <SideBar tab={query ? query : ""} />}

      {renderQueryContent()}
    </div>
  );
};

export default Portal;
