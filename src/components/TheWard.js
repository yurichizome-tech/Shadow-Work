import React, { useState, useEffect, useRef } from 'react';

const TheWard = ({ onTally }) => {
  const [isHolding, setIsHolding] = useState(false);
  const [timer, setTimer] = useState(0);
  const [breathPhase, setBreathPhase] = useState('');
  const holdDurationRef = useRef(0); // Track how long user held

  // --- THE RITUAL LOGIC (4-4-4-4 Box Breathing) ---
  useEffect(() => {
    let interval;
    if (isHolding) {
      holdDurationRef.current = 0; // Reset on new hold
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
        holdDurationRef.current += 1;
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
      onTally('copper', 25);
      setIsHolding(false);
      alert("Ward Set. 25 Copper added to the Hoard.");
    }
  }, [timer, onTally]);

  const handleMouseUp = () => {
    setIsHolding(false);
    // Only reward quick tap if held for less than 4 seconds
    if (holdDurationRef.current < 4) {
      onTally('copper', 5);
    }
  };

  const handleTouchEnd = () => {
    setIsHolding(false);
    // Only reward quick tap if held for less than 4 seconds
    if (holdDurationRef.current < 4) {
      onTally('copper', 5);
    }
  };

  return (
    <div className="ward-action-zone">
      <div 
        className={`sekhmet-emblem ${isHolding ? 'pulsing' : ''}`}
        onContextMenu={(e) => e.preventDefault()} 
        onMouseDown={() => setIsHolding(true)}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsHolding(false)}
        onTouchStart={(e) => { e.preventDefault(); setIsHolding(true); }}
        onTouchEnd={handleTouchEnd}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
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
