import { useState } from "react";
import axios from "axios";

export default function Room() {
  const [result, setResult] = useState("");

  const handleAnswer = async (ans) => {
    if (ans === "B") {
      setResult("Correct 🎉");

      await axios.post("http://localhost:5000/api/users/complete", {
        userId: "YOUR_USER_ID",
        room: "library",
      });

    } else {
      setResult("Wrong ❌");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white">

      <h2 className="text-2xl mb-4">📚 Library Quiz</h2>

      <p className="mb-4">What is AI?</p>

      <div className="flex flex-col gap-3">
        <button onClick={() => handleAnswer("A")} className="bg-gray-600 p-2 rounded">Machine Learning</button>
        <button onClick={() => handleAnswer("B")} className="bg-gray-600 p-2 rounded">Artificial Intelligence</button>
        <button onClick={() => handleAnswer("C")} className="bg-gray-600 p-2 rounded">Data Science</button>
      </div>

      <p className="mt-4">{result}</p>
    </div>
  );
}