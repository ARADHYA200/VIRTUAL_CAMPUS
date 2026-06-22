import { useState, useEffect } from "react";
import api from "../services/api";
import { API_ROUTES } from "../constants";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(API_ROUTES.LEADERBOARD)
      .then((res) => {
        setLeaderboard(res.data.data.leaderboard);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getRankStyle = (index) => {
    switch(index) {
      case 0: return { color: "#FFD700", bg: "rgba(255,215,0,0.15)", border: "rgba(255,215,0,0.5)", glow: "0 0 20px rgba(255,215,0,0.4)" };
      case 1: return { color: "#C0C0C0", bg: "rgba(192,192,192,0.1)", border: "rgba(192,192,192,0.4)", glow: "0 0 15px rgba(192,192,192,0.2)" };
      case 2: return { color: "#CD7F32", bg: "rgba(205,127,50,0.1)", border: "rgba(205,127,50,0.4)", glow: "0 0 15px rgba(205,127,50,0.2)" };
      default: return { color: "#ffffff", bg: "rgba(20,22,34,0.6)", border: "rgba(255,255,255,0.05)", glow: "none" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0b0c10] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-[var(--neon-blue)] border-r-[var(--neon-purple)] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0b0c10] pt-32 pb-20 px-4 select-none relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(170,59,255,0.15)_0%,rgba(11,12,16,1)_70%)]"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center animate-fadeIn">
        
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[var(--neon-purple)] bg-[rgba(170,59,255,0.1)] text-[var(--neon-purple)] text-sm font-bold tracking-widest game-font mb-4">
            SEASON 1
          </div>
          <h1 className="text-5xl md:text-7xl font-black game-font text-white drop-shadow-[0_0_15px_rgba(170,59,255,0.6)]">
            GLOBAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-blue)]">RANKS</span>
          </h1>
          <p className="text-gray-400 mt-4 text-lg">Top scholars across the virtual campus.</p>
        </div>

        {error && (
          <p className="text-[var(--neon-pink)] mb-6">{error}</p>
        )}

        <div className="w-full space-y-4">
          {leaderboard.length === 0 && !error && (
            <p className="text-center text-gray-400">No rankings yet. Be the first!</p>
          )}

          {leaderboard.map((user, index) => {
            const styles = getRankStyle(index);
            const isTop3 = index < 3;

            return (
              <div 
                key={user._id} 
                className="flex items-center p-4 md:p-6 rounded-2xl relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
                style={{ 
                  backgroundColor: styles.bg, 
                  border: `1px solid ${styles.border}`,
                  boxShadow: styles.glow,
                  animation: `slideUp 0.5s ease-out ${index * 0.1}s forwards`,
                  opacity: 0,
                  transform: 'translateY(20px)'
                }}
              >
                <div 
                  className="w-16 flex-shrink-0 text-center font-black game-font text-4xl md:text-5xl"
                  style={{ color: styles.color, textShadow: isTop3 ? `0 0 10px ${styles.color}` : 'none' }}
                >
                  #{index + 1}
                </div>

                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#0b0c10] border-2 flex items-center justify-center text-xl md:text-3xl ml-4" style={{ borderColor: styles.color }}>
                  {index === 0 ? "👑" : "👾"}
                </div>

                <div className="ml-6 flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white game-font">{user.name}</h3>
                  <p className="text-xs md:text-sm text-gray-400 font-mono mt-1">LVL {user.level}</p>
                </div>

                <div className="text-right">
                  <div className="text-xs md:text-sm text-gray-400 tracking-wider mb-1">SCORE</div>
                  <div 
                    className="text-2xl md:text-4xl font-black game-font"
                    style={{ color: styles.color, textShadow: isTop3 ? `0 0 10px ${styles.color}` : 'none' }}
                  >
                    {user.points.toLocaleString()}
                  </div>
                </div>

                {index === 0 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
