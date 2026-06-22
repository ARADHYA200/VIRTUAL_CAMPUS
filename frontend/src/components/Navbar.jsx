import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "HQ", path: "/home", icon: "🏠" },
    { name: "MAP", path: "/campus", icon: "🗺️" },
    { name: "STATS", path: "/dashboard", icon: "📊" },
    { name: "RANKS", path: "/leaderboard", icon: "🏆" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full animate-fadeIn pointer-events-none">
      <div className="w-full bg-[rgba(11,12,16,0.85)] backdrop-blur-xl border-b border-[var(--panel-border)] shadow-[0_4px_30px_rgba(170,59,255,0.15)] flex px-6 py-4 justify-between items-center pointer-events-auto">
        <div className="text-xl font-black tracking-widest game-title flex items-center gap-3">
          <span className="text-2xl animate-float inline-block">🚀</span> V-CAMPUS OS
        </div>
        
        <div className="flex gap-4 items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`game-font text-sm flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? "bg-[rgba(170,59,255,0.2)] text-[var(--neon-blue)] border border-[var(--neon-blue)] shadow-[0_0_15px_rgba(0,240,255,0.3)]" 
                    : "text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.1)] hover:scale-105"
                }`}
              >
                <span>{item.icon}</span> {item.name}
              </Link>
            );
          })}

          {user && (
            <button
              onClick={handleLogout}
              className="game-font text-sm flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-[var(--neon-pink)] hover:bg-[rgba(255,0,85,0.1)] transition-all duration-300"
            >
              <span>🚪</span> LOGOUT
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
