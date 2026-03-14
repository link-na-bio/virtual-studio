'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Bell, 
  UserPlus, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Ban,
  TrendingUp,
  Minus,
  Users,
  Star,
  List,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  AlertCircle,
  UserCheck
} from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';

const users = [
  { id: '#ST-8291', name: 'Julian Vancore', email: 'julian.v@luxury.co', access: 'Client', plan: 'Pro Plan', orders: 142, joined: 'Oct 12, 2023', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsCpjmd41k3714L-puriEnXn18hjclHPRKQ1QGS34gvYfBio1cx_ICr-hKaSUZpBJV6Xwy3R61jfUUkeL2MfyrxgcrLyt8WqEnyEzSWUKEuzGW128yFS3Rkth4INFs8ae-z7zg6z4zeuEx6bR2xWE_4dzYVwMGEz_Mg9ic5mswnStJaj5-9BeA6AcAlgkiD47O7Xm-EpJM-Nbg0p3ghJDYubaBL9vyeBzo_HnFMo8ai9Klzw4-IAIiOqHLNIh3aQxTWRF7vmf58Aay' },
  { id: '#ST-7162', name: 'Elena Thorne', email: 'elena.t@studio.io', access: 'Admin', plan: '—', orders: 0, joined: 'Jan 05, 2024', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfEYrO1_nIZy9TEBa5OVb5I9Jw1YPz2tmXnWxM6DGGtzwNbJFS3JBC6ocFZM2sowHiwlaEVp7OPCuMBsoAN5GGtGfLGSYI117WpzC5ar0iQlhwn1QdxZNeVIbHXu89kEla4s354qtgZcI3HaeorWv9A2APXmT-2cyI0yFg2Bks4hDZZ1wHbSMQQndM-eOA1lzkbkZh1-JS8qMTaF-uxU3ppGyBcm2yoNgy-PUxR3tc04rcxd7LgKBJiGkZ4YE5wxCD0aHdpcG_bbUc' },
  { id: '#ST-6621', name: 'Marcus Sterling', email: 'marcus@sterling.com', access: 'Client', plan: 'Basic Plan', orders: 28, joined: 'Mar 22, 2024', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqq8vyW9fJ_zrrDFtYz_GyE_4WLr89ijf9FXolncEnCgkpMYL-qVcZN_oBMU8-hq5hdhR8GWCibY1j3z5DBTgewAFCJ2w7e8mCaXuYUmneN1kHmbd0drgIxUnas-nuCeQDwBLLYBo-iDuGa-AgKAN_vAgE748LRrRj-TzLQkU06e6ZjBplCVfw4sGSRXOomlOGU_jfE7UIrAq6ByBrlyUcJNvmGUBhqzivrt5faGyjAHFA7HYH-bgItMyJWp-HdZswqrtBbYr62Lhk' },
  { id: '#ST-9912', name: 'Aria Montgomery', email: 'aria.m@agency.net', access: 'Client', plan: 'Popular', orders: 89, joined: 'Apr 02, 2024', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARwM_Bcl_luUziCEKamZBRwgEm9vzMQqzWPYjPCpoaX3YdJ7cBHukKwBMI72ksDaaP_3pPXVRufnZy1AmI_JeVSoYV59nlcsEBtWvcdNRRzvEKC8x_LE6UJOSLR3YIEEkVY37lA63YDxUsjp6fIiDlKrghW5HxGgW5f4Uq2F2RoYzqCzY5RwdeQsXZYxVHQ-z_MM7ahZrdHWBQjz6AQZcCOiNsIUqJXCmMmtf2isowoXPpu3AfETq0EUvjHP65ry5kYOy6c9H8pdTS' },
];

export default function AdminUsers() {
  return (
    <div className="flex h-screen overflow-hidden bg-studio-black text-white">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#121212]">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-studio-gold/20 bg-studio-black/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-6 flex-1">
            <h2 className="text-xl font-bold text-studio-gold font-display uppercase tracking-widest">User Management</h2>
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-studio-gold transition-colors" size={18} />
              <input 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-studio-gold text-sm transition-all text-slate-200" 
                placeholder="Search by name, email or ID..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-studio-gold hover:bg-studio-gold-light text-studio-black font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-studio-gold/10 font-display">
              <UserPlus size={18} />
              Add New User
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Registered Users', value: '4,829', trend: '+14.2%', sub: 'vs. last month (4,228)' },
              { label: 'Active Subscriptions', value: '1,245', trend: '+8.1%', sub: 'Retention rate: 94.2%' },
              { label: 'New Users This Month', value: '284', trend: '0.0%', sub: 'On track for quarterly goals' }
            ].map((metric, i) => (
              <div key={i} className="bg-studio-black border border-white/10 p-6 rounded-xl flex flex-col gap-1 relative overflow-hidden group hover:border-studio-gold/40 transition-all">
                <p className="text-slate-400 text-sm font-medium">{metric.label}</p>
                <div className="flex items-end gap-3 mt-1">
                  <h3 className="text-3xl font-bold font-display">{metric.value}</h3>
                  <span className="flex items-center text-emerald-500 text-sm font-bold pb-1">
                    <TrendingUp size={16} className="mr-1" />
                    {metric.trend}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">{metric.sub}</p>
              </div>
            ))}
          </div>

          {/* Table Container */}
          <div className="bg-studio-black border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="font-bold flex items-center gap-2 font-display uppercase tracking-widest text-sm">
                <List size={18} className="text-studio-gold" />
                User Directory
              </h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold text-slate-400 hover:text-studio-gold transition-colors uppercase tracking-widest">
                  <Filter size={14} />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold text-slate-400 hover:text-studio-gold transition-colors uppercase tracking-widest">
                  <Download size={14} />
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">User</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Email Address</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Access</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Current Plan</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Orders</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Joined</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full border border-studio-gold/20 overflow-hidden bg-white/5 flex-shrink-0 relative">
                            <Image 
                              src={user.avatar} 
                              alt={user.name} 
                              fill 
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold group-hover:text-studio-gold transition-colors">{user.name}</p>
                            <p className="text-[10px] text-slate-500">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-400">{user.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          user.access === 'Admin' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : 'bg-studio-gold/10 text-studio-gold border-studio-gold/20'
                        }`}>
                          {user.access}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          {user.plan !== '—' && <span className="size-2 rounded-full bg-studio-gold"></span>}
                          <span className="text-sm font-medium text-slate-200">{user.plan}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-300">{user.orders}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-500 italic">{user.joined}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-studio-gold transition-all" title="View Details">
                            <Eye size={18} />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-studio-gold transition-all" title="Edit User">
                            <Edit size={18} />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-red-500 transition-all" title="Suspend User">
                            <Ban size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-white/5 bg-white/5 flex items-center justify-between">
              <p className="text-xs text-slate-500 font-medium">Showing <span className="text-slate-300">1-10</span> of <span className="text-slate-300">4,829</span> users</p>
              <div className="flex items-center gap-2">
                <button className="size-8 rounded-lg flex items-center justify-center border border-white/10 text-slate-500 hover:text-studio-gold transition-all cursor-not-allowed opacity-50">
                  <ChevronLeft size={16} />
                </button>
                <button className="size-8 rounded-lg flex items-center justify-center border border-studio-gold bg-studio-gold/10 text-studio-gold text-xs font-bold">1</button>
                <button className="size-8 rounded-lg flex items-center justify-center border border-white/10 text-slate-400 hover:text-studio-gold transition-all text-xs font-bold">2</button>
                <button className="size-8 rounded-lg flex items-center justify-center border border-white/10 text-slate-400 hover:text-studio-gold transition-all">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="hidden">
        <Users />
        <Star />
        <AlertCircle />
        <UserCheck />
        <Minus />
        <Bell />
        <MoreVertical />
      </div>
    </div>
  );
}
