import React, { useState } from 'react';

export default function Terminal() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleCommandSubmit = (e) => {
        e.preventDefault();
        
        // Simulate basic commands
        let response = '';
        if (input === 'help') {
            response = 'Available commands: help, clear, echo [text]';
        } else if (input === 'clear') {
            setOutput([]);
            setInput('');
            return;
        } else if (input.startsWith('echo ')) {
            response = input.slice(5); // Output the text after "echo "
        } else {
            response = `'${input}' is not recognized as a command`;
        }

        setOutput((prevOutput) => [...prevOutput, `$ ${input}`, response]);
        setInput('');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', height: '100vh', backgroundColor: '#111827', color: '#a0b0c8', padding: '20px', fontFamily: 'monospace' }}>
            <h1 style={{ color: '#a0b0c8', marginBottom: '20px' }}>Terminal</h1>
            <div style={{ maxHeight: '70vh', overflowY: 'auto', width: '100%', marginBottom: '10px' }}>
                {output.map((line, index) => (
                    <div key={index} style={{ marginBottom: '5px' }}>{line}</div>
                ))}
            </div>
            <form onSubmit={handleCommandSubmit} style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px', color: '#34d399' }}>$</span>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#333',
                            border: 'none',
                            color: '#a0b0c8',
                            fontSize: '16px',
                            borderRadius: '5px',
                        }}
                        autoFocus
                    />
                </div>
            </form>
        </div>
    );
}