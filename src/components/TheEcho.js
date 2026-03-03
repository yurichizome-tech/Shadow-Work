import React, { useState, useRef } from 'react';

const TheEcho = ({ onTally }) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSkill, setActiveSkill] = useState(null);
  const timerRef = useRef(null);

  // Direct from your "Notes": Randomized skills to bypass executive dysfunction
  const crisisSkills = [
    { task: "ICE WATER", desc: "Dip your face in ice water for 30s (TIPP)" },
    { task: "INTENSE EXERCISE", desc: "1 minute of jumping jacks or sprinting" },
    { task: "PACED BREATHING", desc: "Inhale 4s, Exhale 6s for 2 minutes" },
    { task: "GLIMMER HUNT", desc: "Find 3 things that feel 'safe' in this room" },
    { task: "THE TORCH", desc: "Focus on the Golden Light for 1 minute" }
  ];

  const startHold = (e) => {
    e.preventDefault(); // Prevents zoom/scrolling on your phone
    setIsHolding(true);
    let startTime = Date.now();
    
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min((elapsed / 3000) * 100, 100);
      setProgress(percent);

      if (elapsed >= 3000) {
        completeHold();
      }
    }, 50);
  };

  const stopHold = () => {
    clearInterval(timerRef.current);
    setIsHolding(false);
    setProgress(0);
  };

  const completeHold = () => {
    clearInterval(timerRef.current);
    setIsHolding(false);
    setProgress(0);
    
    // Select the skill
    const selected = crisisSkills[Math.floor(Math.random() * crisisSkills.length)];
    setActiveSkill(selected);

    // Tally the reward (5 Copper)
    onTally('copper', 5);
  };

  return (
    <div className="echo-container">
      {activeSkill ? (
        <div className="skill-display">
          <h2>{activeSkill.task}</h2>
          <p>{activeSkill.desc}</p>
          <button className="ward-close" onClick={() => setActiveSkill(null)}>
            I AM GROUNDED
          </button>
        </div>
      ) : (
        <div className="button-group">
          <button 
            className={`echo-button ${isHolding ? 'holding' : ''}`}
            onMouseDown={startHold}
            onMouseUp={stopHold}
            onMouseLeave={stopHold}
            onTouchStart={startHold}
            onTouchEnd={stopHold}
          >
            {isHolding ? 'REPELLING...' : 'THE ECHO'}
          </button>
          
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheEcho;
