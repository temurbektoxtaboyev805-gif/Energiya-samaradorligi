from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import models
from database import engine, get_db

# Bazani yaratish (Agar mavjud bo'lmasa)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="EnergoMonitor API v2")

# CORS sozlamalari (Frontend bilan bog'lanish uchun)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic sxemalar
class ApplianceBase(BaseModel):
    name: str
    power: float
    hours: float

class ApplianceCreate(ApplianceBase):
    pass

class Appliance(ApplianceBase):
    id: int

    class Config:
        orm_mode = True

@app.get("/")
async def root():
    return {"status": "online", "message": "EnergoMonitor API Azure SQL ga ulanishga tayyor"}

@app.get("/appliances", response_model=List[Appliance])
def read_appliances(db: Session = Depends(get_db)):
    return db.query(models.ApplianceModel).all()

@app.post("/appliances", response_model=Appliance)
def create_appliance(appliance: ApplianceCreate, db: Session = Depends(get_db)):
    db_app = models.ApplianceModel(**appliance.dict())
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    return db_app

@app.delete("/appliances/{app_id}")
def delete_appliance(app_id: int, db: Session = Depends(get_db)):
    db_app = db.query(models.ApplianceModel).filter(models.ApplianceModel.id == app_id).first()
    if not db_app:
        raise HTTPException(status_code=404, detail="Jihoz topilmadi")
    db.delete(db_app)
    db.commit()
    return {"message": "Jihoz o'chirildi"}

@app.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    apps = db.query(models.ApplianceModel).all()
    total_daily_kwh = sum([(a.power * a.hours) / 1000 for a in apps])
    monthly_kwh = total_daily_kwh * 30
    
    # O'zbekiston tarifi (limit 200 kVt)
    if monthly_kwh <= 200:
        cost = monthly_kwh * 450
    else:
        cost = (200 * 450) + ((monthly_kwh - 200) * 900)
        
    return {
        "monthly_kwh": round(monthly_kwh, 2),
        "total_cost": round(cost, 0),
        "appliance_count": len(apps)
    }
