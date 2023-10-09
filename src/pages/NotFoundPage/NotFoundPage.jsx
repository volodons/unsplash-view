import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
    <p className="text-xl mb-8">The page you're looking for does not exist.</p>
    <Link to="/" className="text-blue-500 hover:underline">
      Go back to home
    </Link>
  </div>
);

export default NotFoundPage;
