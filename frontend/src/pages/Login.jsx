import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Remove old message while typing
    setMessage("");
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // Success UI
      setSuccess(true);
      setMessage(response.data.message || "Login Successful");

      // Save token
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Redirect after 1 second
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {

      // Error UI
      setSuccess(false);

      setMessage(
        error.response?.data?.message || "Invalid Credentials"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to continue
        </p>

        {/* Message UI */}
        {message && (
          <div
            className={`mb-5 p-3 rounded-lg text-center font-medium transition-all duration-300 ${
              success
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border p-3 rounded-xl outline-none transition-all ${
                message && !success
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              } focus:ring-2`}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full border p-3 rounded-xl outline-none transition-all pr-20 ${
                  message && !success
                    ? "border-red-400 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                } focus:ring-2`}
                required
              />

              {/* Show Password Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-blue-600 font-medium hover:text-blue-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-xl text-white font-semibold transition-all duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Signup Link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
        </p>

        <Link
          to="/signup"
          className="block text-center text-blue-600 font-semibold mt-2 hover:underline"
        >
          Create New Account
        </Link>

      </div>
    </div>
  );
};

export default Login;