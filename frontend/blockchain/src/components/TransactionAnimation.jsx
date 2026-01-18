import React, { useEffect, useState } from "react";
import "../assets/Transaction.css";


const TransactionNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNote = {
        id: Math.random(),
        left: Math.random() * 90 + "%",
        duration: 4 + Math.random() * 3,
      };
      setNotes((prev) => [...prev, newNote]);

      // remove old notes
      setTimeout(() => {
        setNotes((prev) => prev.filter((n) => n.id !== newNote.id));
      }, (newNote.duration + 0.5) * 1000);
    }, 500); // har 0.5 sec new note

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notes-bg">
      {notes.map((note) => (
        <span
          key={note.id}
          className="note"
          style={{
            left: note.left,
            animationDuration: `${note.duration}s`,
          }}
        >
          💵
        </span>
      ))}
    </div>
  );
};

export default TransactionNotes;
