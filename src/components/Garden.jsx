import React, { useState, useEffect } from 'react';

const Garden = () => {
    const [gardenData, setGardenData] = useState(() => 
        JSON.parse(localStorage.getItem('sov_garden')) || []
    );

    useEffect(() => {
        localStorage.setItem('sov_garden', JSON.stringify(gardenData));
    }, [gardenData]);

    const plantTask = () => {
        const name = prompt("New Task Name?");
        const cat = prompt("Category?") || "General";
        if (name) {
            setGardenData([...gardenData, { name, cat, subtasks: [], completed: false }]);
        }
    };

    return (
        <div className="garden-container" style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <button onClick={plantTask} className="ward-close" style={{ marginBottom: '20px', width: '100%', background: '#d4af37', color: 'black', border: 'none', padding: '10px', fontWeight: 'bold' }}>
                + PLANT NEW TASK
            </button>
            <div id="garden-list">
                {gardenData.map((task, i) => (
                    <div key={i} className="task-group" style={{ border: '1px solid #222', marginBottom: '15px', padding: '15px', background: '#0a0a0a', textAlign: 'left' }}>
                        <small style={{ color: '#d4af37', letterSpacing: '2px' }}>{task.cat.toUpperCase()}</small>
                        <h3 style={{ margin: '10px 0' }}>{task.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Garden;