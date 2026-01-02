import express from "express";
import cors from "cors";
import { generate } from "./chatbot.js";

const app = express();
const PORT = process.env.PORT || 3001;
app.use(
  cors({
    origin: "https://genai-chatbot-six.vercel.app",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello from the backend server!");
});

app.post("/chat", async (req, res) => {
  const { message, threadId } = req.body;

  //todo: validate above fields

  if (!message || !threadId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log(`Received message: ${message}`);

  const result = await generate(message, threadId);
  res.json({ message: result });
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
