# AI Customer Support Automation Platform

A complete full-stack SaaS project that automates customer support using AI. Featuring an intelligent chatbot, automatic ticket generation, AI-powered issue categorization, urgency detection, and a comprehensive admin dashboard.

## 🌟 Features

1. **AI Customer Chatbot**
   - Natural language conversational interface
   - Automatically answers common questions (e.g., "Where is my order?", "How to reset password")
   - Fallback to automatic ticket creation for complex unresolved issues

2. **Automatic Ticket Creation**
   - Extracts priority, category, and issue summary from chat context

3. **AI Task Automation**
   - Categorizations: Payment, Delivery, Technical, Account, General
   - Priority Detection: High, Medium, Low based on context urgency

4. **SaaS Admin Dashboard**
   - Centralized view of all support queries
   - Statistical overview
   - Ticket status management (Open, In Progress, Resolved)
   - Category filtering

## ⚙️ Tech Stack

- **Backend:** Python FastAPI, SQLAlchemy, SQLite
- **Frontend:** React, Vite, Tailwind CSS, React Router, Lucide Icons
- **AI Models:** Groq, OpenAI, or Gemini integration via LLM APIs

## 🚀 Installation & Setup

1. **Clone the repository** (if applicable) and navigate to the project directory:
   ```bash
   cd ai-customer-support-platform
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   .\venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the `backend/` directory:
   ```env
   # Add ONE of the following keys based on your preference
   GROQ_API_KEY=your_groq_api_key
   # OPENAI_API_KEY=your_openai_api_key
   # GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

## 🏃‍♂️ How to Run

You need to run both the backend and frontend simultaneously in separate terminal windows.

**1. Run Backend:**
```bash
cd backend
# Ensure virtual environment is activated
uvicorn main:app --reload
```
The API runs at `http://localhost:8000`

**2. Run Frontend:**
```bash
cd frontend
npm run dev
```
The App runs at `http://localhost:5173`

---
*Created as part of an advanced AI support system demonstration.*
