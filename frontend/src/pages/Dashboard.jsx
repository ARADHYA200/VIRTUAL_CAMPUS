import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const xp = user?.xp || 0;
  const level = user?.level || 1;
  const xpNeeded = level * 1000;
  const xpProgress = (xp / xpNeeded) * 100;

  const badges = [
    { id: 1, name: "First Blood", icon: "🩸", color: "var(--neon-pink)", unlocked: user?.badges?.includes("First Blood") },
    { id: 2, name: "Brainiac", icon: "🧠", color: "var(--neon-blue)", unlocked: user?.badges?.includes("Brainiac") },
    { id: 3, name: "Speed Demon", icon: "⚡", color: "var(--neon-green)", unlocked: user?.badges?.includes("Speed Demon") },
    { id: 4, name: "Perfectionist", icon: "🎯", color: "var(--neon-purple)", unlocked: user?.badges?.includes("Campus Master") || user?.badges?.includes("Rookie Explorer") },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0b0c10] bg-[url('/bg-hex.png')] bg-repeat bg-[length:50px_50px] pt-32 pb-20 px-4 select-none relative">
      <div className="absolute inset-0 bg-[#0b0c10]/90 backdrop-blur-[2px]"></div>

      <div className="relative z-10 max-w-5xl mx-auto animate-slideUp">
        
        <div className="flex items-center gap-4 mb-10">
          <div className="text-4xl text-[var(--neon-blue)] filter drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">⚔️</div>
          <h1 className="text-5xl font-black game-font text-white tracking-widest drop-shadow-md">PLAYER <span className="text-[var(--neon-blue)]">STATS</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 flex flex-col gap-8">
            <div className="glass-panel rounded-3xl p-8 flex flex-col items-center relative overflow-hidden group">
              <div className="absolute -inset-2 bg-gradient-to-t from-[var(--neon-purple)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative mb-6">
                <div className="w-40 h-40 rounded-2xl bg-[#1a1c23] border border-white/10 shadow-2xl flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500 z-10 relative">
                   👽
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-[var(--neon-blue)] blur-[25px] rounded-[100%] opacity-40 animate-pulseGlow z-0"></div>
              </div>

              <h2 className="text-2xl font-black game-font text-white mb-1">{user?.name || "Player 1"}</h2>
              <div className="text-sm text-[var(--neon-purple)] tracking-widest game-font font-bold uppercase">{user?.role || "student"}</div>

              <div className="grid grid-cols-2 gap-4 w-full mt-8">
                <div className="bg-[#0b0c10]/60 rounded-xl p-4 border border-white/5 flex flex-col items-center">
                  <span className="text-2xl mb-1 filter drop-shadow-md">💎</span>
                  <span className="game-font font-bold text-lg text-white">{user?.points || 0}</span>
                </div>
                <div className="bg-[#0b0c10]/60 rounded-xl p-4 border border-white/5 flex flex-col items-center">
                  <span className="text-2xl mb-1 filter drop-shadow-md">🪙</span>
                  <span className="game-font font-bold text-lg text-white">{user?.coins || 0}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-8">
            
            <div className="glass-panel rounded-3xl p-8 relative hover:-translate-y-1 transition-transform">
              <h3 className="game-font text-[var(--neon-blue)] text-sm tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full border border-[var(--neon-blue)] animate-ping"></span> 
                COMBAT EXPERIENCE
              </h3>
              
              <div className="flex justify-between items-end mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] p-0.5 shadow-[0_0_15px_rgba(170,59,255,0.4)]">
                     <div className="w-full h-full bg-[#0b0c10] rounded-[10px] flex items-center justify-center font-black game-font text-2xl text-white">
                        {level}
                     </div>
                  </div>
                  <div>
                    <div className="text-white font-black game-font text-xl">LEVEL PROGRESS</div>
                    <div className="text-gray-400 text-xs tracking-wider">{xp} / {xpNeeded} XP</div>
                  </div>
                </div>
                <div className="text-[var(--neon-blue)] game-font font-bold">{Math.round(xpProgress)}%</div>
              </div>
              
              <div className="h-6 w-full bg-[#050608] rounded-full overflow-hidden border-2 border-white/10 shadow-inner relative p-1">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 z-10 pointer-events-none mix-blend-overlay"></div>
                <div 
                  className="h-full bg-gradient-to-r from-[var(--neon-purple)] via-[var(--neon-blue)] to-[var(--neon-green)] rounded-full shadow-[0_0_15px_rgba(0,240,255,0.8)] relative" 
                  style={{ width: `${Math.min(xpProgress, 100)}%`, transition: 'width 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                >
                  <div className="absolute top-0 right-0 w-8 h-full bg-white opacity-50 blur-[4px]"></div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-8">
              <h3 className="game-font text-[var(--neon-pink)] text-sm tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--neon-pink)]"></span> 
                ACHIEVEMENTS
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {badges.map(badge => (
                  <div 
                    key={badge.id}
                    className={`relative p-4 rounded-2xl border flex flex-col items-center text-center transition-all duration-300 ${
                      badge.unlocked 
                        ? "bg-[#161824] hover:bg-[#1a1c28] hover:-translate-y-2 border-white/10 cursor-pointer" 
                        : "bg-[#0b0c10]/80 border-transparent opacity-50 grayscale"
                    }`}
                    style={badge.unlocked ? { boxShadow: `0 4px 20px ${badge.color}20` } : {}}
                  >
                    {badge.unlocked && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-2 bg-gradient-to-b opacity-50 blur-sm rounded-b-full" style={{ backgroundImage: `linear-gradient(to bottom, ${badge.color}, transparent)` }}></div>
                    )}
                    <div 
                      className={`text-4xl mb-3 ${badge.unlocked ? 'animate-float' : ''}`}
                      style={badge.unlocked ? { filter: `drop-shadow(0 0 10px ${badge.color})` } : {}}
                    >
                      {badge.icon}
                    </div>
                    <span className="text-xs font-bold font-body text-gray-300 tracking-wider">
                      {badge.unlocked ? badge.name : "Locked"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
