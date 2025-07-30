import React, { useEffect, useState } from "react";
import { getNotes, createNote, deleteNote } from "../services/api";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const fetchNotes = async () => {
    const { data } = await getNotes();
    setNotes(data);
  };

  const handleCreate = async () => {
    if (!title.trim()) return;
    await createNote(title, content);
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    fetchNotes();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-md flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                 <FadeLoader  color="blue" height={14} width={2}  margin={1} radius={0} />  
  Dashboard
        </h1>
        <button onClick={handleLogout} className="text-blue-600 hover:underline">
          Sign Out
        </button>
      </div>

      {/* Welcome Card */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold">Welcome, <span className="text-blue-700">User!</span></h2>
        <p className="text-gray-500">Email: xxxxxx@xxxx.com</p>
      </div>

      {/* Create Note Button */}
      <button
        onClick={handleCreate}
        className="w-full max-w-md bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 mb-3"
      >
        Create Note
      </button>

      {/* Note Input */}
      <div className="w-full max-w-md bg-white shadow p-3 rounded mb-4">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />
        <textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />
      </div>

      {/* Notes List */}
      <div className="w-full max-w-md">
        <h3 className="text-lg font-bold mb-2">Notes</h3>
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white shadow rounded p-3 mb-2 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{note.title}</p>
              <p className="text-sm text-gray-600">{note.content}</p>
            </div>
            <button onClick={() => handleDelete(note._id)} className="text-red-500 hover:text-red-700">
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
