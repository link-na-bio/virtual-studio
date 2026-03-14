'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  BarChart3, 
  Calendar, 
  FileText, 
  Wallet, 
  Activity, 
  Ticket, 
  UserPlus, 
  TrendingUp, 
  Minus,
  Tag,
  Receipt
} from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminReports() {
  return (
    <div className="flex h-screen overflow-hidden bg-studio-black text-white">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 border-b border-studio-gold/20 bg-studio-black/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <BarChart3 className="text-studio-gold" size={32} />
            <h2 className="font-display text-2xl font-medium tracking-tight uppercase text-slate-100">Relatórios Financeiros</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#1a1a1a] border border-studio-gold/20 rounded-lg px-3 py-2 gap-3 text-slate-300 cursor-pointer hover:border-studio-gold transition-colors">
              <Calendar size={16} className="text-studio-gold" />
              <span className="text-xs font-medium uppercase tracking-widest">Últimos 30 Dias</span>
            </div>
            <button className="flex items-center gap-2 px-6 py-2 bg-studio-gold text-studio-black rounded-lg font-bold text-xs uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 font-display">
              <FileText size={18} />
              Export PDF
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#121212]">
          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Monthly Recurring Revenue', value: '$45,200.00', trend: '12.5%', icon: Wallet },
              { label: 'Total Revenue Month', value: '$52,890.00', trend: '8.2%', icon: Activity },
              { label: 'Average Ticket Price', value: '$129.00', trend: '2.1%', icon: Ticket, neutral: true },
              { label: 'Active Subscriptions', value: '842', trend: '5.4%', icon: UserPlus }
            ].map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <div key={i} className="bg-[#1a1a1a] border border-studio-gold/20 p-6 rounded-xl flex flex-col gap-3 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-30">
                    <Icon size={48} className="text-studio-gold" />
                  </div>
                  <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest">{kpi.label}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="font-display text-2xl text-slate-100 tracking-wide">{kpi.value}</h3>
                    <div className={`flex items-center text-xs font-bold gap-0.5 ${kpi.neutral ? 'text-slate-500' : 'text-studio-gold'}`}>
                      {kpi.neutral ? <Minus size={14} /> : <TrendingUp size={14} />}
                      {kpi.trend}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Line Chart Placeholder */}
            <div className="lg:col-span-2 bg-[#1a1a1a] border border-studio-gold/20 rounded-xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="font-display text-lg text-slate-100 uppercase tracking-wide">Receita Mensal</h4>
                  <p className="text-slate-500 text-xs tracking-tight">Performance semestral de faturamento bruto</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-studio-gold"></span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">Receita</span>
                </div>
              </div>
              <div className="h-[250px] w-full relative">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 200">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#c39d5d" stopOpacity="0.3"></stop>
                      <stop offset="100%" stopColor="#c39d5d" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0,180 L50,140 L120,160 L200,80 L300,100 L400,40 L500,60 L500,200 L0,200 Z" fill="url(#chartGradient)"></path>
                  <path d="M0,180 L50,140 L120,160 L200,80 L300,100 L400,40 L500,60" fill="none" stroke="#c39d5d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                  <circle cx="50" cy="140" fill="#0a0a0a" r="4" stroke="#c39d5d" strokeWidth="2"></circle>
                  <circle cx="200" cy="80" fill="#0a0a0a" r="4" stroke="#c39d5d" strokeWidth="2"></circle>
                  <circle cx="400" cy="40" fill="#0a0a0a" r="4" stroke="#c39d5d" strokeWidth="2"></circle>
                </svg>
              </div>
              <div className="flex justify-between mt-4 px-2">
                {['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN'].map(m => (
                  <span key={m} className="text-[10px] text-slate-500 font-bold">{m}</span>
                ))}
              </div>
            </div>

            {/* Doughnut Chart Placeholder */}
            <div className="bg-[#1a1a1a] border border-studio-gold/20 rounded-xl p-8 flex flex-col">
              <h4 className="font-display text-lg text-slate-100 uppercase tracking-wide mb-2">Vendas por Plano</h4>
              <p className="text-slate-500 text-xs tracking-tight mb-8">Distribuição de assinaturas ativas</p>
              <div className="flex-1 flex flex-col items-center justify-center relative">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" fill="none" r="15.9" stroke="#2a2a2a" strokeWidth="3"></circle>
                    <circle cx="18" cy="18" fill="none" r="15.9" stroke="#c39d5d" strokeDasharray="70 100" strokeWidth="3"></circle>
                    <circle cx="18" cy="18" fill="none" r="15.9" stroke="#8a8a8a" strokeDasharray="20 100" strokeDashoffset="-70" strokeWidth="3"></circle>
                    <circle cx="18" cy="18" fill="none" r="15.9" stroke="#4a4a4a" strokeDasharray="10 100" strokeDashoffset="-90" strokeWidth="3"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-display text-slate-100">1.2k</span>
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest">Total</span>
                  </div>
                </div>
                <div className="w-full mt-10 grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#4a4a4a]"></div>
                      <span className="text-xs text-slate-300">Minimum</span>
                    </div>
                    <span className="text-xs font-bold text-slate-100">10%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#8a8a8a]"></div>
                      <span className="text-xs text-slate-300">Standard</span>
                    </div>
                    <span className="text-xs font-bold text-slate-100">20%</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-studio-gold/20 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-studio-gold"></div>
                      <span className="text-xs text-studio-gold font-bold">Premium</span>
                    </div>
                    <span className="text-xs font-bold text-studio-gold">70%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Sections Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Cupons */}
            <div className="lg:col-span-1 bg-[#1a1a1a] border border-studio-gold/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Tag size={18} className="text-studio-gold" />
                <h4 className="font-display text-base text-slate-100 uppercase tracking-wide">Cupons Ativos</h4>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { code: 'AI_GOLD_30', desc: '30% OFF • 142 Usos', val: '$4.2k' },
                  { code: 'STUDIO1308', desc: 'Fixed $50 • 85 Usos', val: '$3.8k' },
                  { code: 'SUMMER_AI', desc: '10% OFF • Expired', val: '$1.1k', expired: true }
                ].map((coupon, i) => (
                  <div key={i} className={`flex items-center justify-between p-3 rounded-lg bg-studio-black border border-white/5 ${coupon.expired ? 'opacity-50' : ''}`}>
                    <div>
                      <p className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">{coupon.code}</p>
                      <p className="text-[8px] text-slate-500 uppercase tracking-widest">{coupon.desc}</p>
                    </div>
                    <div className="text-studio-gold font-display text-sm">{coupon.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transactions Table */}
            <div className="lg:col-span-3 bg-[#1a1a1a] border border-studio-gold/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Receipt size={18} className="text-studio-gold" />
                  <h4 className="font-display text-base text-slate-100 uppercase tracking-wide">Transações Recentes</h4>
                </div>
                <button className="text-[10px] text-studio-gold uppercase font-bold tracking-widest hover:underline">Ver Todas</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-studio-gold/20">
                    <tr>
                      <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">ID</th>
                      <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Data</th>
                      <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Cliente</th>
                      <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Plano</th>
                      <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Status</th>
                      <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { id: '#88219', date: 'Out 30, 2023', client: 'Alexander Thorne', plan: 'Premium', status: 'Completed', val: '$249.00' },
                      { id: '#88218', date: 'Out 30, 2023', client: 'Isabella Rossi', plan: 'Standard', status: 'Pending', val: '$129.00' },
                      { id: '#88217', date: 'Out 29, 2023', client: 'Marcello Silva', plan: 'Premium', status: 'Completed', val: '$249.00' }
                    ].map((tx, i) => (
                      <tr key={i} className="group hover:bg-white/5 transition-colors">
                        <td className="py-4 px-2 text-xs font-medium text-slate-400">{tx.id}</td>
                        <td className="py-4 px-2 text-xs text-slate-400">{tx.date}</td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-2">
                            <div className="size-6 rounded-full bg-slate-700"></div>
                            <span className="text-xs font-semibold text-slate-100">{tx.client}</span>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-xs font-medium text-studio-gold">{tx.plan}</td>
                        <td className="py-4 px-2">
                          <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider border ${
                            tx.status === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-xs font-display text-slate-100 text-right">{tx.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
