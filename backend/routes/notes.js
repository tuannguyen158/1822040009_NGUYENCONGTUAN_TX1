
const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

// GET /api/notes: Lấy tất cả ghi chú, mới nhất lên đầu
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách ghi chú"
    });
  }
});

// POST /api/notes: Tạo ghi chú mới
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = new Note({
      title,
      content
    });

    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({
      message: "Không thể tạo ghi chú",
      error: error.message
    });
  }
});

module.exports = router;
