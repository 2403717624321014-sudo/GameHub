import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// PenaltyShootout.jsx
// Default-exported React component ready to drop into a Create React App or Next.js page.
// Requirements: Tailwind CSS + framer-motion installed. (npm i framer-motion)

export default function PenaltyShootout() {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("Choose direction and click Shoot!");
  const [direction, setDirection] = useState(null); // "left" | "center" | "right"
  const [isShooting, setIsShooting] = useState(false);
  const [goalkeeperMove, setGoalkeeperMove] = useState(null);
  const [lastResult, setLastResult] = useState(null); // "goal" | "save" | null

  // Configurable difficulty: higher -> harder for shooter
  const DIFFICULTY = 0.45; // 0..1 probability that keeper guesses correctly

  useEffect(() => {
    if (lastResult) {
      const t = setTimeout(() => setLastResult(null), 1500);
      return () => clearTimeout(t);
    }
  }, [lastResult]);

  function pickKeeperMove() {
    // Keeper picks randomly with slight bias towards center
    const choices = ["left", "center", "right"];
    const r = Math.random();
    if (r < 0.25) return "left";
    if (r < 0.75) return "center";
    return "right";
  }

  function shoot() {
    if (!direction || isShooting) return;
    setIsShooting(true);
    setMessage("Shooting...");

    // keeper may 'guess' correctly depending on DIFFICULTY
    const guessed = Math.random() < (DIFFICULTY ? DIFFICULTY : 0.5) ? direction : pickKeeperMove();
    setGoalkeeperMove(guessed);

    // Delay to allow animation
    setTimeout(() => {
      const keeperOnSpot = guessed === direction;

      // If keeper guessed same direction, small chance still for goal depending on power/skill
      // We'll simulate 'power' by random factor — simpler UX: if keeper guessed same, 60% chance save.
      const saveChance = keeperOnSpot ? 0.6 : 0.15; // tuned values
      const saved = Math.random() < saveChance;

      if (!saved) {
        setScore((s) => s + 1);
        setMessage("GOAL! 🎯");
        setLastResult("goal");
      } else {
        setMessage("Saved! 🧤");
        setLastResult("save");
      }

      setAttempts((a) => a + 1);
      setIsShooting(false);

      // small pause before clearing keeper
      setTimeout(() => setGoalkeeperMove(null), 900);
    }, 900);
  }

  function reset() {
    setScore(0);
    setAttempts(0);
    setMessage("Choose direction and click Shoot!");
    setDirection(null);
    setGoalkeeperMove(null);
    setLastResult(null);
    setIsShooting(false);
  }

  // Render helpers
  function dirClass(dir) {
    return `${
      direction === dir ? "ring-2 ring-offset-2 ring-indigo-500" : ""
    } px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50`;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Penalty Shootout — React</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column: scoreboard + controls */}
        <div className="col-span-1 bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Score</div>
              <div className="text-3xl font-bold">{score} / {attempts}</div>
            </div>
            <div>
              <button
                onClick={reset}
                className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:brightness-90"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm text-gray-600 mb-2">Choose direction</div>
            <div className="flex gap-2">
              <button onClick={() => setDirection("left")} className={dirClass("left")}>
                Left
              </button>
              <button onClick={() => setDirection("center")} className={dirClass("center")}>
                Center
              </button>
              <button onClick={() => setDirection("right")} className={dirClass("right")}>
                Right
              </button>
            </div>

            <div className="mt-4">
              <button
                onClick={shoot}
                disabled={!direction || isShooting}
                className={`w-full py-2 rounded-md text-white ${
                  !direction || isShooting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:brightness-95"
                }`}
              >
                {isShooting ? "Shooting..." : "Shoot"}
              </button>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-md text-center">
              <div className="text-sm text-gray-600">Result</div>
              <div className="text-lg font-medium">{message}</div>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              Difficulty: {Math.round(DIFFICULTY * 100)}% keeper accuracy (lower = easier shooter)
            </div>
          </div>
        </div>

        {/* Center column: pitch / animation */}
        <div className="col-span-1 md:col-span-2 bg-gradient-to-b from-green-600/10 to-white rounded-lg p-4 shadow-md">
          <div className="relative h-64 md:h-72 bg-green-700/5 rounded-md overflow-hidden flex items-center justify-center">
            {/* Goal area */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-80 md:w-96 h-44 bg-white/90 border border-gray-200 rounded-md flex flex-col items-center justify-between p-2">
              <div className="w-full h-8 flex items-center justify-between px-6">
                <div className="text-sm text-gray-600">Goal</div>
                <div className="text-sm text-gray-600">Keeper: {goalkeeperMove ?? "—"}</div>
              </div>

              <div className="relative w-full h-16 flex items-center justify-center">
                {/* Keeper visual */}
                <motion.div
                  animate={{ x: goalkeeperMove === "left" ? -110 : goalkeeperMove === "right" ? 110 : 0, y: goalkeeperMove ? -8 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute top-0 flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-600/90 flex items-center justify-center text-white font-semibold">GK</div>
                  <div className="text-xs text-gray-600 mt-1">Keeper</div>
                </motion.div>

                {/* Ball flight animation */}
                <motion.div
                  key={attempts} // re-create on each attempt to restart animation
                  initial={{ x: 0, y: 40, scale: 1 }}
                  animate={isShooting ? (direction === "left" ? { x: -120, y: -70, scale: 0.7 } : direction === "right" ? { x: 120, y: -70, scale: 0.7 } : { x: 0, y: -80, scale: 0.7 }) : { x: 0, y: 40, scale: 1 }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  className="absolute"
                >
                  <div className={`w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-sm`}>⚽</div>
                </motion.div>
              </div>
            </div>

            {/* Crowd / pitch decorations */}
            <div className="absolute bottom-4 left-4 text-xs text-gray-500">Crowd</div>
            <div className="absolute bottom-4 right-4 text-xs text-gray-500">Stadium</div>

            {/* Overlay that briefly shows "GOAL" or "SAVED" */}
            {lastResult && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.06, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`px-6 py-3 rounded-2xl text-2xl font-bold ${lastResult === "goal" ? "bg-green-500/90 text-white" : "bg-gray-800/90 text-white"}`}
                >
                  {lastResult === "goal" ? "GOAL! 🎉" : "SAVED! 🧤"}
                </motion.div>
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <div className="text-sm text-gray-600">Tips</div>
              <ul className="text-xs text-gray-500 list-disc pl-4">
                <li>Click a direction (Left / Center / Right) then Shoot.</li>
                <li>If the keeper guesses the same direction, save chance increases.</li>
                <li>Reset clears score and attempts.</li>
              </ul>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-600">Accuracy</div>
              <div className="text-sm font-medium">{attempts === 0 ? "—" : `${Math.round((score / attempts) * 100)}%`}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-500">
        <strong>How to use:</strong> Install Tailwind CSS and framer-motion, place this component in your project, then import and render it inside a page.
      </div>
    </div>
  );
}
