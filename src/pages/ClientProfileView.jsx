import React, { useState, useEffect } from "react";
import api from "../services/api";
import { User, Mail, Phone, MapPin, Briefcase } from "lucide-react";

const ClientProfileView = ({ navigate, clientId }) => {
  const [client, setClient] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientRes = await api.get(`/clients/${clientId}`);
        setClient(clientRes.data.data);
        const projectsRes = await api.get(`/projects/client/${clientId}`);
        setProjects(projectsRes.data.data);
      } catch (err) {
        setError("Failed to fetch client details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [clientId]);

  if (loading) return <div>Loading client profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!client) return <div>Client not found.</div>;

  const getStatusColor = (status) =>
    ({
      Completed: "bg-green-100 text-green-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      "Not Started": "bg-gray-100 text-gray-800",
    }[status] || "bg-gray-100 text-gray-800");

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <User className="text-blue-600" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{client.name}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
          <div className="flex items-center">
            <Mail size={18} className="mr-2" />
            <span>{client.email}</span>
          </div>
          <div className="flex items-center">
            <Phone size={18} className="mr-2" />
            <span>{client.phone}</span>
          </div>
          <div className="flex items-center col-span-2">
            <MapPin size={18} className="mr-2" />
            <span>{client.address}</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <Briefcase className="text-green-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Projects for {client.name}
          </h2>
        </div>
        {projects.length > 0 ? (
          <ul className="space-y-3">
            {projects.map((project) => (
              <li
                key={project._id}
                className="p-4 border rounded-md flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.description}</p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects found for this client.</p>
        )}
      </div>
      <button
        onClick={() => navigate("clients")}
        className="mt-8 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
      >
        &larr; Back to Clients
      </button>
    </div>
  );
};

export default ClientProfileView;
