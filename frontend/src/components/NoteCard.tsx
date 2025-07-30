import React from "react";

const NoteCard: React.FC<{ note: any; onDelete: () => void }> = ({ note, onDelete }) => (
  <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
    <h3>{note.title}</h3>
    <p>{note.content}</p>
    <button onClick={onDelete}>Delete</button>
  </div>
);

export default NoteCard;
