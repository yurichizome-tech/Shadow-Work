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

export default App;