import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slice/authSlice.jsx";
import { useNavigate } from "react-router-dom";
import Register from "../../components/RegisterForm.jsx";
import { toast } from "react-hot-toast";

const ParentComponent = () => {
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Default role
  });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setIsLoading(true);

    console.log("Form Data:", formData); // Log the data before sending

    // Validate form data
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await dispatch(registerUser(formData));
      if (response.type === "auth/registerUser/fulfilled") {
        toast.success("Registration successful!");
        navigate("/");
      } else {
        toast.error(response.payload || "Registration failed!");
      }
    } catch (error) {
      toast.error(error.message || "Registration failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Register
      handleSubmit={handleSubmit} // Ensure handleSubmit is passed here
      username={formData.username}
      email={formData.email}
      password={formData.password}
      role={formData.role}
      handleChange={handleChange}
      isLoading={isLoading}
    />
  );
};

export default ParentComponent;
