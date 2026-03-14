'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Search, 
  SquarePen, 
  Phone, 
  Video, 
  Info, 
  Paperclip, 
  Send,
  MoreVertical,
  Bell,
  Plus
} from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';

const chats = [
  { id: 1, name: 'Ana Silva', time: '14:20', lastMsg: 'Adorei o resultado da prévia! Podemos seguir...', active: true, online: true, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpyrOxzIXbM5Q7_sMtWaFFt9bb_immdorEjeN_1sPLCqO4-VKD1jQcSUYrw_nrPZXI9kUP7dsYTg7nqnfYy2s2jYCfQZWiGRpjaiqI2BfXlekRfLEZDEYIOl7ZacNe15Zk2Jf5lQi-YcgqZ0lteprjfU9D9ai_LQH1GjI1G1GPWKsjWNB7wElT1k8oe845o1u5wp8Arp96KIRFOfKifkmX4Z_SL-sYbBZLRtwfzAA5qQ35tXFYLgHreYGyUZA_lUjTLK-xKoWSKrnU' },
  { id: 2, name: 'Bruno Costa', time: 'Ontem', lastMsg: 'Qual o prazo para entrega final?', active: false, online: false, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC7r9mpwKTAgpLEK5NwDMUzpQ0miWI2gImWcPxWF38qf6hqm2Yb8PuiqBy3uctNmet-as4CGBwyUBwdM8hCkbHdPZ2cYMcdq6ap_NCyGRzI9D1U4se6VR1a9bwAOjuePXCvpYZcTtslU0LAsSqQYD4lRH6FkPQtlWft0A1bfmCiD-KqYh03aXKmlDbXHf850A6PHJLg_Bgx89cHUWqjKUQ-cuFd7NcDDq-s91zaaVZalKi4LypiIF2rU9jXczvFHO-QLq-BzfaTmlR' },
];

export default function AdminMessages() {
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
                placeholder="Pesquisar mensagens..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="size-10 flex items-center justify-center rounded-none bg-white/5 border border-white/10 text-studio-gold hover:bg-white/10 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-studio-black"></span>
            </button>
            <button className="h-10 px-6 bg-studio-gold text-studio-black rounded-none text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-studio-gold-light transition-all font-display">
              <Plus size={16} />
              Novo Pedido
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden bg-[#121212]">
          {/* Chat List Sidebar */}
          <div className="w-80 border-r border-white/5 flex flex-col bg-studio-black">
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white font-display uppercase tracking-widest">Mensagens</h2>
                <button className="text-studio-gold hover:text-white transition-colors">
                  <SquarePen size={20} />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                <input 
                  className="w-full bg-white/5 border border-white/10 text-xs py-2 pl-9 pr-4 text-white focus:ring-1 focus:ring-studio-gold outline-none" 
                  placeholder="Buscar conversas..." 
                  type="text"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {chats.map((chat) => (
                <div key={chat.id} className={`p-4 flex gap-3 cursor-pointer transition-colors border-b border-white/5 ${chat.active ? 'bg-studio-gold/5 border-r-2 border-studio-gold' : 'hover:bg-white/5'}`}>
                  <div className="relative flex-shrink-0">
                    <div className="size-12 rounded-full overflow-hidden relative">
                      <Image src={chat.avatar} alt={chat.name} fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 size-3 bg-emerald-500 border-2 border-studio-black rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white truncate">{chat.name}</span>
                        {chat.active && <span className="bg-studio-gold text-studio-black text-[9px] font-black px-1.5 py-0.5 rounded-full">1</span>}
                      </div>
                      <span className="text-[10px] text-studio-gold font-bold uppercase tracking-tighter">{chat.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{chat.lastMsg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col bg-[#121212] relative">
            {/* Chat Header */}
            <div className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-studio-black/40 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-studio-gold/20 flex items-center justify-center border border-studio-gold/30 overflow-hidden relative">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpyrOxzIXbM5Q7_sMtWaFFt9bb_immdorEjeN_1sPLCqO4-VKD1jQcSUYrw_nrPZXI9kUP7dsYTg7nqnfYy2s2jYCfQZWiGRpjaiqI2BfXlekRfLEZDEYIOl7ZacNe15Zk2Jf5lQi-YcgqZ0lteprjfU9D9ai_LQH1GjI1G1GPWKsjWNB7wElT1k8oe845o1u5wp8Arp96KIRFOfKifkmX4Z_SL-sYbBZLRtwfzAA5qQ35tXFYLgHreYGyUZA_lUjTLK-xKoWSKrnU"
                    alt="Ana Silva"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Ana Silva</h3>
                  <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <button className="hover:text-studio-gold transition-colors"><Phone size={20} /></button>
                <button className="hover:text-studio-gold transition-colors"><Video size={20} /></button>
                <button className="hover:text-studio-gold transition-colors"><Info size={20} /></button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              <div className="flex justify-center">
                <span className="text-[10px] bg-white/5 px-3 py-1 text-slate-500 uppercase font-bold tracking-[0.2em]">24 de Outubro, 2023</span>
              </div>
              
              {/* Received */}
              <div className="flex gap-3 max-w-[80%]">
                <div className="flex-shrink-0 size-8 rounded-full bg-slate-800 overflow-hidden relative">
                   <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpyrOxzIXbM5Q7_sMtWaFFt9bb_immdorEjeN_1sPLCqO4-VKD1jQcSUYrw_nrPZXI9kUP7dsYTg7nqnfYy2s2jYCfQZWiGRpjaiqI2BfXlekRfLEZDEYIOl7ZacNe15Zk2Jf5lQi-YcgqZ0lteprjfU9D9ai_LQH1GjI1G1GPWKsjWNB7wElT1k8oe845o1u5wp8Arp96KIRFOfKifkmX4Z_SL-sYbBZLRtwfzAA5qQ35tXFYLgHreYGyUZA_lUjTLK-xKoWSKrnU" alt="Ana" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="bg-white/5 border border-white/10 p-4 text-sm text-slate-300 leading-relaxed">
                  Olá! Recebi as prévias do ensaio #8842. Ficaram simplesmente maravilhosas, o tratamento de cor está impecável.
                </div>
              </div>

              {/* Sent */}
              <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                <div className="bg-studio-gold/10 border border-studio-gold/30 p-4 text-sm text-white leading-relaxed">
                  Ficamos felizes que tenha gostado, Ana! Estamos finalizando o restante do lote. Gostaria de fazer alguma alteração específica no retoque de pele?
                </div>
              </div>

              {/* Received */}
              <div className="flex gap-3 max-w-[80%]">
                <div className="flex-shrink-0 size-8 rounded-full bg-slate-800 overflow-hidden relative">
                   <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpyrOxzIXbM5Q7_sMtWaFFt9bb_immdorEjeN_1sPLCqO4-VKD1jQcSUYrw_nrPZXI9kUP7dsYTg7nqnfYy2s2jYCfQZWiGRpjaiqI2BfXlekRfLEZDEYIOl7ZacNe15Zk2Jf5lQi-YcgqZ0lteprjfU9D9ai_LQH1GjI1G1GPWKsjWNB7wElT1k8oe845o1u5wp8Arp96KIRFOfKifkmX4Z_SL-sYbBZLRtwfzAA5qQ35tXFYLgHreYGyUZA_lUjTLK-xKoWSKrnU" alt="Ana" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="bg-white/5 border border-white/10 p-4 text-sm text-slate-300 leading-relaxed">
                  Não, está perfeito. Pode seguir com o fluxo de produção conforme planejado.
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 bg-studio-black border-t border-white/5">
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2">
                <button className="p-2 text-slate-400 hover:text-studio-gold"><Paperclip size={20} /></button>
                <input className="flex-1 bg-transparent border-none text-sm text-white focus:ring-0 outline-none" placeholder="Escreva sua mensagem..." type="text"/>
                <button className="px-4 py-2 bg-studio-gold text-studio-black font-bold text-[10px] uppercase tracking-widest hover:bg-studio-gold-light transition-all font-display">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
