const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

// middleware configuration
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("toy shop server is running......");
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
