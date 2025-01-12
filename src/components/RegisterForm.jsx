import PropTypes from "prop-types";
import logo from "../assets/img_register.png";

const Register = ({
  username,
  email,
  password,
  role,
  handleChange,
  handleSubmit, // Pastikan handleSubmit diteruskan sebagai props
  isLoading, // Ensure this prop is passed
}) => {
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
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
            alt="Register Illustration"
            className="w-3/4 h-full object-contain"
          />
        </div>

        {/* Kolom Kanan - Form Register */}
        <div className="flex-1 flex flex-col justify-center p-8">
          <div className="mb-10">
            <h1 className="text-xl font-bold text-gray-800 text-center">
              Create Your Account
            </h1>
          </div>
          <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                className="text-sm w-full px-4 py-3 border text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
                required
              />
            </div>
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
                name="email"
                value={email}
                onChange={handleChange}
                className="text-sm w-full px-4 py-3 border text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
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
                name="password"
                value={password}
                onChange={handleChange}
                className="text-sm w-full px-4 py-3 border text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Role Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={handleChange}
                className="text-sm w-full px-4 py-3 border text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="text-sm w-full bg-black text-white py-3 hover:bg-gray-100 hover:border hover:border-black hover:text-black transition duration-300"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="text-gray-400 text-sm mt-6 text-center">
            Have an account? {""}
            <a href="/" className="text-gray-700 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
Register.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired, // handleSubmit prop is required
  isLoading: PropTypes.bool.isRequired,
};

export default Register;
