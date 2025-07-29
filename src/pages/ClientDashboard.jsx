import React, { useState, useEffect } from "react";
import api from "../services/api";
import { PlusCircle, Eye, Edit, Trash2 } from "lucide-react";

const ClientDashboard = ({ navigate }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/clients")
      .then((res) => setClients(res.data.data))
      .catch((err) => setError("Failed to fetch clients."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this client? This action cannot be undone."
      )
    ) {
      try {
        await api.delete(`/clients/${id}`);
        setClients(clients.filter((client) => client._id !== id));
      } catch (err) {
        alert("Failed to delete client. You must be an admin.");
      }
    }
  };

  if (loading) return <div>Loading clients...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clients</h1>
        <button
          onClick={() => navigate("clients/new")}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} />
          <span>Add Client</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client._id}>
                <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => navigate("clients/view", client._id)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => navigate("clients/edit", client._id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(client._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No clients found. Add one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientDashboard;
