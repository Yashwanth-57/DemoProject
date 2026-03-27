import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // REGEX
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    
    const nameRegex = /^[A-Za-z\s]{2,30}$/;

// ^        → start of string
// [A-Za-z\s] → only letters and spaces allowed
// {2,30}   → min 2 chars, max 30 chars
// $        → end of string


  // VALIDATE
  const validate = (data) => {
    let newErrors = {};


  // NAME VALIDATION
  if (!data.name?.trim()) {
    newErrors.name = "Name is required";
  } else if (!nameRegex.test(data.name.trim())) {
    newErrors.name =
      "Name should be 2-30 letters only (no numbers or special chars)";
  }

    if (!data.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(data.password)) {
      newErrors.password =
        "Min 6 chars, 1 Upper, 1 Lower, 1 Number, 1 Special";
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (
      data.password &&
      data.password !== data.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // HANDLE CHANGE
  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);

    setTouched((prev) => ({ ...prev, [field]: true }));

    const newErrors = validate(updated);
    setErrors(newErrors);
  };

  // PASSWORD STRENGTH
  const getStrength = () => {
    if (!form.password) return "";
    if (!passwordRegex.test(form.password)) return "Weak";
    if (form.password.length < 10) return "Medium";
    return "Strong";
  };
const handleRegister = async () => {
  const validationErrors = validate(form);
  setErrors(validationErrors);

  setTouched({
    name: true,
    email: true,
    password: true,
    confirmPassword: true,
  });

  if (Object.keys(validationErrors).length > 0) return;

  try {
    setLoading(true);

    await registerUser(form);
    toast.success("Registered successfully 🎉");
    navigate("/login");
  } catch (err) {
    toast.error(err.response?.data?.message || "Error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-500 px-4">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        {/* NAME */}
        <input
          name="name"
          autoComplete="name"
          value={form.name}
          className="w-full p-3 border rounded mb-1"
          placeholder="Name"
          onChange={(e) =>
            handleChange("name", e.target.value)
          }
        />
        {touched.name && errors.name && (
          <p className="text-red-500 text-sm mb-3">
            {errors.name}
          </p>
        )}

        {/* EMAIL */}
        <input
          name="email"
          autoComplete="email"
          value={form.email}
          className="w-full p-3 border rounded mb-1"
          placeholder="Email"
          onChange={(e) =>
            handleChange("email", e.target.value)
          }
        />
        {touched.email && errors.email && (
          <p className="text-red-500 text-sm mb-3">
            {errors.email}
          </p>
        )}

        {/* PASSWORD */}
        <div className="relative mb-1">
          <input
            name="password"
            autoComplete="new-password"
            value={form.password}
            type={showPassword ? "text" : "password"}
            className="w-full p-3 border rounded"
            placeholder="Password"
            onChange={(e) =>
              handleChange("password", e.target.value)
            }
          />
          <span
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-3 top-3 cursor-pointer select-none"
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        {touched.password && errors.password && (
          <p className="text-red-500 text-sm mb-2">
            {errors.password}
          </p>
        )}

        {/* STRENGTH */}
        {form.password && (
          <p
            className={`text-sm mb-3 ${
              getStrength() === "Weak"
                ? "text-red-500"
                : getStrength() === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            Strength: {getStrength()}
          </p>
        )}

        {/* CONFIRM PASSWORD */}
        <div className="relative mb-1">
          <input
            name="confirmPassword"
            autoComplete="new-password"
            value={form.confirmPassword}
            type={showConfirm ? "text" : "password"}
            className="w-full p-3 border rounded"
            placeholder="Confirm Password"
            onChange={(e) =>
              handleChange(
                "confirmPassword",
                e.target.value
              )
            }
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-3 cursor-pointer select-none"
          >
            {showConfirm ? "🙈" : "👁"}
          </span>
        </div>

        {touched.confirmPassword &&
          errors.confirmPassword && (
            <p className="text-red-500 text-sm mb-4">
              {errors.confirmPassword}
            </p>
          )}

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full p-3 rounded text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 active:scale-95"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
}