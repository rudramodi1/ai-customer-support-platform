from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import chatbot, tickets

# Create DB Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Customer Support API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chatbot.router)
app.include_router(tickets.router)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "AI Customer Support API is running"}
