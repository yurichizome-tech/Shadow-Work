import React, { useState } from 'react';
import './style.css';
import TheEcho from './components/TheEcho'; 
import TheWard from './components/TheWard'; 
import TheTorches from './components/TheTorches';
import TheVoid from './components/TheVoid';
import Garden from './components/Garden';

function App() {
  const [activeTab, setActiveTab] = useState('ward'); 
  const [shinies, setShinies] = useState({ copper: 475, silver: 0, gold: 0 });

  const addShinies = (type, amount) => {
    setShinies(prev => ({ ...prev, [type]: prev[type] + amount }));
  };

  return (
    <div className="ward-container">
      <nav className="nav-bar">
        <button onClick={() => setActiveTab('torches')} className={activeTab === 'torches' ? 'active' : ''}>TORCHES</button>
        <button onClick={() => setActiveTab('ward')} className={activeTab === 'ward' ? 'active' : ''}>THE WARD</button>
        <button onClick={() => setActiveTab('garden')} className={activeTab === 'garden' ? 'active' : ''}>GARDEN</button>
        <button onClick={() => setActiveTab('void')} className={activeTab === 'void' ? 'active' : ''}>THE VOID</button>
      </nav>

      <div className="stats">
        COPPER: <span className="shiny-count">{shinies.copper}</span>
      </div>

      <main>
        {activeTab === 'torches' && <TheTorches onTally={addShinies} />}
        {activeTab === 'ward' && (
          <>
            <TheEcho onTally={addShinies} />
            <TheWard onTally={addShinies} />
          </>
        )}
        {activeTab === 'garden' && <Garden />}
        {activeTab === 'void' && <TheVoid />}
      </main>
    </div>
  );
}

export default App;