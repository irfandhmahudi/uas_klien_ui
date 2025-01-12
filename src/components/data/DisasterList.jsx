import PropTypes from "prop-types";

const DisasterList = ({ disasters, handleEditClick, handleDeleteClick }) => {
  return disasters && disasters.length > 0 ? (
    <table className="w-full border border-collapse">
      <thead>
        <tr>
          <th className="px-4 py-2">Image</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Type</th>
          <th className="px-4 py-2">Location</th>
          <th className="px-4 py-2">Date and Time</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {disasters.map((disaster) => (
          <tr key={disaster._id}>
            <td className="border px-4 py-2">
              <img
                src={
                  disaster.images && disaster.images[0]
                    ? disaster.images[0].url
                    : ""
                }
                alt={disaster.name}
                className="w-16 h-16 object-cover"
              />
            </td>
            <td className="border px-4 py-2">{disaster.name}</td>
            <td className="border px-4 py-2">{disaster.type}</td>
            <td className="border px-4 py-2">{disaster.location}</td>
            <td className="border px-4 py-2">{disaster.formattedDateWIB}</td>
            <td className="border px-4 py-2">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(disaster)}
                  className="text-sm bg-black text-white py-2 px-4 hover:bg-gray-100 hover:border hover:border-black hover:text-black transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(disaster._id)}
                  className="text-sm bg-red-600 text-white py-2 px-4 hover:bg-gray-100 hover:border hover:border-black hover:text-black transition duration-300"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No disasters found!</p>
  );
};

DisasterList.propTypes = {
  disasters: PropTypes.array.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default DisasterList;
