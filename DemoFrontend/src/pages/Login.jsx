import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
    const [loading, setLoading] = useState(false);


  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  //  REGEX
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //  VALIDATION FUNCTION
  const validate = (data) => {
    let newErrors = {};

    if (!data.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(data.email))
      newErrors.email = "Invalid email format";

    if (!data.password) newErrors.password = "Password is required";
    else if (data.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    return newErrors;
  };

  //  REAL-TIME CHANGE
  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    setErrors(validate(updated));
  };

  //  SUBMIT
  const handleLogin = async () => {
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
  toast.error("Please fill all fields correctly");
  return;
}

    try {
      setLoading(true);
      const res = await loginUser(form);

      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("user", JSON.stringify(res?.data?.user));

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-500 px-4">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* EMAIL */}
        <input
          className={`w-full p-3 border rounded mb-1 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Email"
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <p className="text-red-500 text-sm mb-3">{errors.email}</p>

        {/* PASSWORD */}
        <div className="relative mb-1">
          <input
            type={showPassword ? "text" : "password"}
            className={`w-full p-3 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Password"
            onChange={(e) =>
              handleChange("password", e.target.value)
            }
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-xl"
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        <p className="text-red-500 text-sm mb-4">{errors.password}</p>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
         disabled={loading}
        
  className={`w-full p-3 rounded text-white transition ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-purple-600 hover:bg-purple-700 active:scale-95"
  }`}
>
  {loading ? "Logining..." : "Login"}
        
        </button>
      </div>
    </div>
  );
}