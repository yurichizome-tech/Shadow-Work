import React, { useState, useEffect } from 'react';
import './style.css';
import TheEcho from './components/TheEcho'; 
// Note: We will create 'TheWard' next to handle the Sekhmet Ritual
import TheWard from './components/TheWard'; 

function App() {
  // --- THE BANK (Logic for your Shinies) ---
  const [shinies, setShinies] = useState(() => {
    const saved = localStorage.getItem('shinies_balance');
    // ARCHITECT'S NOTE: Hard-coding the floor to 475 Copper
    return { copper: 475, silver: 0, gold: 0, amethyst: 0 };
  }); // <--- THIS WAS MISSING

  useEffect(() => {
    localStorage.setItem('shinies_balance', JSON.stringify(shinies));
  }, [shinies]);

  const addShinies = (type, amount) => {
    setShinies(prev => ({
      ...prev,
      [type]: prev[type] + amount
    }));
  };

  return (
    <div className="ward-container">
      <header>
        <h1>BOOK OF SHADOWS</h1>
        <div className="torch-aura"></div>
      </header>

      {/* THE BANK DISPLAY */}
      <div className="stats">
        <p>COPPER: <span className="shiny-count">{shinies.copper}</span></p>
      </div>

      <main>
        {/* THE ECHO: For repelling intrusive voices */}
        <TheEcho onTally={addShinies} />
        
        {/* THE WARD: This is where we will place the Sekhmet Ritual next */}
        <TheWard onTally={addShinies} />
      </main>

      <footer className="footer-notes">
        <p>Architect: Calligo | Sovereign: Arasielle</p>
      </footer>
    </div>
  );
}

/* --- THE TREASURY DISPLAY --- */
.stats {
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 2px solid #cd7f32; /* Bronze color */
  text-align: center;
  margin-bottom: 20px;
}

.shiny-count {
  color: #cd7f32;
  font-weight: bold;
  font-size: 1.5rem;
}

/* --- THE WARD ACTION ZONE --- */
.ward-action-zone {
  margin-top: 30px;
  text-align: center;
}

.sekhmet-emblem {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  background: #4a0404; /* Deep Blood Red */
  border: 4px solid #cd7f32;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.sekhmet-emblem.pulsing {
  box-shadow: 0 0 20px #ff4500;
  transform: scale(1.1);
}

.hint-text {
  font-size: 0.8rem;
  color: #888;
  margin-top: 10px;
}

export default App;