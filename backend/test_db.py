import pyodbc
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')

DB_SERVER = os.getenv("DB_SERVER")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")

conn_str = (
    f"Driver={{ODBC Driver 18 for SQL Server}};"
    f"Server=tcp:{DB_SERVER},1433;"
    f"Database={DB_NAME};"
    f"Uid={DB_USER};"
    f"Pwd={DB_PASS};"
    f"Encrypt=yes;"
    f"TrustServerCertificate=no;"
    f"Connection Timeout=30;"
)

try:
    print(f"Serverga ulanishga urinish: {DB_SERVER}...")
    conn = pyodbc.connect(conn_str)
    print("Azure SQL ulanishi muvaffaqiyatli! ✅")
    conn.close()
except Exception as e:
    print(f"Xatolik yuz berdi: {e}")
