import PropTypes from "prop-types";

const DisasterForm = ({
  formData,
  setFormData,
  handleSubmit,
  isEditing,
  handleFileChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Type</label>
        <input
          type="text"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full p-2 border border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="w-full p-2 border border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">
          Date and Time
        </label>
        <input
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Images</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300"
        />
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="text-sm bg-black text-white py-2 px-4 hover:bg-gray-100 hover:border hover:border-black hover:text-black transition duration-300"
        >
          {isEditing ? "Update Disaster" : "Add Disaster"}
        </button>
      </div>
    </form>
  );
};

DisasterForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleFileChange: PropTypes.func.isRequired,
};

export default DisasterForm;
