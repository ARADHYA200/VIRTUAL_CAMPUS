import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ name, password });
      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0c10] bg-[url('/bg-space.jpg')] bg-cover bg-center overflow-hidden w-full select-none">
      <div className="absolute inset-0 bg-[#0b0c10]/80"></div>
      
      {/* Ambience */}
      <div className="absolute w-[400px] h-[400px] bg-[var(--neon-purple)] rounded-full blur-[100px] opacity-20 animate-float left-[-100px] top-[-100px]"></div>
      <div className="absolute w-[300px] h-[300px] bg-[var(--neon-blue)] rounded-full blur-[120px] opacity-20 animate-float right-[-50px] bottom-[-50px]" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10 w-full max-w-md animate-slideUp">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black game-font tracking-widest game-title mx-auto w-fit">
            V-CAMPUS
          </h1>
          <p className="text-[var(--neon-blue)] mt-2 font-bold game-font text-sm tracking-widest">AUTHENTICATION REQUIRED</p>
        </div>

        <form onSubmit={handleLogin} className="glass-panel p-8 rounded-3xl space-y-6">
          {error && <p className="text-[var(--neon-pink)] bg-[var(--neon-pink)]/10 p-3 rounded-lg text-center font-bold text-sm animate-shake border border-[var(--neon-pink)]/30">{error}</p>}
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest game-font">CALLSIGN (NAME)</label>
              <input 
                type="text" 
                placeholder="PlayerOne" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0b0c10]/80 p-4 rounded-xl text-white outline-none border border-white/10 focus:border-[var(--neon-blue)] focus:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all font-mono" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest game-font">SECURITY KEY</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0b0c10]/80 p-4 rounded-xl text-white outline-none border border-white/10 focus:border-[var(--neon-purple)] focus:shadow-[0_0_15px_rgba(170,59,255,0.3)] transition-all font-mono tracking-widest" 
                required 
              />
            </div>
          </div>
          
          <button type="submit" disabled={loading} className="w-full btn-primary py-4 rounded-xl disabled:opacity-50">
            {loading ? "AUTHENTICATING..." : "ENTER SIMULATION"}
          </button>
          
          <p className="text-center text-sm text-gray-400 mt-6 font-body">
            New Cadet? <Link to="/register" className="text-[var(--neon-blue)] hover:text-[var(--neon-purple)] font-bold transition-colors">Register Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
