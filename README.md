# 🤖 GenAI Web Chatbot with Tool Calling & Web Search

A **production-ready Generative AI chatbot** built using modern LLM tooling, prompt engineering, and function calling.  
This chatbot supports **real-time web search**, **conversation memory**, and is fully deployed with a **separate frontend and backend architecture**.

---

## 🚀 Live Deployment

- **Frontend (Vercel):**  
  https://genai-chatbot-six.vercel.app

- **Backend (Render):**  
  https://genai-chatbot-8trf.onrender.com

---

## 📌 Project Overview

This project is a **GenAI-powered conversational assistant** designed to answer user queries intelligently by:

- Maintaining **conversation context (thread-based memory)**
- Dynamically deciding when to **call external tools**
- Fetching **real-time information from the web**
- Using **prompt engineering** to control LLM behavior
- Caching conversations for better performance

Unlike basic chatbots, this system uses **LLM function calling** to enhance answers with live data when required.

---

## ✨ Key Features

### 🔹 Conversational Memory (Thread-Based)
- Each user session is assigned a **unique threadId**
- Previous messages are cached using **NodeCache**
- Enables **context-aware, multi-turn conversations**

---

### 🔹 Prompt Engineering
- A carefully designed **system prompt** guides the LLM behavior
- Ensures:
  - Clear, relevant responses
  - Tool usage only when necessary
  - Awareness of **current date and time**

---

### 🔹 Function Calling (Tool Use)
- The LLM can automatically decide to call tools
- Implemented using **Groq function calling**
- Supported tool:
  - `webSearch(query)` → fetches real-time information

---

### 🔹 Real-Time Web Search (Tavily API)
- Uses **Tavily Search API** to retrieve latest data
- Web results are injected back into the LLM conversation
- Allows answering questions that require **up-to-date information**

---

### 🔹 Intelligent Tool Selection
- LLM decides:
  - ❌ No tool needed → responds directly
  - ✅ Tool needed → calls webSearch → processes result → answers
- This avoids unnecessary API calls and improves efficiency

---

### 🔹 Caching for Performance
- Conversation history cached per thread
- Cache TTL: **24 hours**
- Reduces repeated LLM calls
- Improves response time and cost efficiency

---

### 🔹 Clean UI with Loading State
- Simple **HTML + JavaScript frontend**
- Chat UI with:
  - User messages
  - Bot responses
  - “Thinking” loading indicator

---

## 🧠 How It Works (Architecture)


```text
User Browser
└── Frontend (HTML + JavaScript)
    ├── Hosted on Vercel
    └── Backend (Node.js + Express)
        ├── Hosted on Render
        └── Groq LLM (LLaMA Model)
            └── Tavily Web Search API
                (used only if web data is needed)
```

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- Vanilla JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- Groq SDK
- Tavily API
- NodeCache
- dotenv
- CORS

### LLM & AI
- **Groq LLM**
- Model: `meta-llama/llama-4-scout-17b-16e-instruct`
- Prompt engineering
- Function calling (tool calling)

### Deployment
- **Frontend:** Vercel
- **Backend:** Render

---

## 🔐 Environment Variables

Create a `.env` file in the backend root:

```env
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key

npm install
node server.js
```

Frontend

Open frontend/index.html in your browser
(or serve it using a local server)

```
GENAI/
├── frontend/
│   ├── index.html
│   ├── script.js
│
├── server.js
├── chatbot.js
├── package.json
├── .env
└── README.md
```

## 📈 What I Learned

- Real-world GenAI system design and architecture
- Prompt engineering for controllable and predictable AI behavior
- LLM function calling and external tool integration
- Thread-based conversation memory handling
- Debugging production issues (CORS, ports, deployment crashes)
- Secure environment variable and secrets management
- Full-stack deployment using **Render** (backend) and **Vercel** (frontend)

---

## 📌 Future Improvements

- Streaming AI responses (token-by-token output)
- Rate limiting and robust input validation
- User authentication and authorization
- Persistent database storage for chat history and user data
- Improved error handling and observability (logs & monitoring)
- Caching layer to reduce latency and API costs
- Multi-model support and dynamic model switching

---

## 🧑‍💻 Author

## 🧑‍💻 Author

**Savan Kansagara**  
Full Stack Developer | GenAI Engineer  

- 📞 Phone: 9904269930  
- 📧 Email: important.savan@gmail.com
- 💼 LinkedIn: https://www.linkedin.com/in/savan-kansagara  


