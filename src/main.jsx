import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  Briefcase,
  LogIn,
  LogOut,
  UserPlus,
  Users,
  FolderKanban,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
