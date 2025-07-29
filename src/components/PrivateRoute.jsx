import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="mt-2">Please log in to view this page.</p>
      </div>
    );
  }
  return children;
};

export default PrivateRoute;
