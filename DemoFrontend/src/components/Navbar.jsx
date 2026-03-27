import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-xl font-bold text-indigo-600">MyApp</h1>

      <div className="flex gap-4">
        {!token ? (
          <>
            
          </>
        ) : (
          <>
            <Link to="/dashboard" className="text-gray-700">Dashboard</Link>
            <button onClick={logout} className="text-red-500">Logout</button>
          </>
        )}
      </div>
    </div>
  );
}