from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
from models import Ticket
from ai_service import process_customer_query

router = APIRouter(prefix="/api/chat", tags=["chatbot"])

class ChatRequest(BaseModel):
    customer_name: str
    email: str
    message: str

class ChatResponse(BaseModel):
    response: str
    ticket_created: bool
    ticket_id: int | None = None

@router.post("/", response_model=ChatResponse)
def handle_chat(request: ChatRequest, db: Session = Depends(get_db)):
    ai_result = process_customer_query(request.message)
    
    ticket_id = None
    ticket_created = ai_result.get("needs_ticket", False)
    
    if ticket_created:
        new_ticket = Ticket(
            customer_name=request.customer_name,
            email=request.email,
            issue_description=request.message,
            ai_summary=ai_result.get("summary", "Automated ticket summary"),
            category=ai_result.get("category", "General inquiry"),
            priority=ai_result.get("priority", "Low")
        )
        db.add(new_ticket)
        db.commit()
        db.refresh(new_ticket)
        ticket_id = new_ticket.id
        
    return {
        "response": ai_result.get("response", "Thank you for reaching out."),
        "ticket_created": ticket_created,
        "ticket_id": ticket_id
    }
