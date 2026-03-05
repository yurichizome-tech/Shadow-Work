import React, { useState, useEffect } from 'react';

const TheWard = ({ onTally }) => {
  const [isHolding, setIsHolding] = useState(false);
  const [timer, setTimer] = useState(0);
  const [breathPhase, setBreathPhase] = useState(''); // In, Hold, Out, Hold

  // --- THE RITUAL LOGIC (4-4-4-4 Box Breathing) ---
  useEffect(() => {
    let interval;
    if (isHolding) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setTimer(0);
      setBreathPhase('');
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isHolding]);

  // Update the breathing phase based on the 16-second cycle
  useEffect(() => {
    if (timer > 0 && timer <= 4) setBreathPhase('INHALE (4s)');
    else if (timer > 4 && timer <= 8) setBreathPhase('HOLD (4s)');
    else if (timer > 8 && timer <= 12) setBreathPhase('EXHALE (4s)');
    else if (timer > 12 && timer <= 16) setBreathPhase('HOLD (4s)');
    else if (timer > 16) {
      onTally('copper', 25); // Survival Tally for completing the ritual
      setIsHolding(false);
      alert("Ward Set. 25 Copper added to the Hoard.");
    }
  }, [timer, onTally]);

  const handleQuickTap = () => {
    if (!isHolding) {
      onTally('copper', 5); // Immediate +5 for a simple "No"
    }
  };

  return (
    <div className="ward-action-zone">
      <div 
        className={`sekhmet-emblem ${isHolding ? 'pulsing' : ''}`}
        onMouseDown={() => setIsHolding(true)}
        onMouseUp={() => setIsHolding(false)}
        onTouchStart={() => setIsHolding(true)}
        onTouchEnd={() => setIsHolding(false)}
        onClick={handleQuickTap}
      >
        {/* Visual representation of the Lioness */}
        <div className="lioness-glow"></div>
        <p>{isHolding ? breathPhase : "THE WARD"}</p>
      </div>
      
      <p className="hint-text">
        Tap for "No" | Hold for Sekhmet Breath (16s)
      </p>
    </div>
  );
};

export default TheWard;