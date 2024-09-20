import express from "express";

const app = express();

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
