import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar.jsx";
import Swal from "sweetalert2";
import DisasterForm from "../../components/data/DisasterForm";
import DisasterList from "../../components/data/DisasterList";
import {
  fetchDisasters,
  createDisaster,
  updateDisaster,
  deleteDisaster,
} from "../../redux/slice/disasterSlice";

const AddData = () => {
  const dispatch = useDispatch();
  const { disasters, isLoading } = useSelector((state) => state.disasters);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    location: "",
    date: "",
    files: [],
  });

  const [editingDisasterId, setEditingDisasterId] = useState(null);

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: e.target.files });
  };

  const handleEditClick = (disaster) => {
    setEditingDisasterId(disaster._id);
    setFormData({
      name: disaster.name,
      type: disaster.type,
      description: disaster.description,
      location: disaster.location,
      date: disaster.date,
      files: [],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const disasterData = { ...formData };
    const fileArray = Array.from(formData.files);

    if (editingDisasterId) {
      dispatch(
        updateDisaster({
          id: editingDisasterId,
          disasterData,
          files: fileArray,
        })
      );
    } else {
      dispatch(createDisaster({ ...disasterData, files: fileArray }));
    }

    setFormData({
      name: "",
      type: "",
      description: "",
      location: "",
      date: "",
      files: [],
    });
    setEditingDisasterId(null);
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDisaster(id));
        Swal.fire("Deleted!", "Your disaster has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    dispatch(fetchDisasters());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full container mx-auto py-28 px-56">
        <h1 className="text-2xl font-bold mb-6">Manage Disasters</h1>

        <div className="border bg-white p-6 text-sm mb-6">
          <DisasterForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            isEditing={!!editingDisasterId}
            handleFileChange={handleFileChange}
          />
        </div>

        <div className="border bg-white p-6 text-sm">
          <h1 className="text-2xl font-bold mb-6">Disaster List</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <DisasterList
              disasters={disasters}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddData;
