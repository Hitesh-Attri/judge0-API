const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const langdataRoute = require("./routes/langdataRoute");
const coderunRoute = require("./routes/coderunRoute");

const app = express();
dotenv.config();

connectDB();

app.use(express.json());

const cors = require("cors");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ msg: "get request" });
});

// app.post("/api/user", (req, res) => {
//   console.log(req.body);
//   res.json({ msg: "/api/user" });
// });

// app.post("/api/user/login", (req, res) => {
//   console.log(req.body);
//   res.json({ msg: "/api/user" });
// });

app.use("/api/user", userRoutes);
app.use("/api/langdata", langdataRoute);
app.use("/runCode", coderunRoute);
// app.use("/api/user/login", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (!err) console.log(`server running on ${PORT}`);
  else console.log("err occured", err);
});
