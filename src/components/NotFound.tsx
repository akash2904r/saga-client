import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="w-full h-56 flex flex-col gap-5 justify-end items-center">
      <h1 className="text-5xl font-bold dark:text-lite-1">Page Not Found !!!</h1>
      <Link to="/" replace className="text-blue-600 hover:underline">Go back to Home Page</Link>
    </main>
  );
};

export default NotFound;
