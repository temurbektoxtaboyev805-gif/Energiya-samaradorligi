"use client";
import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Plug, BarChart3, Lightbulb, ArrowLeft, Bolt } from 'lucide-react';

export default function AnalyticsPage() {
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
          <Link href="/analytics" className="flex items-center gap-3 bg-blue-600/10 text-blue-400 p-3 rounded-xl">
            <BarChart3 size={20} /> Tahlillar
          </Link>
          <Link href="/recommendations" className="flex items-center gap-3 text-slate-400 hover:bg-slate-800 p-3 rounded-xl transition">
            <Lightbulb size={20} /> Tavsiyalar
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <header className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 hover:bg-slate-800 rounded-lg transition"><ArrowLeft size={24} /></Link>
          <h1 className="text-3xl font-bold">Tahlillar</h1>
        </header>
        <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center">
          <BarChart3 size={64} className="mx-auto text-slate-700 mb-6" />
          <h2 className="text-xl font-semibold mb-2">Tahlillar bo'limi ishlab chiqilmoqda</h2>
          <p className="text-slate-400">Tez orada bu yerda batafsil energiya sarfi statistikasi paydo bo'ladi.</p>
        </div>
      </main>
    </div>
  );
}
