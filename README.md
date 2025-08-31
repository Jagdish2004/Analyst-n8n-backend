# 🧠 AI-Powered Database Agent (Backend)

This repository contains the **backend** for interacting with n8n AI agent that securely interacts with databases to assist in **query generation, data analysis, reporting, and email notifications**.  
The system is designed to be safe (currently restricted to read-only SELECT queries) while offering extensibility for future features.

Live Link: [ https://superanalyst-six.vercel.app/](https://superanalyst-six.vercel.app/)

frontend Repo: [Analyst-n8n-frontend](https://github.com/Jagdish2004/Analyst-n8n-frontend)

---

## 🏗️ System Architecture
The backend is connected to an **n8n container** which manages workflows such as query execution, email sending, and context storage.

📌 Architecture diagram:  
<img width="1105" height="502" alt="Screenshot 2025-08-31 134842" src="https://github.com/user-attachments/assets/5ef27e35-148e-4099-ab20-693122249d24" />

---

## 🎥 Demo Video
Check out the demo and walkthrough video here:  
[Video Link](https://www.linkedin.com/posts/jagdish2004_ai-automation-database-activity-7367884548497502208-r6nX?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD-K8j4BqZkOJdjqptf5y6jKutScDrDIYkY)


---

## ✨ Features
- Secure database interaction with **read-only (SELECT) queries**
- Generate and store schema metadata
- Natural language → SQL query generation
- Execute queries and return results
- Bulk email notifications (via SMTP)
- Context management (stores executed tasks for continuity)
- Integration with **n8n workflows** for orchestration

---

## ⚙️ Tech Stack
- **Frontend**: React  
- **Backend**: Node.js (Express)  
- **Database**: PostgreSQL  
- **Orchestration**: n8n (Docker, exposed via ngrok)  
- **AI Models**: Gemini Chat (primary) + Ollama GPT OSS 20B (fallback)  
- **AI Agent Tools**: PostgreSQL, Webhooks, SMTP Email Sender, Schema Generator, Query Generator, Query Executor  

---



