from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Ticket
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter(prefix="/api/tickets", tags=["tickets"])

class TicketUpdate(BaseModel):
    status: str

class TicketCreate(BaseModel):
    customer_name: str
    email: str
    issue_description: str

def auto_categorize(description: str):
    description = description.lower()
    if "payment" in description or "failed" in description:
        return {"category": "Payment", "priority": "High"}
    elif "login" in description or "account" in description or "password" in description:
        return {"category": "Account", "priority": "Medium"}
    elif "delivery" in description or "shipping" in description:
        return {"category": "Delivery", "priority": "Medium"}
    elif "technical" in description or "error" in description or "bug" in description:
        return {"category": "Technical", "priority": "High"}
    else:
        return {"category": "General inquiry", "priority": "Low"}

@router.post("/")
def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    analysis = auto_categorize(ticket.issue_description)
    
    new_ticket = Ticket(
        customer_name=ticket.customer_name,
        email=ticket.email,
        issue_description=ticket.issue_description,
        category=analysis["category"],
        priority=analysis["priority"],
        ai_summary="Automatically generated from description.",
        status="Open"
    )
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket

@router.get("/")
def get_tickets(db: Session = Depends(get_db)):
    return db.query(Ticket).order_by(Ticket.created_at.desc()).all()

@router.get("/{ticket_id}")
def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@router.patch("/{ticket_id}")
def update_ticket(ticket_id: int, ticket_update: TicketUpdate, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    ticket.status = ticket_update.status
    db.commit()
    db.refresh(ticket)
    return ticket
