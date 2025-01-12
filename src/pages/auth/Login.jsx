import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slice/authSlice";
import Login from "../../components/LoginForm.jsx";
import { toast } from "react-hot-toast"; // Import toast
import { Link } from "react-router-dom"; // Import Link

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  // Handle login submission
  const handleLogin = (loginData) => {
    dispatch(loginUser(loginData))
      .unwrap() // Unwrap the promise to handle success/failure
      .then(() => {
        toast.success("Login successful!");
      })
      .catch((err) => {
        toast.error(err || "Login failed!");
      });
  };

  return (
    <div>
      <Login onLogin={handleLogin} isLoading={isLoading} error={error} />
      {/* Redirect to /home using Link after login is successful */}
      <Link to="/home" className="text-blue-500 hover:underline">
        Go to Home
      </Link>
    </div>
  );
};

export default LoginPage;
