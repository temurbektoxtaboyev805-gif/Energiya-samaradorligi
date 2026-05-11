"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bolt, 
  Plug, 
  Plus, 
  Trash2, 
  LayoutDashboard, 
  BarChart3, 
  Lightbulb, 
  ArrowLeft 
} from 'lucide-react';

interface Appliance {
  id: number;
  name: string;
  power: number;
  hours: number;
}

export default function AppliancesPage() {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [name, setName] = useState('');
  const [power, setPower] = useState('');
  const [hours, setHours] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAppliances = () => {
    const saved = localStorage.getItem('appliances');
    if (saved) {
      setAppliances(JSON.parse(saved));
    } else {
      const demoApps = [
        { id: 1, name: 'Muzlatgich', power: 150, hours: 24 },
        { id: 2, name: 'Televizor', power: 100, hours: 5 },
        { id: 3, name: 'Konditsioner', power: 1500, hours: 4 },
        { id: 4, name: 'Chiroqlar', power: 50, hours: 6 },
        { id: 5, name: 'Dazmol', power: 2000, hours: 0.5 }
      ];
      setAppliances(demoApps);
      localStorage.setItem('appliances', JSON.stringify(demoApps));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppliances();
  }, []);

  const addAppliance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !power || !hours) return;

    const newApp = {
      id: Date.now(),
      name,
      power: parseFloat(power),
      hours: parseFloat(hours)
    };

    const updated = [...appliances, newApp];
    setAppliances(updated);
    localStorage.setItem('appliances', JSON.stringify(updated));
    
    setName('');
    setPower('');
    setHours('');
  };

  const deleteAppliance = (id: number) => {
    const updated = appliances.filter(a => a.id !== id);
    setAppliances(updated);
    localStorage.setItem('appliances', JSON.stringify(updated));
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
          <Link href="/" className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 p-3 rounded-xl transition">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/appliances" className="flex items-center gap-3 bg-blue-600/10 text-blue-400 p-3 rounded-xl">
            <Plug size={20} /> Jihozlar
          </Link>
          <Link href="/analytics" className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 p-3 rounded-xl transition">
            <BarChart3 size={20} /> Tahlillar
          </Link>
          <Link href="/recommendations" className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 p-3 rounded-xl transition">
            <Lightbulb size={20} /> Tavsiyalar
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 hover:bg-slate-800 rounded-lg transition">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Jihozlarni boshqarish</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Form */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit">
            <h3 className="text-lg font-semibold mb-6">Yangi jihoz qo'shish</h3>
            <form onSubmit={addAppliance} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Jihoz nomi</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-blue-500"
                  placeholder="Masalan: Muzlatgich"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Quvvati (Vt)</label>
                  <input 
                    type="number" 
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-blue-500"
                    placeholder="200"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Ish vaqti (soat)</label>
                  <input 
                    type="number" 
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-blue-500"
                    placeholder="24"
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition mt-4 flex items-center justify-center gap-2">
                <Plus size={20} /> Qo'shish
              </button>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-6">Mavjud jihozlar ro'yxati</h3>
            <div className="space-y-4">
              {loading ? (
                <p className="text-slate-500">Yuklanmoqda...</p>
              ) : appliances.length === 0 ? (
                <p className="text-slate-500 text-center py-10">Hozircha jihozlar yo'q. Yangi qo'shing!</p>
              ) : (
                appliances.map(app => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-700 p-2 rounded-lg text-blue-400">
                        <Plug size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">{app.name}</h4>
                        <p className="text-sm text-slate-400">{app.power} Vt | {app.hours} soat/sutka</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-bold text-xl text-blue-400">{(app.power * app.hours * 30 / 1000).toFixed(1)} kVt</p>
                        <p className="text-xs text-slate-500">oylik sarf</p>
                      </div>
                      <button 
                        onClick={() => deleteAppliance(app.id)}
                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
