import os
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from dotenv import load_dotenv

load_dotenv()

# Azure SQL Connection String (Environment variables'dan olinadi)
DB_SERVER = os.getenv("DB_SERVER", "your-server.database.windows.net")
DB_NAME = os.getenv("DB_NAME", "your-db")
DB_USER = os.getenv("DB_USER", "your-username")
DB_PASS = os.getenv("DB_PASS", "your-password")
# Linux (Azure) va Windows uchun drayver nomini moslashtirish
if os.name == 'nt':
    DB_DRIVER = "{ODBC Driver 18 for SQL Server}"
else:
    DB_DRIVER = "ODBC Driver 18 for SQL Server"

connection_string = f"Driver={DB_DRIVER};Server=tcp:{DB_SERVER},1433;Database={DB_NAME};Uid={DB_USER};Pwd={DB_PASS};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
connection_url = f"mssql+pyodbc:///?odbc_connect={connection_string}"

engine = create_engine(connection_url, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
