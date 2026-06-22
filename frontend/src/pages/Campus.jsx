import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Campus() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const xp = user?.xp || 0;
  const xpNeeded = (user?.level || 1) * 1000;
  const xpProgress = (xp / xpNeeded) * 100;

  const locations = [
    { id: "library", label: "LIBRARY", path: "/room/library", top: "25%", left: "20%", icon: "📚", color: "var(--neon-blue)", bg: "bg-blue-900/40" },
    { id: "lab", label: "THE LAB", path: "/room/lab", top: "35%", left: "65%", icon: "🧪", color: "var(--neon-green)", bg: "bg-green-900/40" },
    { id: "quiz", label: "ARENA", path: "/room/quiz", top: "60%", left: "30%", icon: "⚔️", color: "var(--neon-pink)", bg: "bg-pink-900/40" },
    { id: "leaderboard", label: "RANKS", path: "/leaderboard", top: "50%", left: "80%", icon: "🏆", color: "var(--neon-purple)", bg: "bg-purple-900/40" },
  ];

  return (
    <div className="w-full h-screen relative overflow-hidden bg-[#0b0c10] select-none">
      
      <div 
        className="absolute inset-0 bg-[url('/campus.png')] bg-cover bg-center transition-transform duration-[10s] ease-linear scale-105 hover:scale-110" 
        style={{ filter: "brightness(0.6) contrast(1.2)" }}
      ></div>
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0b0c10_100%)] pointer-events-none"></div>

      <div className="absolute top-8 w-full px-8 z-20 flex justify-between items-start pointer-events-none">
        
        <div className="flex gap-4 items-center pointer-events-auto">
          <div className="relative group cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-[#151821] border-2 border-[var(--neon-blue)] shadow-[0_0_15px_rgba(0,240,255,0.4)] flex justify-center items-center text-3xl z-10 relative overflow-hidden">
              <span className="group-hover:scale-125 transition-transform">👽</span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[var(--neon-purple)] text-white text-xs font-black game-font px-2 py-0.5 rounded-md border border-[#0b0c10] shadow-lg z-20">
              LVL {user?.level || 1}
            </div>
          </div>

          <div className="bg-[#10121A]/80 backdrop-blur-md rounded-r-xl rounded-l-md border border-white/5 p-2 pr-6 shadow-xl">
            <h3 className="game-font font-bold text-white text-sm uppercase tracking-wider pl-1 mb-1">{user?.name || "Player 1"}</h3>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-400 font-bold game-font w-4">XP</span>
              <div className="w-48 h-3 bg-[#0b0c10] rounded-full overflow-hidden border border-white/10 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-green)] shadow-[0_0_10px_rgba(0,240,255,0.8)] relative" 
                  style={{ width: `${Math.min(xpProgress, 100)}%`, transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-pulseGlow w-full h-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pointer-events-auto">
          <div className="flex items-center gap-2 bg-[#10121A]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-[var(--neon-pink)]/30 hover:border-[var(--neon-pink)] transition-colors shadow-lg cursor-pointer hover:-translate-y-1">
            <span className="text-xl animate-bounceSlow">💎</span>
            <span className="game-font font-black text-xl text-[var(--neon-pink)] drop-shadow-md">{user?.points || 0}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#10121A]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-[var(--neon-blue)]/30 hover:border-[var(--neon-blue)] transition-colors shadow-lg cursor-pointer hover:-translate-y-1">
            <span className="text-xl animate-bounceSlow" style={{animationDelay: '1s'}}>🪙</span>
            <span className="game-font font-black text-xl text-[var(--neon-blue)] drop-shadow-md">{user?.coins || 0}</span>
          </div>
        </div>

      </div>

      <div className="absolute inset-0 z-10">
        {locations.map((loc, idx) => (
          <button
            key={loc.id}
            onClick={() => navigate(loc.path)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center justify-center animate-float pointer-events-auto"
            style={{ 
              top: loc.top, 
              left: loc.left, 
              animationDelay: `${idx * 1.5}s` 
            }}
          >
            <div className="absolute w-24 h-24 rounded-full border-2 border-dashed opacity-0 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] transition-opacity duration-300 pointer-events-none" style={{ borderColor: loc.color }}></div>
            
            <div 
              className={`w-20 h-20 ${loc.bg} backdrop-blur-md border-2 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover:scale-125 group-hover:-translate-y-4`}
              style={{ borderColor: loc.color, boxShadow: `0 10px 25px ${loc.color}40`, borderTopRightRadius: '30%', borderBottomLeftRadius: '30%' }}
            >
               <span className="text-4xl filter drop-shadow-lg group-hover:animate-bounce">{loc.icon}</span>
            </div>
            
            <div className="mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <div 
                className="px-4 py-1.5 rounded-lg bg-[#0b0c10]/90 border font-black game-font text-sm tracking-widest whitespace-nowrap"
                style={{ borderColor: loc.color, color: loc.color, boxShadow: `0 0 10px ${loc.color}60` }}
              >
                {loc.label}
              </div>
            </div>
            
            <div className="absolute top-[100%] w-[2px] h-12 bg-gradient-to-b opacity-0 group-hover:opacity-70 pointer-events-none transition-opacity" style={{ backgroundImage: `linear-gradient(to bottom, ${loc.color}, transparent)` }}></div>
          </button>
        ))}
      </div>

      <div className="absolute bottom-6 w-full flex justify-center z-20 pointer-events-none">
        
        <div className="glass-panel px-6 py-3 rounded-[2rem] flex gap-4 pointer-events-auto">
          {[
            { id: "quests", icon: "📜", label: "QUESTS", color: "hover:text-yellow-400" },
            { id: "badges", icon: "⭐", label: "BADGES", color: "hover:text-purple-400" },
            { id: "backpack", icon: "🎒", label: "INVENTORY", color: "hover:text-green-400" },
            { id: "shop", icon: "🛒", label: "STORE", color: "hover:text-blue-400" },
          ].map(btn => (
            <button 
              key={btn.id}
              className="group relative flex flex-col items-center justify-center w-20 h-20 rounded-2xl border border-transparent hover:bg-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className={`text-3xl mb-1 filter drop-shadow-md transition-transform group-hover:scale-110 group-hover:animate-float ${btn.color}`}>{btn.icon}</span>
              <span className="text-[10px] font-bold game-font text-gray-500 group-hover:text-white transition-colors tracking-widest">{btn.label}</span>
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}
