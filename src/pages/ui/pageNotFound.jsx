import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 px-6 text-center">
      <h1 className="text-7xl font-bold mb-4 text-blue-600">404</h1>
      <p className="text-lg mb-6 text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="btn-primary px-6 py-3 rounded-lg text-white text-base font-semibold shadow hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
