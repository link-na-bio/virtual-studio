'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, Plus, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminHeader() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [hasNew, setHasNew] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // 1. Carregar notificações iniciais (não lidas)
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notificacoes_admin')
        .select('*')
        .eq('lida', false)
        .order('criado_em', { ascending: false })
        .limit(5);

      if (data) {
        setNotifications(data);
        if (data.length > 0) setHasNew(true);
      }
    };

    fetchNotifications();

    // 2. Escutar em tempo real (CANAL REALTIME)
    const channel = supabase
      .channel('admin_notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notificacoes_admin'
        },
        (payload) => {
          console.log('Nova notificação recebida:', payload);
          setNotifications(prev => [payload.new, ...prev].slice(0, 5));
          setHasNew(true);
          
          // Opcional: Tocar um som de alerta ou mostrar toast
          if (typeof window !== 'undefined') {
            const audio = new Audio('/notification-sound.mp3'); // Opcional
            audio.play().catch(() => {});
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const markAsRead = async () => {
    setShowNotifications(!showNotifications);
    if (hasNew) {
      setHasNew(false);
      // Opcional: Marcar no banco como lidas
      await supabase
        .from('notificacoes_admin')
        .update({ lida: true })
        .eq('lida', false);
    }
  };

  return (
    <header className="h-20 bg-studio-black border-b border-white/5 flex items-center justify-between px-8 bg-gradient-to-b from-white/[0.02] to-transparent sticky top-0 z-50">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold font-display uppercase tracking-[0.2em] text-white">
          VIRTUAL <span className="text-studio-gold">STUDIO</span>
        </h1>
        <p className="text-[9px] text-studio-gold font-bold uppercase tracking-[0.2em] opacity-60">
          Painel de Controle Administrativo
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-none text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-studio-gold transition-all outline-none text-white placeholder:text-gray-600"
            placeholder="Pesquisar pedidos..."
            type="text"
          />
        </div>

        <div className="h-8 w-[1px] bg-white/10"></div>

        <div className="flex items-center gap-4">
          {/* Sino de Notificação com Realtime */}
          <div className="relative">
            <button 
              onClick={markAsRead}
              className={`size-9 flex items-center justify-center rounded-none bg-white/5 border border-white/10 text-slate-400 relative hover:text-studio-gold transition-colors ${hasNew ? 'text-studio-gold border-studio-gold/30' : ''}`}
            >
              <Bell size={18} />
              {hasNew && (
                <span className="absolute top-2 right-2 size-2 bg-studio-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,1)] animate-pulse"></span>
              )}
            </button>

            {/* Menu Dropdown de Notificações Simple */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#121212] border border-white/10 shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2">
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-studio-gold">Alertas Recentes</span>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest">{notifications.length} Avisos</span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-xs text-gray-600 italic">Nenhuma notificação nova</div>
                  ) : (
                    notifications.map((notif, i) => (
                      <div key={i} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                        <p className="text-[10px] font-bold text-white uppercase group-hover:text-studio-gold transition-colors">
                          {notif.pacote || 'Novo Pedido'}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1">{notif.mensagem}</p>
                        <p className="text-[9px] text-gray-600 mt-2 uppercase tracking-tighter">
                          {new Date(notif.criado_em).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button className="h-10 px-8 bg-studio-gold text-studio-black rounded-none text-[10px] font-bold font-display uppercase tracking-widest flex items-center gap-2 hover:bg-studio-gold-light transition-all shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Plus size={14} />
            Novo Pedido
          </button>
        </div>
      </div>
    </header>
  );
}
