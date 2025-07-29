const HomePage = ({ navigate }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg text-center">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">
      Welcome to WorkCity Project Manager
    </h1>
    <p className="text-lg text-gray-600 mb-6">
      Your central hub for managing clients and projects efficiently.
    </p>
    <div className="space-x-4">
      <button
        onClick={() => navigate("clients")}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        View Clients
      </button>
      <button
        onClick={() => navigate("projects")}
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        View Projects
      </button>
    </div>
  </div>
);

export default HomePage;
