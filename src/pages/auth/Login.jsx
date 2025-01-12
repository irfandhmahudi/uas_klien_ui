import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slice/authSlice";
import Login from "../../components/LoginForm.jsx";
import { toast } from "react-hot-toast"; // Import toast

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  // Handle login submission
  const handleLogin = (loginData) => {
    dispatch(loginUser(loginData))
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
        navigate("/home"); // Redirect to /home after successful login
      })
      .catch((err) => {
        toast.error(err || "Login failed!");
      });
  };

  return <Login onLogin={handleLogin} isLoading={isLoading} error={error} />;
};

export default LoginPage;
