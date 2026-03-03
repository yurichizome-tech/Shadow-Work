// Top of App.js
import React, { useState, useEffect } from 'react';
import TheEcho from './components/TheEcho';

function App() {
  // Load Shinies from localStorage so they persist after refresh
  const [shinies, setShinies] = useState(() => {
    const saved = localStorage.getItem('shinies_balance');
    return saved ? JSON.parse(saved) : { copper: 0, silver: 0, gold: 0, amethyst: 0 };
  });

  // Save to localStorage whenever the balance changes
  useEffect(() => {
    localStorage.setItem('shinies_balance', JSON.stringify(shinies));
  }, [shinies]);

  const addShinies = (type, amount) => {
    setShinies(prev => ({
      ...prev,
      [type]: prev[type] + amount
    }));
  };

  .echo-wrapper {
  margin-top: 50px;
}

.progress-container {
  width: 100%;
  height: 10px;
  background: #222;
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #FFD700; /* Gold progress */
  transition: width 0.05s linear;
}

.active-hold {
  transform: scale(0.95);
  border-color: #FFD700 ! from;
}
  
  return (
    <div className="ward-container">
      <h1>Book of Shadows</h1>
      <div className="stats">
        <p>Copper: {shinies.copper}</p>
      </div>
      
      {/* This is where the Echo button lives */}
      <TheEcho onTally={addShinies} />
    </div>
  );
}
