import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      setMessage(response.data.message);

      // Save token if backend sends token
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Clear form
      setFormData({
        email: "",
        password: "",
      });

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Invalid Credentials"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        {message && (
          <p className="text-center mb-4 text-blue-600">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

        </form>

        {/* Signup Link */}
        <p className="text-center mt-5 text-gray-600">
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