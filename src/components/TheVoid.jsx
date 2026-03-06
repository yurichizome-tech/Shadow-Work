import React, { useState, useRef } from 'react';

const TheVoid = () => {
    const [isFeeding, setIsFeeding] = useState(false);
    const [thought, setThought] = useState('');
    const [message, setMessage] = useState('');
    
    // Using refs for audio so they load once and are ready
    const murderSound = useRef(new Audio('/crow-murder-caw.mp3'));
    const singleSound = useRef(new Audio('/single-crow-caw.mp3'));

    const feedCrows = () => {
        if (!thought.trim()) return;

        setIsFeeding(true);
        murderSound.current.currentTime = 0;
        murderSound.current.play().catch(() => console.log("Audio interaction needed"));

        // The 7-second ritual from your original code
        setTimeout(() => {
            singleSound.current.currentTime = 0;
            singleSound.current.play().catch(() => {});
            
            setIsFeeding(false);
            setThought('');
            setMessage("The silence returns.");
        }, 7000);
    };

    return (
        <div className={`void-room ${isFeeding ? 'crow-active' : ''}`}>
            <div id="void-content" style={{ opacity: isFeeding ? 0 : 1, transition: 'opacity 1.5s' }}>
                <h2 style={{ color: '#222', letterSpacing: '12px' }}>THE VOID</h2>
                <textarea 
                    id="void-input" 
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    placeholder="Release to the crows..."
                />
                <div style={{ marginTop: '20px' }}>
                    <button onClick={feedCrows} className="void-btn">FEED THE CROWS</button>
                </div>
                <p id="void-msg">{message}</p>
            </div>
            {isFeeding && <div className="crow-overlay-gif"></div>}
        </div>
    );
};

export default TheVoid;