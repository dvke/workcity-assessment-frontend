import { useState, useEffect } from "react";
import api from "../services/api";

const ClientForm = ({ navigate, clientId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(clientId);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      api
        .get(`/clients/${clientId}`)
        .then((res) => {
          setFormData(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch client data.");
          setLoading(false);
        });
    }
  }, [clientId, isEditing]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isEditing) {
        await api.put(`/clients/${clientId}`, formData);
      } else {
        await api.post("/clients", formData);
      }
      navigate("clients");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred. Please check your data."
      );
    }
  };

  if (loading) return <div>Loading form...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Client" : "Add New Client"}
      </h2>
      {error && (
        <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="address">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("clients")}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {isEditing ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
