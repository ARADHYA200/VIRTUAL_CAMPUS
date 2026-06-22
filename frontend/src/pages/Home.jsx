import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const xp = user?.xp || 0;
  const level = user?.level || 1;
  const xpNeeded = level * 1000;
  const xpProgress = (xp / xpNeeded) * 100;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[url('/bg-space.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0c10]/80 to-[#0b0c10]"></div>
      
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-[var(--neon-purple)] rounded-full blur-[120px] opacity-40 animate-float" style={{ animationDirection: 'alternate-reverse', animationDuration: '8s' }}></div>
      <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-[var(--neon-blue)] rounded-full blur-[150px] opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-16 animate-slideUp">
        
        <div className="flex-1 text-center lg:text-left space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[var(--neon-pink)] bg-[rgba(255,0,85,0.1)] text-[var(--neon-pink)] text-sm font-bold tracking-widest game-font animate-pulseGlow mb-4">
            v2.0 UPDATE LIVE
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black game-font leading-[1.1] tracking-tighter drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">VIRTUAL</span><br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-blue)] via-[var(--neon-purple)] to-[var(--neon-pink)]">CAMPUS</span>
            <span className="block text-4xl lg:text-5xl mt-2 text-white/90">ADVENTURE</span>
          </h1>
          
          <p className="text-xl text-gray-300 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Enter the simulation. Complete quests, level up your skills, and dominate the leaderboards in this immersive learning experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
            <button 
              onClick={() => navigate("/campus")} 
              className="btn-primary px-10 py-5 text-xl rounded-xl flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <span className="relative z-10">START JOURNEY</span>
              <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300 relative z-10">➔</span>
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button 
              onClick={() => navigate("/leaderboard")} 
              className="btn-secondary px-10 py-5 text-xl rounded-xl flex items-center justify-center gap-3"
            >
              <span>🏆</span> GLOBAL RANKS
            </button>
          </div>
        </div>

        <div className="w-full max-w-md glass-panel rounded-3xl p-8 relative hover:-translate-y-2 transition-transform duration-500 hover:shadow-[0_20px_50px_rgba(170,59,255,0.3)]">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--neon-pink)] rounded-full blur-[40px] opacity-30"></div>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[var(--neon-purple)] to-[var(--neon-blue)] p-[2px] shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              <div className="w-full h-full bg-[#0b0c10] rounded-[14px] flex items-center justify-center text-4xl animate-bounceSlow">
                👾
              </div>
            </div>
            <div>
              <p className="text-[var(--neon-blue)] text-sm font-bold tracking-widest uppercase game-font mb-1">PLAYER ONE</p>
              <h2 className="text-3xl font-black text-white">{user?.name || "New Recruit"}</h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0b0c10]/60 rounded-2xl p-5 border border-white/5">
              <div className="flex justify-between items-end mb-3">
                <span className="game-font text-white text-lg">LVL <span className="text-3xl font-black text-[var(--neon-purple)]">{level}</span></span>
                <span className="text-sm text-gray-400 font-mono">{xp} / {xpNeeded} XP</span>
              </div>
              <div className="h-3 w-full bg-[#0b0c10] rounded-full overflow-hidden border border-white/10 relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] rounded-full shadow-[0_0_10px_rgba(170,59,255,0.8)]" 
                  style={{ width: `${Math.min(xpProgress, 100)}%`, transition: 'width 1s ease-out' }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0b0c10]/60 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-default">
                <span className="text-3xl mb-2 animate-float" style={{animationDuration: '4s'}}>💎</span>
                <span className="text-2xl font-black game-font text-cyan-300">{user?.points || 0}</span>
                <span className="text-xs text-gray-400 tracking-wider">POINTS</span>
              </div>
              <div className="bg-[#0b0c10]/60 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-default">
                <span className="text-3xl mb-2 animate-float" style={{animationDuration: '5s', animationDelay: '1s'}}>🪙</span>
                <span className="text-2xl font-black game-font text-yellow-400">{user?.coins || 0}</span>
                <span className="text-xs text-gray-400 tracking-wider">COINS</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
