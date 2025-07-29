import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Briefcase,
  Users,
  FolderKanban,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

const Navbar = ({ navigate }) => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("home")}
          >
            <Briefcase className="text-blue-600" size={28} />
            <span className="text-xl font-bold text-gray-800">WorkCity</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => navigate("clients")}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                >
                  <Users size={20} />
                  <span>Clients</span>
                </button>
                <button
                  onClick={() => navigate("projects")}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                >
                  <FolderKanban size={20} />
                  <span>Projects</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("login")}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => navigate("signup")}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  <UserPlus size={20} />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
