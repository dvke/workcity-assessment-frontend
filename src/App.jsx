import AppRouter from "./AppRouter";
import AuthProvider from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
