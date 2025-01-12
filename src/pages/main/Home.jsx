import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar.jsx";
import { fetchDisasters } from "../../redux/slice/disasterSlice"; // import fetchDisasters dari slice
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const { id } = useParams(); // Fetch ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { disasters, isLoading, error } = useSelector(
    (state) => state.disasters
  );

  useEffect(() => {
    dispatch(fetchDisasters()); // Mengambil data bencana saat komponen dimuat
  }, [dispatch]);

  // Handling loading and error states
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">Failed to load disasters: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-28 px-56">
        <h1 className="text-3xl font-bold mb-10 text-gray-800">
          Welcome to Prenews
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {disasters?.map((disaster, index) => (
            <div key={index} className="overflow-hidden">
              <img
                // Tambahkan validasi untuk memastikan `images` tidak undefined dan memiliki elemen
                src={
                  disaster.images && disaster.images.length > 0
                    ? disaster.images[0].url
                    : "/placeholder.jpg"
                }
                alt={disaster.title || "No title"}
                className="w-full h-40 object-cover"
              />
              <div className="mt-4">
                <p className="text-xs mb-2">
                  {disaster.formattedDateWIB || "No Date Available"}
                </p>
                <p className="font-bold mb-2">
                  {disaster.type || "Unknown Type"} - (
                  {disaster.location || "Unknown Location"})
                </p>
                <p className="text-gray-600 text-sm">
                  {/* Menampilkan potongan deskripsi jika ada */}
                  {disaster.description
                    ? disaster.description.length > 100
                      ? disaster.description.substring(0, 150) + "..."
                      : disaster.description
                    : "No description available"}
                </p>
              </div>
              <div className="mt-4">
                <p
                  onClick={() => navigate(`/detail/${id}`)}
                  className="text-sm hover:underline cursor-pointer"
                >
                  Read More Information
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
