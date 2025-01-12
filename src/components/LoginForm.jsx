import { useState } from "react";
import logo from "../assets/img_login.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Login = ({ onLogin, isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white border border-black overflow-hidden md:h-3/4">
        {/* Kolom Kiri - Gambar */}
        <div className="flex-1 hidden md:flex items-center justify-center bg-gray-100 border-r border-black">
          <img
            src={logo}
            alt="Login Illustration"
            className="w-3/4 h-auto object-contain"
          />
        </div>

        {/* Kolom Kanan - Form Login */}
        <div className="flex-1 flex flex-col justify-center p-8">
          <div className="mb-10">
            <h1 className="text-xl font-bold text-gray-800 text-center">
              Login to Your Account
            </h1>
          </div>
          <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="text-sm w-full px-4 py-3 border text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="text-sm w-full px-4 py-3 border text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="text-sm w-full bg-black text-white py-3 hover:bg-gray-100 hover:border hover:border-black hover:text-black transition duration-300"
              disabled={isLoading}
            >
              Login
            </button>
          </form>

          <p className="text-gray-400 text-sm mt-6 text-center">
            Don{"'"}t have an account?{" "}
            <Link to="/register" className="text-gray-700 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default Login;
