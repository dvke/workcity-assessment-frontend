import { useState } from "react";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ClientDashboard from "./pages/ClientDashboard";
import ClientProfileView from "./pages/ClientProfileView";
import ClientForm from "./pages/ClientForm";

const AppRouter = () => {
  const [route, setRoute] = useState(["home"]);

  const navigate = (path, id = null) => {
    window.scrollTo(0, 0); // Scroll to top on page change
    setRoute(id ? [path, id] : [path]);
  };

  const renderPage = () => {
    const [page, id] = route;

    if (page === "login") return <LoginPage navigate={navigate} />;
    if (page === "signup") return <SignupPage navigate={navigate} />;

    return (
      <PrivateRoute>
        {(() => {
          switch (page) {
            case "home":
              return <HomePage navigate={navigate} />;
            case "clients":
              return <ClientDashboard navigate={navigate} />;
            case "clients/new":
              return <ClientForm navigate={navigate} />;
            case "clients/edit":
              return <ClientForm navigate={navigate} clientId={id} />;
            case "clients/view":
              return <ClientProfileView navigate={navigate} clientId={id} />;
            // case "projects":
            //   return <ProjectDashboard navigate={navigate} />;
            // case "projects/new":
            //   return <ProjectForm navigate={navigate} />;
            // case "projects/edit":
            //   return <ProjectForm navigate={navigate} projectId={id} />;
            default:
              return <HomePage navigate={navigate} />;
          }
        })()}
      </PrivateRoute>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar navigate={navigate} />
      <main className="container mx-auto px-4 py-8">{renderPage()}</main>
    </div>
  );
};

export default AppRouter;
