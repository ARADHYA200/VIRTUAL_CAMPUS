import Confetti from "react-confetti";

export default function Reward({ reward, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
      <Confetti />
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-3xl text-center text-black shadow-2xl animate-bounce">
        <h2 className="text-3xl mb-4">🎉 Reward Earned!</h2>
        <p className="text-xl">+{reward?.points || 0} Points</p>
        <p className="text-xl">+{reward?.xp || 0} XP</p>
        <button
          onClick={onClose}
          className="mt-4 bg-black/50 text-white px-4 py-2 rounded-xl hover:bg-black/70 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}