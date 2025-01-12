import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/user.png";
import { getMe, logoutUser } from "../redux/slice/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null); // Ref untuk modal
  const avatarRef = useRef(null); // Ref untuk avatar

  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(getMe());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      avatarRef.current &&
      !modalRef.current.contains(event.target) &&
      !avatarRef.current.contains(event.target)
    ) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="flex justify-evenly items-center border-b border-black p-4">
        <div className="text-xl font-bold cursor-pointer">
          <h1 onClick={() => navigate("/home")}>Prenews</h1>
        </div>
        <div></div>
        <div>
          <div className="flex space-x-4">
            {isLoading ? (
              <span>Loading...</span>
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : user ? (
              <>
                <div
                  ref={avatarRef} // Ref untuk avatar
                  className="flex items-center space-x-4 cursor-pointer relative"
                  onClick={() => setShowModal(!showModal)}
                >
                  <img
                    src={user?.avatar || defaultAvatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold text-gray-800">
                    {user?.username}
                  </span>
                </div>
                {showModal && (
                  <div
                    ref={modalRef} // Ref untuk modal
                    className="absolute top-14 p-4 -translate-x-20 bg-white border border-black shadow z-10 text-xs"
                  >
                    <ul className="py-2">
                      {user?.role === "admin" && (
                        <li
                          className="border border-gray-400 text-black hover:bg-black hover:text-white transition duration-300 px-4 py-2 cursor-pointer mb-5"
                          onClick={() => navigate("/admin")}
                        >
                          Admin Control
                        </li>
                      )}
                      <li
                        className="border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition duration-300 px-4 py-2 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate("/")}
                className="text-sm px-4 py-2 bg-black text-white hover:bg-gray-100 hover:border hover:border-black hover:text-black transition duration-300"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
