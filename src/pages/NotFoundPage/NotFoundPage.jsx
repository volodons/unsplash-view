import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-400 via-indigo-500 to-blue-500 text-white">
      <h1 className="text-6xl font-extrabold mb-4 text-center animate-bounce">
        Oops! <br /> Page Not Found
      </h1>
      <p className="text-lg mb-8 text-center animate-fadeIn">
        The page you are looking for might have been removed or doesn't exist.
      </p>
      <Link
        to="/"
        aria-label="Go back to Home"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
