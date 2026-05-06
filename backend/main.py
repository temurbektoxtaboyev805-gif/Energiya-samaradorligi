from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="EnergoMonitor API")

# Ma'lumotlar modeli
class Appliance(BaseModel):
    id: Optional[int] = None
    name: str
    power: float
    hours: float

# Vaqtinchalik ma'lumotlar (Baza ulanguncha)
db_appliances = [
    {"id": 1, "name": "Muzlatgich", "power": 150, "hours": 24},
    {"id": 2, "name": "Konditsioner", "power": 2000, "hours": 4}
]

@app.get("/")
async def root():
    return {"message": "EnergoMonitor API ishlamoqda"}

@app.get("/appliances", response_model=List[Appliance])
async def get_appliances():
    return db_appliances

@app.post("/appliances")
async def add_appliance(appliance: Appliance):
    new_app = appliance.dict()
    new_app["id"] = len(db_appliances) + 1
    db_appliances.append(new_app)
    return new_app

@app.get("/stats")
async def get_stats():
    total_kwh = sum([(a["power"] * a["hours"]) / 1000 for a in db_appliances]) * 30
    return {
        "total_monthly_kwh": total_kwh,
        "estimated_cost": total_kwh * 450,  # 450 so'mdan hisoblanganda
        "appliance_count": len(db_appliances)
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
