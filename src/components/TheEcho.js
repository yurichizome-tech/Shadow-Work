import React, { useState, useRef } from 'react';

const TheEcho = ({ onTally }) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const dbtSkills = [
    "Ice Water on face (30s)",
    "1 minute Jumping Jacks",
    "Paced breathing (4 in, 6 out)",
    "Shoulder Tense & Release",
    "Find 3 Glimmers nearby"
  ];

  const startHold = () => {
    setIsHolding(true);
    // Start a timer that updates the progress bar over 3 seconds
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
    
    // Trigger the Skill & Reward
    const randomSkill = dbtSkills[Math.floor(Math.random() * dbtSkills.length)];
    alert(`ECHO SILENCED. Task: ${randomSkill}`);
    onTally('copper', 5);
  };

  return (
    <div className="echo-wrapper">
      <button 
        className={`echo-button ${isHolding ? 'active-hold' : ''}`}
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
      >
        {isHolding ? 'HOLDING...' : 'THE ECHO'}
      </button>
      
      {/* Visual Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default TheEcho;
