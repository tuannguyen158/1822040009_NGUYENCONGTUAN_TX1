
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const noteRoutes = require("./routes/notes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Da ket noi MongoDB");

    app.listen(PORT, () => {
      console.log(`Server dang chay tai http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Loi ket noi MongoDB:", error.message);
    process.exit(1);
  });
