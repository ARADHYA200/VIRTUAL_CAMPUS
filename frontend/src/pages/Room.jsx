import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import api from "../services/api";
import { API_ROUTES } from "../constants";
import { useAuth } from "../context/AuthContext";

export default function Room() {
  const { roomType } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState("");
  const [showReward, setShowReward] = useState(false);
  const [reward, setReward] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    api
      .get(API_ROUTES.TASKS_BY_ROOM(roomType))
      .then((res) => {
        const roomTasks = res.data.data.tasks;
        setTasks(roomTasks);
        if (roomTasks.length > 0) {
          const userIndex = user?.currentQuestionIndex || 0;
          setCurrentTask(roomTasks[userIndex % roomTasks.length]);
        }
      })
      .catch(() => {
        setTasks([]);
      });
  }, [roomType, user?.currentQuestionIndex]);

  const handleAnswer = async (option) => {
    if (!currentTask || result) return;
    setSelectedAnswer(option);

    try {
      const res = await api.post(API_ROUTES.SUBMIT_ANSWER, {
        taskId: currentTask._id,
        answer: option,
      });

      const { isCorrect, reward: earnedReward, user: updatedUser } = res.data.data;
      updateUser(updatedUser);

      if (isCorrect) {
        setResult("correct");
        setShowConfetti(true);
        setTimeout(() => {
          setReward(earnedReward);
          setShowReward(true);
        }, 1500);
      } else {
        setResult("wrong");
        setIsWrong(true);
        setTimeout(() => setIsWrong(false), 400);
      }
    } catch {
      setResult("wrong");
    }
  };

  const handleCloseReward = () => {
    setShowReward(false);
    setShowConfetti(false);
    setResult("");
    setSelectedAnswer("");

    if (tasks.length > 0 && user) {
      setCurrentTask(tasks[user.currentQuestionIndex % tasks.length]);
    }
  };

  const roomConfig = {
    library: { title: "LIBRARY ARCHIVES", icon: "📚", color: "var(--neon-blue)" },
    lab: { title: "THE LAB", icon: "🧪", color: "var(--neon-green)" },
    quiz: { title: "BATTLE ARENA", icon: "⚔️", color: "var(--neon-pink)" },
  };

  const config = roomConfig[roomType] || roomConfig.quiz;

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white p-4 flex flex-col items-center justify-center relative overflow-hidden select-none">
      
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ background: `radial-gradient(circle at center, ${config.color} 0%, #0b0c10 70%)` }}
      ></div>

      {showConfetti && <Confetti recycle={false} numberOfPieces={500} colors={['#aa3bff', '#00f0ff', '#ff0055', '#39ff14', '#FFD700']} />}

      <div className={`relative z-10 w-full max-w-3xl glass-panel p-8 md:p-12 rounded-[2rem] border-2 shadow-2xl transition-all duration-300 ${isWrong ? 'animate-shake' : 'animate-slideUp'}`} style={{ borderColor: `${config.color}50`, boxShadow: `0 0 40px ${config.color}20` }}>
        
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl filter drop-shadow-md">{config.icon}</span>
            <h1 className="text-3xl font-black game-font tracking-widest" style={{ color: config.color }}>{config.title}</h1>
          </div>
          <button onClick={() => navigate("/campus")} className="text-gray-400 hover:text-white transition group relative">
            <span className="text-3xl">✖</span>
          </button>
        </div>

        {currentTask ? (
          <div className="space-y-10">
            {!result && (
              <div className="w-full h-2 bg-[#050608] rounded-full overflow-hidden border border-white/10">
                <div 
                  className="h-full rounded-full animate-deplete"
                  style={{ backgroundColor: config.color }}
                ></div>
              </div>
            )}

            <div className="text-center bg-[#0b0c10]/50 p-6 rounded-2xl border border-white/5 shadow-inner">
              <h2 className="text-2xl md:text-3xl font-bold font-body text-white leading-relaxed">
                {currentTask.question}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentTask.options.map((option, i) => {
                let statusClass = "bg-[#10121A] border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/30 hover:text-white";
                
                if (result) {
                  if (option === currentTask.correctAnswer) {
                    statusClass = "bg-[var(--neon-green)]/20 border-2 border-[var(--neon-green)] text-white shadow-[0_0_20px_rgba(57,255,20,0.4)] transform scale-105";
                  } else if (selectedAnswer === option) {
                    statusClass = "bg-[var(--neon-pink)]/20 border-2 border-[var(--neon-pink)] text-gray-500 shadow-[0_0_15px_rgba(255,0,85,0.4)]";
                  } else {
                    statusClass = "bg-[#10121A] border-transparent text-gray-600 opacity-50";
                  }
                } else if (selectedAnswer === option) {
                  statusClass = "bg-white/20 border-white text-white transform scale-95";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option)}
                    disabled={!!result}
                    className={`relative w-full p-5 rounded-2xl font-bold text-lg font-body transition-all duration-300 border text-left flex justify-between items-center group ${statusClass}`}
                  >
                    <span>{option}</span>
                    <span className="text-xl font-black game-font opacity-30 group-hover:opacity-100 transition-opacity">
                      {['A', 'B', 'C', 'D'][i]}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-t-[var(--neon-blue)] border-r-[var(--neon-purple)] border-b-[var(--neon-pink)] border-l-[var(--neon-green)] rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-xl game-font animate-pulse">CONNECTING TO DATABANKS...</p>
          </div>
        )}

      </div>

      {showReward && reward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0c10]/95 backdrop-blur-xl">
          <div className="glass-panel p-10 rounded-3xl text-center max-w-sm w-full animate-slideUp flex flex-col items-center">
            <h2 className="game-font font-black text-4xl text-[var(--neon-purple)] mb-2 drop-shadow-[0_0_10px_rgba(170,59,255,0.6)]">VICTORY</h2>
            <p className="text-gray-400 mb-8 font-bold tracking-widest text-sm">CHALLENGE CLEARED</p>
            
            <div className="flex gap-6 mb-10">
              <div className="flex flex-col items-center bg-[#151821] p-4 rounded-2xl border border-[var(--neon-pink)]/30 box-shadow-[0_0_15px_rgba(255,0,85,0.2)]">
                <span className="text-4xl mb-2 text-[var(--neon-pink)]">💎</span>
                <span className="game-font font-black text-2xl text-white">+{reward.points}</span>
              </div>
              <div className="flex flex-col items-center bg-[#151821] p-4 rounded-2xl border border-[var(--neon-blue)]/30 box-shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <span className="text-4xl mb-2 text-[var(--neon-blue)]">🪙</span>
                <span className="game-font font-black text-2xl text-white">+{reward.coins}</span>
              </div>
            </div>

            <button 
              onClick={handleCloseReward}
              className="btn-primary w-full py-4 text-lg rounded-xl"
            >
              CONTINUE JOURNEY
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
