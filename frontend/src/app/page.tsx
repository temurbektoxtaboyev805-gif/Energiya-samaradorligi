"use client";

import React, { useState, useEffect } from 'react';
import { 
  Bolt, 
  Zap, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Lightbulb, 
  Settings, 
  LayoutDashboard, 
  Plug, 
  BarChart3 
} from 'lucide-react';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Appliance {
  id: number;
  name: string;
  power: number;
  hours: number;
}

export default function Dashboard() {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [totalKwh, setTotalKwh] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const appRes = await fetch('https://energymonitor-api-v2.azurewebsites.net/appliances');
      const apps = await appRes.json();
      setAppliances(apps);

      const statsRes = await fetch('https://energymonitor-api-v2.azurewebsites.net/stats');
      const stats = await statsRes.json();
      setTotalKwh(stats.monthly_kwh);
      setTotalCost(stats.total_cost);
      setLoading(false);
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const lineData = {
    labels: ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'],
    datasets: [
      {
        label: 'Kunlik sarf (kVt)',
        data: [12, 15, 11, 18, 14, 22, 19],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: appliances.map(a => a.name),
    datasets: [
      {
        data: appliances.map(a => a.power * a.hours),
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col hidden md:flex">
        <div className="flex items-center gap-2 text-blue-500 font-bold text-xl mb-10">
          <Bolt size={28} />
          <span>EnergoMonitor</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Link href="/" className="flex items-center gap-3 bg-blue-600/10 text-blue-400 p-3 rounded-xl">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/appliances" className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 p-3 rounded-xl transition">
            <Plug size={20} /> Jihozlar
          </Link>
          <Link href="/analytics" className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 p-3 rounded-xl transition">
            <BarChart3 size={20} /> Tahlillar
          </Link>
          <Link href="/recommendations" className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 p-3 rounded-xl transition">
            <Lightbulb size={20} /> Tavsiyalar
          </Link>
        </nav>

        <div className="pt-6 border-t border-slate-800 text-slate-500 text-sm">
          v2.0.1 Stable
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-slate-400">Salom! Bugungi energiya sarfini kuzatib boring.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-blue-400 text-sm font-medium">
              Tarif: 450 so'm / kVt
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              U
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 transition">
            <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-blue-500 mb-4">
              <Zap size={24} />
            </div>
            <p className="text-slate-400 text-sm mb-1">Oylik sarf (kutilayotgan)</p>
            <h3 className="text-2xl font-bold">{totalKwh.toFixed(1)} kVt/s</h3>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition">
            <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-500 mb-4">
              <DollarSign size={24} />
            </div>
            <p className="text-slate-400 text-sm mb-1">Taxminiy xarajat</p>
            <h3 className="text-2xl font-bold text-emerald-400">{Math.round(totalCost).toLocaleString()} so'm</h3>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-orange-500/50 transition">
            <div className="bg-orange-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-orange-500 mb-4">
              <TrendingUp size={24} />
            </div>
            <p className="text-slate-400 text-sm mb-1">Limitgacha qoldi</p>
            <h3 className="text-2xl font-bold text-orange-400">{Math.max(0, 200 - totalKwh).toFixed(1)} kVt/s</h3>
          </div>
        </div>

        {/* Charts Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-6">Haftalik energiya sarfi</h3>
            <div className="h-64">
              <Line data={lineData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-6">Jihozlar ulushi</h3>
            <div className="h-64 flex justify-center">
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Appliance List and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Mening jihozlarim</h3>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition">
                <Plus size={16} /> Qo'shish
              </button>
            </div>
            <div className="space-y-4">
              {appliances.map(app => (
                <div key={app.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-700 p-2 rounded-lg text-blue-400">
                      <Plug size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">{app.name}</h4>
                      <p className="text-sm text-slate-400">{app.power} Vt | {app.hours} soat/kun</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-bold">{(app.power * app.hours * 30 / 1000).toFixed(1)} kVt</p>
                      <p className="text-xs text-slate-500">oyiga</p>
                    </div>
                    <button className="text-slate-500 hover:text-red-500 transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lightbulb size={20} className="text-blue-500" /> Aqlli Tavsiyalar
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                <p className="text-sm text-slate-300">
                  <span className="font-bold text-blue-400">Maslahat:</span> Konditsionerni 24°C darajada ishlatish energiya sarfini 10% gacha tejaydi.
                </p>
              </div>
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <p className="text-sm text-slate-300">
                  <span className="font-bold text-emerald-400">Tejamkorlik:</span> Sizning oylik sarfingiz limitdan chiqmagan. Yaxshi natija!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
