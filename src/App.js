import React, { useState, useEffect } from 'react';
import './App.css';
import TheEcho from './components/TheEcho'; // This looks for the Echo button you made

function App() {
  // --- THE BANK (Logic for your Shinies) ---
  const [shinies, setShinies] = useState(() => {
    // This checks your phone's memory for saved points
    const saved = localStorage.getItem('shinies_balance');
    return saved ? JSON.parse(saved) : { copper: 0, silver: 0, gold: 0, amethyst: 0 };
  });

  // This saves your points automatically every time they change
  useEffect(() => {
    localStorage.setItem('shinies_balance', JSON.stringify(shinies));
  }, [shinies]);

  // This function adds points when the Echo is silenced
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
        {/* INSERTING THE ECHO COMPONENT HERE */}
        <TheEcho onTally={addShinies} />
      </main>

      <footer className="footer-notes">
        <p>Architect: Calligo | Sovereign: Arasielle</p>
      </footer>
    </div>
  );
}

export default App;
