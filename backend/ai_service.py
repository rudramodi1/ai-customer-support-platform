import os
from pydantic import BaseModel
from dotenv import load_dotenv
import json

load_dotenv()

# We will support multiple AI providers depending on the API Key present
# To keep things simple we will start with Groq, then OpenAI, then Gemini.

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def get_llm_response(system_prompt: str, user_prompt: str) -> str:
    if GROQ_API_KEY:
        from groq import Groq
        client = Groq(api_key=GROQ_API_KEY)
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model="llama3-8b-8192",
        )
        return chat_completion.choices[0].message.content
        
    elif OPENAI_API_KEY:
        from openai import OpenAI
        client = OpenAI(api_key=OPENAI_API_KEY)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ]
        )
        return response.choices[0].message.content
        
    elif GEMINI_API_KEY:
        import google.generativeai as genai
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(f"{system_prompt}\n\nUser: {user_prompt}")
        return response.text
        
    else:
        # Fallback if no API key is provided
        return "No AI API key configured. Please set GROQ_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY."

def process_customer_query(message: str) -> dict:
    """
    Analyzes the user message, attempts to answer it, and extracts metadata for ticket creation if unresolved.
    Returns a dict with 'response', 'needs_ticket', 'category', 'priority', 'summary'.
    """
    system_prompt = """You are an AI customer support assistant. 
Your goal is to answer the customer's query if possible. 
If the issue is complex and requires human intervention (like payment failure, account locked, etc), you must indicate that a ticket should be created.
You must return your response as a JSON object with the following schema:
{
  "response": "Your message to the customer (helpful answer, or stating you are creating a ticket)",
  "needs_ticket": true/false (boolean),
  "category": "One of: Payment issue, Delivery issue, Technical issue, Account issue, General inquiry",
  "priority": "One of: High, Medium, Low",
  "summary": "A short 1 sentence summary of the issue (or null if no ticket needed)"
}
"""
    try:
        res = get_llm_response(system_prompt, message)
        # Strip markdown if present
        if res.startswith("```json"):
            res = res.replace("```json", "").replace("```", "").strip()
        data = json.loads(res)
        return data
    except Exception as e:
        print(f"Error parsing AI response: {e}")
        # Default fallback
        return {
            "response": "I'm having trouble understanding. Let me create a support ticket for you.",
            "needs_ticket": True,
            "category": "General inquiry",
            "priority": "Medium",
            "summary": message
        }
