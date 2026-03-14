'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  Bell, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  List, 
  Calendar, 
  DollarSign, 
  Filter, 
  Download, 
  Upload,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';

const stats = [
  { label: 'Total de Pedidos', value: '1,284', trend: '+12%', trendUp: true, icon: List, color: 'text-studio-gold bg-studio-gold/10' },
  { label: 'Pendentes', value: '42', trend: '-5%', trendUp: false, icon: Calendar, color: 'text-orange-600 bg-orange-100' },
  { label: 'Receita Mensal', value: 'R$ 12.450', trend: '+18%', trendUp: true, icon: DollarSign, color: 'text-emerald-600 bg-emerald-100' },
];

const orders = [
  { id: '#8842', client: 'Ana Silva', plan: 'Premium Plan', status: 'Processing', date: '2023-10-24', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpyrOxzIXbM5Q7_sMtWaFFt9bb_immdorEjeN_1sPLCqO4-VKD1jQcSUYrw_nrPZXI9kUP7dsYTg7nqnfYy2s2jYCfQZWiGRpjaiqI2BfXlekRfLEZDEYIOl7ZacNe15Zk2Jf5lQi-YcgqZ0lteprjfU9D9ai_LQH1GjI1G1GPWKsjWNB7wElT1k8oe845o1u5wp8Arp96KIRFOfKifkmX4Z_SL-sYbBZLRtwfzAA5qQ35tXFYLgHreYGyUZA_lUjTLK-xKoWSKrnU' },
  { id: '#8841', client: 'Bruno Costa', plan: 'Business Plan', status: 'Pending', date: '2023-10-24', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC7r9mpwKTAgpLEK5NwDMUzpQ0miWI2gImWcPxWF38qf6hqm2Yb8PuiqBy3uctNmet-as4CGBwyUBwdM8hCkbHdPZ2cYMcdq6ap_NCyGRzI9D1U4se6VR1a9bwAOjuePXCvpYZcTtslU0LAsSqQYD4lRH6FkPQtlWft0A1bfmCiD-KqYh03aXKmlDbXHf850A6PHJLg_Bgx89cHUWqjKUQ-cuFd7NcDDq-s91zaaVZalKi4LypiIF2rU9jXczvFHO-QLq-BzfaTmlR' },
  { id: '#8840', client: 'Carla Dias', plan: 'Free Tier', status: 'Completed', date: '2023-10-23', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4AaVZ101z8bdkCQGFRMNbGvsc4uvvyvqm6UR0zChAIx8qMtyKiEQD_Xyj0KoHlyG5_nppL2SHHgJjW6K4gLF9MdOikL5XdT0zBX-v9s1c3S1gk4AckAzcLguTduyYrk7TP3V2TWhlbpyA2RTFgk8MxDIiRLijZo2d2jpgqYZY9tmVpaTZEle7ednuVKO6pzj3nJc6ILo5gWrFkvIA7Iyk3FJTs7uIguGHlK3kDmMUoCcjBz_fEwVjlHBlaYe3EUwRZjIRfUNUYL7B' },
  { id: '#8839', client: 'Diego Santos', plan: 'Business Plan', status: 'Processing', date: '2023-10-23', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8JPUB47OyzKeoxnhDzggq1FVwOix5jyCLCKMiNJ_8hqEZUL5c1shR8dWTSAnjB3PqqikeV__tYjfzPJOBWI06f1bvPq4EQG0YXHi23M6PJ5KpEPlj-Z-Q2rlHzWUusBRvi5r2kPSVMWEwe3TP6uFTeQiE80TLBC73Nc3R9qu4JS2gGFIUb8sl9FhhICSA2t0b1wl4hxTSNEnhRN63c4PLlaCZqYBbEEuPqIugTMfAIVwp6ibCmhpJCYbFaQ1VaWmciUIfcgm32bcr' },
];

export default function AdminOrders() {
  return (
    <div className="flex h-screen overflow-hidden bg-studio-black text-white">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-studio-black border-b border-white/5 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-none text-sm focus:ring-1 focus:ring-studio-gold transition-all outline-none text-white" 
                placeholder="Pesquisar pedidos ou clientes..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="size-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 relative hover:text-studio-gold transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="h-10 px-6 bg-studio-gold text-studio-black rounded-none text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-studio-gold-light transition-all font-display">
              <Plus size={16} />
              Novo Pedido
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#121212]">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-studio-black border border-white/5 p-6 rounded-none shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-500 text-sm font-medium">{stat.label}</span>
                    <div className={`size-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                      <Icon size={18} />
                    </div>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold font-display uppercase tracking-widest">{stat.value}</span>
                    <span className={`text-xs font-bold mb-1.5 flex items-center ${stat.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {stat.trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {stat.trend}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Table Section */}
          <div className="bg-studio-black border border-white/5 rounded-none shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Fila de Produção</h2>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded text-xs font-medium hover:bg-white/5 transition-colors text-slate-400">
                  <Filter size={14} />
                  Filtros
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded text-xs font-medium hover:bg-white/5 transition-colors text-slate-400">
                  <Download size={14} />
                  Exportar
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-gray-500 uppercase text-[10px] font-bold tracking-widest font-display">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Cliente</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-studio-gold font-display tracking-widest">{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-slate-700 overflow-hidden relative">
                            <Image 
                              src={order.avatar} 
                              alt={order.client} 
                              fill 
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold">{order.client}</span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-tighter">{order.plan}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-none text-[10px] font-bold uppercase tracking-widest font-display border ${
                          order.status === 'Completed' ? 'bg-emerald-900/20 text-emerald-400 border-emerald-400/30' :
                          order.status === 'Processing' ? 'bg-blue-900/20 text-blue-400 border-blue-400/30' :
                          'bg-orange-900/20 text-orange-400 border-orange-400/30'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{order.date}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="size-9 flex items-center justify-center rounded border border-white/10 text-slate-400 hover:border-studio-gold hover:text-studio-gold transition-all" title="Download fotos">
                            <Download size={18} />
                          </button>
                          <button className="size-9 flex items-center justify-center rounded border border-white/10 text-slate-400 hover:border-studio-gold hover:text-studio-gold transition-all" title="Upload prévia">
                            <Upload size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-500">Mostrando 4 de 1.284 pedidos</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-white/10 rounded text-xs font-medium disabled:opacity-50 text-slate-400" disabled>Anterior</button>
                <button className="px-3 py-1.5 bg-studio-gold text-studio-black rounded text-xs font-bold">1</button>
                <button className="px-3 py-1.5 border border-white/10 rounded text-xs font-medium hover:bg-white/5 transition-colors text-slate-400">2</button>
                <button className="px-3 py-1.5 border border-white/10 rounded text-xs font-medium hover:bg-white/5 transition-colors text-slate-400">Próximo</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
