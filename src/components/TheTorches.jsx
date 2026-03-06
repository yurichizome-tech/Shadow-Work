import React, { useState, useEffect } from 'react';

const TheTorches = ({ onTally }) => {
    const [torchData, setTorchData] = useState(() => 
        JSON.parse(localStorage.getItem('sov_torches')) || { no: 0, silence: 0, sorry: 0, ward: 0 }
    );

    const handleTally = (type, label) => {
        const newData = { ...torchData, [type]: torchData[type] + 1 };
        setTorchData(newData);
        localStorage.setItem('sov_torches', JSON.stringify(newData));
        
        // This is the magic: Saying "No" adds 2 Copper to your bank!
        onTally('copper', 2); 
    };

    return (
        <div className="torch-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px' }}>
            <div className="torch-card" onClick={() => handleTally('no', 'Said No')}>
                <span className="glow" style={{ fontSize: '2rem', display: 'block' }}>{torchData.no}</span> NO!
            </div>
            <div className="torch-card" onClick={() => handleTally('silence', 'Held Silence')}>
                <span className="glow" style={{ fontSize: '2rem', display: 'block' }}>{torchData.silence}</span> SILENCE
            </div>
            {/* Repeat for 'sorry' and 'ward' */}
        </div>
    );
};

export default TheTorches;