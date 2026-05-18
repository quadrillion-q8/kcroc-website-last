from core.database import Base
from sqlalchemy import Column, Integer, String


class Service_bookings(Base):
    __tablename__ = "service_bookings"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, nullable=False)
    customer_name = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)
    customer_email = Column(String, nullable=True)
    device_type = Column(String, nullable=False)
    issue_description = Column(String, nullable=False)
    pickup_date = Column(String, nullable=False)
    pickup_time_slot = Column(String, nullable=False)
    status = Column(String, nullable=False)
    created_at = Column(String, nullable=False)