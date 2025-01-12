import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Import useParams for fetching the ID from URL
import Navbar from "../../components/Navbar";
import { fetchDisasterById } from "../../redux/slice/disasterSlice"; // import fetchDisasterById from slice
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale"; // Import the Indonesian locale

const DetailPage = () => {
  const { id } = useParams(); // Fetch ID from URL
  const dispatch = useDispatch();
  const { disaster, isLoading, error, disasters } = useSelector(
    (state) => state.disasters
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchDisasterById(id)); // Fetch disaster and other disasters
    }
  }, [dispatch, id]);

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
        <p className="text-red-500">Failed to load disaster: {error}</p>
      </div>
    );
  }

  const formattedDate = disaster?.date
    ? format(new Date(disaster.date), "EEEE, dd MMMM yyyy HH:mm", {
        locale: idLocale,
      }) // Use the renamed `idLocale`
    : "Date not available"; // Fallback message when the date is not available

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-28 px-56">
        <h1 className="text-3xl font-bold mb-8">Featured Artikel</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Disaster Details - Left Section */}
          <div className="md:col-span-2">
            <div className="overflow-hidden">
              <img
                // Image from the selected disaster
                src={disaster?.images && disaster.images[0]?.url}
                alt="Featured"
                className="w-full h-full object-cover"
              />
              <div className="mt-5">
                <div className="mb-5">
                  <p className="text-sm text-gray-500 ">
                    {disaster?.type} - ({disaster?.location})
                  </p>
                  <p className="text-sm text-gray-500 ">{formattedDate} WIB</p>
                </div>
                <h2 className="text-2xl font-bold mb-4">{disaster?.name}</h2>
                <p className="text-gray-700">{disaster?.description}</p>
              </div>
            </div>
          </div>

          {/* Other Disasters - Right Section */}
          <div className="flex flex-col gap-4">
            {disasters?.slice(0, 3).map((disasterItem, index) => (
              <div key={index} className="overflow-hidden">
                <img
                  src={disasterItem.images && disasterItem.images[0]?.url} // Make sure disasterItem has images
                  alt="Disaster"
                  className="w-full h-48 object-cover"
                />
                <div className="flex flex-col justify-between">
                  <p className="text-xs mb-2 font-medium mt-5">
                    {disasterItem.type} - ({disasterItem.location})
                  </p>
                  <p className="text-md font-semibold">{disasterItem.name}</p>
                  <p
                    onClick={
                      () =>
                        (window.location.href = `/detail/${disasterItem._id}`) // Updated to navigate using disasterItem._id
                    }
                    className="text-sm hover:underline cursor-pointer border-b border-black py-3 mb-2"
                  >
                    Read More Information
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
