import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Home = lazy(() => import("./pages/Home"));
const Campus = lazy(() => import("./pages/Campus"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Room = lazy(() => import("./pages/Room"));

function PageLoader() {
  return (
    <div className="min-h-screen w-full bg-[#0b0c10] flex items-center justify-center text-white">
      <div className="w-16 h-16 border-4 border-t-[var(--neon-blue)] border-r-[var(--neon-purple)] rounded-full animate-spin" />
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const hideNavbar = ["/", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen w-full text-white font-body bg-[#0b0c10] overflow-x-hidden selection:bg-fuchsia-500 selection:text-white">
      {!hideNavbar && <Navbar />}
      <div className={hideNavbar ? "" : "pt-20"}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/campus"
              element={
                <ProtectedRoute>
                  <Campus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/room/:roomType"
              element={
                <ProtectedRoute>
                  <Room />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
