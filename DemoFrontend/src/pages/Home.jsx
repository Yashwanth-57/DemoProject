import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to MyApp
        </h1>

        <p className="text-gray-600 mb-8 max-w-lg">
          Build modern full-stack apps with authentication and dashboards.
        </p>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-gray-200 px-6 py-3 rounded-lg"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}