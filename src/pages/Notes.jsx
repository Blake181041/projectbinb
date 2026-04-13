import React, { useState, useEffect } from 'react';
import '../styles/notes.css';

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Load notes from localStorage on mount
    useEffect(() => {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    }, []);

    // Save notes to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        if (title.trim() || content.trim()) {
            const newNote = {
                id: Date.now(),
                title: title || 'Untitled',
                content,
                date: new Date().toLocaleDateString(),
            };
            setNotes([newNote, ...notes]);
            setTitle('');
            setContent('');
        }
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    return (
        <div className="notes-container">
            <h1>My Notes</h1>
            
            <div className="notes-input">
                <input
                    type="text"
                    placeholder="Note title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="notes-title-input"
                />
                <textarea
                    placeholder="Write your note here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="notes-textarea"
                />
                <button onClick={addNote} className="notes-btn">Add Note</button>
            </div>

            <div className="notes-list">
                {notes.length === 0 ? (
                    <p className="no-notes">No notes yet. Create one above!</p>
                ) : (
                    notes.map(note => (
                        <div key={note.id} className="note-card">
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                            <div className="note-footer">
                                <span className="note-date">{note.date}</span>
                                <button 
                                    onClick={() => deleteNote(note.id)}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}