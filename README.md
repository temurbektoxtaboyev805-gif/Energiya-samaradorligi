# ⚡ EnergoMonitor — Uy xo'jaligi elektr energiyasi sarfini monitoring qilish tizimi

[![Deploy](https://img.shields.io/badge/Live%20Site-Azure-blue?style=for-the-badge&logo=microsoft-azure)](https://proud-cliff-0659fea03.7.azurestaticapps.net)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/temurbektoxtaboyev805-gif/Energiya-samaradorligi)

## 🌐 Jonli sayt
**https://proud-cliff-0659fea03.7.azurestaticapps.net**

---

## 📌 Loyiha haqida

**EnergoMonitor** — uy xo'jaligi elektr energiyasi sarfini nazorat qilish va xarajatlarni hisoblash uchun mo'ljallangan zamonaviy veb-tizim.

O'zbekistonda **ijtimoiy norma** tizimi bo'yicha:
- 0–200 kVt/soat: **450 so'm/kVt**
- 200 kVt/soatdan oshsa: **900 so'm/kVt** (2 barobar qimmat)

Bu tizim foydalanuvchiga oylik sarfni oldindan bilish va **50,000–200,000 so'm** tejash imkonini beradi.

---

## 🚀 Asosiy funksiyalar

- ✅ Elektr jihozlarini ro'yxatga olish
- ✅ Oylik sarfni kVt/soatda hisoblash
- ✅ O'zbekiston tariflari bo'yicha xarajatni so'mda ko'rsatish
- ✅ Ijtimoiy normaga qancha qolganini real vaqtda kuzatish
- ✅ Grafik va diagrammalar orqali vizualizatsiya
- ✅ Energiya tejash bo'yicha aqlli tavsiyalar

---

## 🛠️ Texnologiyalar

### Frontend
| Texnologiya | Versiya |
|-------------|---------|
| Next.js | 14+ |
| TypeScript | 5+ |
| Tailwind CSS | 3+ |
| Chart.js | 4+ |

### Backend
| Texnologiya | Versiya |
|-------------|---------|
| Python | 3.11 |
| FastAPI | 0.100+ |
| SQLAlchemy | 2.0+ |

### Bulutli xizmatlar
| Xizmat | Vazifa |
|--------|--------|
| Azure Static Web Apps | Frontend hosting |
| Azure Web App Service | Backend hosting |
| Azure SQL Database | Ma'lumotlar bazasi |
| GitHub Actions | CI/CD |

---

## 📁 Loyiha tuzilmasi

```
Energiya-samaradorligi/
├── frontend/                    # Next.js frontend
│   └── src/app/
│       ├── page.tsx            # Dashboard
│       ├── appliances/         # Jihozlar boshqaruvi
│       ├── analytics/          # Tahlillar
│       └── recommendations/    # Tavsiyalar
├── backend/                    # FastAPI backend
│   ├── main.py                # API endpointlari
│   ├── database.py            # Baza ulanishi
│   ├── models.py              # Ma'lumot sxemasi
│   └── requirements.txt       # Python kutubxonalari
└── .github/workflows/          # CI/CD konfiguratsiya
```

---

## ⚙️ Mahalliy ishga tushirish

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📊 Hisoblash algoritmi

```
Kunlik sarf (kVt) = Quvvat (Vt) × Soat / 1000
Oylik sarf = Kunlik sarf × 30

Xarajat:
  ≤ 200 kVt → × 450 so'm
  > 200 kVt → (200×450) + (ortiqcha×900) so'm
```

---

## 👨‍💻 Ishlab chiquvchi

Kurs ishi sifatida ishlab chiqilgan — **2026-yil**

**Ma'lumotlar bazasi:** Azure SQL Database (`sql-energymonitor-v3.database.windows.net`)
