"use client";
import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Plug, BarChart3, Lightbulb, ArrowLeft, Bolt } from 'lucide-react';

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col hidden md:flex">
        <div className="flex items-center gap-2 text-blue-500 font-bold text-xl mb-10">
          <Bolt size={28} /> <span>EnergoMonitor</span>
        </div>
        <nav className="space-y-2 flex-1">
          <Link href="/" className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 p-3 rounded-xl transition">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/appliances" className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 p-3 rounded-xl transition">
            <Plug size={20} /> Jihozlar
          </Link>
          <Link href="/analytics" className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 p-3 rounded-xl transition">
            <BarChart3 size={20} /> Tahlillar
          </Link>
          <Link href="/recommendations" className="flex items-center gap-3 bg-blue-600/10 text-blue-400 p-3 rounded-xl">
            <Lightbulb size={20} /> Tavsiyalar
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <header className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 hover:bg-slate-800 rounded-lg transition"><ArrowLeft size={24} /></Link>
          <h1 className="text-3xl font-bold">Aqlli Tavsiyalar</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl border-l-4 border-l-blue-500">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-blue-400">
              <Lightbulb size={20} /> Konditsioner
            </h3>
            <p className="text-slate-400 text-sm">Konditsionerni 24°C darajada ishlatish eng maqbul variant hisoblanadi. Har bir daraja pasayishi sarfni 5-10% ga oshiradi.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl border-l-4 border-l-emerald-500">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-emerald-400">
              <Plug size={20} /> Kutish rejimi (Standby)
            </h3>
            <p className="text-slate-400 text-sm">Jihozlarni ishlatmayotganda rozetkadan sug'urib qo'ying. Kutish rejimida qolgan jihozlar yiliga o'rtacha 100 kVt gacha ortiqcha sarf qilishi mumkin.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl border-l-4 border-l-orange-500">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-orange-400">
              <Bolt size={20} /> Muzlatgich
            </h3>
            <p className="text-slate-400 text-sm">Muzlatgichni quyosh tushadigan yoki issiq joyga qo'ymang. Orqasidagi panjaralarni changdan tozalab turing, bu sarfni 15% ga kamaytiradi.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
