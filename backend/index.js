const connectToMongo = require("./Database/db");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

// Connect to MongoDB
connectToMongo();

// Set port
const port = process.env.PORT || 5000;

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_API_LINK || 'http://localhost:3000',  // Use frontend API link from env or default to localhost
  credentials: true  // Include credentials if you're using cookies or sessions
}));

// Body parser middleware
app.use(express.json());  // To convert request data to JSON

// Test route
app.get("/", (req, res) => {
  res.send("Hello 👋 I am Working Fine 🚀");
});

// Serve static media files
app.use('/media', express.static(path.join(__dirname, 'media')));

// Credential APIs
app.use("/api/student/auth", require("./routes/Student Api/credential.route"));
app.use("/api/faculty/auth", require("./routes/Faculty Api/credential.route"));
app.use("/api/admin/auth", require("./routes/Admin Api/credential.route"));

// Details APIs
app.use("/api/student/details", require("./routes/Student Api/details.route"));
app.use("/api/faculty/details", require("./routes/Faculty Api/details.route"));
app.use("/api/admin/details", require("./routes/Admin Api/details.route"));

// Other APIs
app.use("/api/timetable", require("./routes/Other Api/timetable.route"));
app.use("/api/material", require("./routes/Other Api/material.route"));
app.use("/api/notice", require("./routes/Other Api/notice.route"));
app.use("/api/subject", require("./routes/Other Api/subject.route"));
app.use("/api/marks", require("./routes/Other Api/marks.route"));
app.use("/api/branch", require("./routes/Other Api/branch.route"));

// Start server
app.listen(port, () => {
  console.log(`Server Listening On http://localhost:${port}`);
});
