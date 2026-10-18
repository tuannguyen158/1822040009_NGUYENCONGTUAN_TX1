
import { useState, useEffect } from "react";

function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Lấy danh sách ghi chú khi component được render lần đầu
  useEffect(() => {
    fetch("http://localhost:3000/api/notes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không thể lấy danh sách ghi chú");
        }
        return response.json();
      })
      .then((data) => {
        setNotes(data);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }, []);

  // Thêm ghi chú mới
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể thêm ghi chú");
      }

      const newNote = await response.json();

      // Cập nhật giao diện ngay, không cần tải lại trang
      setNotes((prevNotes) => [newNote, ...prevNotes]);

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Thêm ghi chú thất bại!");
    }
  };

  return (
    <div>
      <h1>Quản lý ghi chú</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Tiêu đề:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Nội dung:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button type="submit">Thêm Ghi Chú</button>
      </form>

      <h2>Danh sách ghi chú</h2>

      {notes.map((note) => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <small>
            {new Date(note.createdAt).toLocaleString("vi-VN")}
          </small>
        </div>
      ))}
    </div>
  );
}

export default NoteApp;
