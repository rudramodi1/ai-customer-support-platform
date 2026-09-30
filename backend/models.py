from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from database import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, index=True)
    email = Column(String, index=True)
    issue_description = Column(Text)
    ai_summary = Column(Text, nullable=True)
    category = Column(String, index=True)
    priority = Column(String, index=True)
    status = Column(String, default="Open", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
