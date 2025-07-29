import React, { useState, useEffect } from "react";
import api from "../services/api";

const ProjectForm = ({ navigate, projectId }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    clientId: "",
    status: "Not Started",
  });
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const isEditing = Boolean(projectId);

  useEffect(() => {
    api
      .get("/clients")
      .then((res) => setClients(res.data.data))
      .catch((err) => setError("Failed to load clients."));
    if (isEditing) {
      api
        .get(`/projects/${projectId}`)
        .then((res) => {
          setFormData({
            name: res.data.data.name,
            description: res.data.data.description,
            clientId: res.data.data.clientId._id,
            status: res.data.data.status,
          });
        })
        .catch((err) => setError("Failed to fetch project data."))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [projectId, isEditing]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.clientId) {
      setError("Please select a client.");
      return;
    }
    try {
      if (isEditing) {
        await api.put(`/projects/${projectId}`, formData);
      } else {
        await api.post("/projects", formData);
      }
      navigate("projects");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  if (loading) return <div>Loading form...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Project" : "Add New Project"}
      </h2>
      {error && (
        <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Project Name
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
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="clientId">
            Client
          </label>
          <select
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-white"
            required
          >
            <option value="">-- Select a Client --</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="status">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg bg-white"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("projects")}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            {isEditing ? "Update Project" : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
