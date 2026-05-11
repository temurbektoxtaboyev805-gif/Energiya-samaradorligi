from sqlalchemy import Column, Integer, String, Float
from database import Base

class ApplianceModel(Base):
    __tablename__ = "appliances"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    power = Column(Float)  # Vattlarda
    hours = Column(Float)  # Sutkadagi ish vaqti
