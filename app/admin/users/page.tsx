'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Search,
  Filter,
  Download,
  TrendingUp,
  List,
  ChevronLeft,
  ChevronRight,
  User,
  Loader2,
  Lock,
  Unlock
} from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';

import { supabase } from '@/lib/supabaseClient';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Métricas
  const [totalUsers, setTotalUsers] = useState(0);
  const [newUsersThisMonth, setNewUsersThisMonth] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  // Estado para usuários com pedidos pausados
  const [pausedUsers, setPausedUsers] = useState<Set<string>>(new Set());

  const fetchRestrictedUsers = async () => {
    try {
      const { data, error } = await supabase.from('usuarios_restritos').select('email');
      if (error && error.code !== '42P01') throw error;
      if (data) {
        setPausedUsers(new Set(data.map(d => d.email)));
      }
    } catch (err) {
      console.error("Erro ao buscar usuários restritos:", err);
    }
  };

  const togglePauseUser = async (user: any) => {
    if (user.access === 'Admin') {
      alert("Acesso Negado: Administradores e CEOs não podem ter pedidos bloqueados.");
      return;
    }

    try {
      if (pausedUsers.has(user.email)) {
        const { error } = await supabase.from('usuarios_restritos').delete().eq('email', user.email);
        if (error) throw error;

        setPausedUsers(prev => {
          const next = new Set(prev);
          next.delete(user.email);
          return next;
        });
        alert(`SUCESSO: O cliente ${user.email} agora pode fazer novos pedidos.`);
      } else {
        const { error } = await supabase.from('usuarios_restritos').insert({ email: user.email });
        if (error) throw error;

        setPausedUsers(prev => {
          const next = new Set(prev);
          next.add(user.email);
          return next;
        });
        alert(`SUCESSO: Os pedidos para ${user.email} foram interrompidos efetivamente.`);
      }
    } catch (error: any) {
      alert("Erro ao alterar bloqueio (verifique se a tabela 'usuarios_restritos' foi criada no Supabase): " + error.message);
    }
  };

  const fetchUsersAndOrders = async () => {
    setIsLoading(true);
    try {
      // 1. Buscar a lista de TODOS os usuários cadastrados através do túnel seguro (RPC)
      const { data: authUsers, error: rpcError } = await supabase.rpc('listar_todos_usuarios');
      if (rpcError) throw rpcError;

      // 2. Buscar os pedidos para contabilizar quantos cada cliente tem
      const { data: pedidosData, error: pedidosError } = await supabase
        .from('pedidos')
        .select('user_id');
      if (pedidosError) throw pedidosError;

      // Mapa para contagem rápida de pedidos por user_id
      const orderCounts: Record<string, number> = {};
      if (pedidosData) {
        pedidosData.forEach((pedido: any) => {
          orderCounts[pedido.user_id] = (orderCounts[pedido.user_id] || 0) + 1;
        });
      }

      // 3. Montar a lista final unindo os dados
      let uniqueUsers = (authUsers || []).map((u: any) => ({
        id: u.id,
        email: u.email,
        name: u.email.split('@')[0],
        access: u.email === 'brunomeueditor@gmail.com' ? 'Admin' : 'Cliente VIP',
        orders: orderCounts[u.id] || 0, // Se não tiver pedidos, fica 0
        joined: u.criado_em,
        avatar: null
      }));

      // Garantir que o Admin aparece destacado
      if (!uniqueUsers.some(u => u.email === 'brunomeueditor@gmail.com')) {
        uniqueUsers.push({
          id: 'admin-bruno',
          email: 'brunomeueditor@gmail.com',
          name: 'Bruno (CEO)',
          access: 'Admin',
          orders: 0,
          joined: new Date().toISOString(),
          avatar: null
        });
      }

      // Ordenar por mais recentes primeiro
      uniqueUsers.sort((a, b) => new Date(b.joined).getTime() - new Date(a.joined).getTime());

      setUsers(uniqueUsers);
      setFilteredUsers(uniqueUsers);

      // Calcular Métricas Gerais
      setTotalUsers(uniqueUsers.length);
      setTotalOrders(pedidosData ? pedidosData.length : 0);

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentes = uniqueUsers.filter(u => new Date(u.joined) >= thirtyDaysAgo).length;
      setNewUsersThisMonth(recentes);

    } catch (err: any) {
      console.error('Erro ao buscar dados:', err.message);
      alert('Erro ao carregar lista de usuários. Verifique se a função RPC foi criada corretamente.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAndOrders();
    fetchRestrictedUsers();
  }, []);

  // Pesquisa
  useEffect(() => {
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = users.filter(u =>
        u.name.toLowerCase().includes(lowerQuery) ||
        u.email.toLowerCase().includes(lowerQuery) ||
        u.id.toLowerCase().includes(lowerQuery)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-studio-black text-white">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#121212]">

        {/* Page Content */}
        <div className="p-4 pt-16 md:p-8 space-y-8 mx-auto w-full">

          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-display uppercase tracking-widest font-bold mb-2">Gestão de Clientes</h1>
              <p className="text-slate-500 text-xs tracking-widest uppercase">Diretório e controlo de acesso à plataforma</p>
            </div>

            <div className="relative w-full max-w-sm group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-studio-gold transition-colors" size={18} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-none py-3 pl-12 pr-4 focus:outline-none focus:border-studio-gold text-xs font-bold tracking-widest uppercase transition-all text-white placeholder:text-slate-600"
                placeholder="Pesquisar cliente..."
                type="text"
              />
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 md:gap-6">
            <div className="bg-studio-black border border-white/10 p-3 md:p-6 rounded-none flex flex-col justify-center items-center md:items-start gap-1 shadow-xl aspect-square md:aspect-auto text-center md:text-left">
              <p className="text-slate-500 text-[8px] md:text-[10px] font-bold uppercase tracking-widest leading-tight">Total Ativos</p>
              <div className="flex flex-col md:flex-row items-center md:items-end gap-1 md:gap-3 mt-auto md:mt-1">
                <h3 className="text-xl md:text-4xl font-bold font-display text-white leading-none">{isLoading ? '-' : totalUsers}</h3>
                <span className="flex items-center text-emerald-500 text-[8px] md:text-[10px] font-bold md:pb-2 uppercase tracking-tight md:tracking-widest">
                  <TrendingUp size={10} className="mr-1 md:w-[14px] md:h-[14px]" /> <span className="hidden md:inline">Crescimento</span>
                </span>
              </div>
            </div>

            <div className="bg-studio-black border border-white/10 p-3 md:p-6 rounded-none flex flex-col justify-center items-center md:items-start gap-1 shadow-xl aspect-square md:aspect-auto text-center md:text-left">
              <p className="text-slate-500 text-[8px] md:text-[10px] font-bold uppercase tracking-widest leading-tight">Novos (30d)</p>
              <div className="flex flex-col md:flex-row items-center md:items-end gap-1 md:gap-3 mt-auto md:mt-1">
                <h3 className="text-xl md:text-4xl font-bold font-display text-studio-gold leading-none">{isLoading ? '-' : newUsersThisMonth}</h3>
                <span className="flex items-center text-studio-gold text-[8px] md:text-[10px] font-bold md:pb-2 uppercase tracking-tight md:tracking-widest">
                  <span className="hidden md:inline">Neste mês</span>
                </span>
              </div>
            </div>

            <div className="bg-studio-black border border-white/10 p-3 md:p-6 rounded-none flex flex-col justify-center items-center md:items-start gap-1 shadow-xl aspect-square md:aspect-auto text-center md:text-left">
              <p className="text-slate-500 text-[8px] md:text-[10px] font-bold uppercase tracking-widest leading-tight">Ensaios</p>
              <div className="flex flex-col md:flex-row items-center md:items-end gap-1 md:gap-3 mt-auto md:mt-1">
                <h3 className="text-xl md:text-4xl font-bold font-display text-white leading-none">{isLoading ? '-' : totalOrders}</h3>
                <span className="flex items-center text-slate-400 text-[8px] md:text-[10px] font-bold md:pb-2 uppercase tracking-tight md:tracking-widest">
                  <span className="hidden md:inline">Gerados</span>
                </span>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-studio-black border border-white/10 rounded-none shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <h3 className="font-bold flex items-center gap-2 font-display uppercase tracking-widest text-sm text-white">
                <List size={18} className="text-studio-gold" />
                Diretório
              </h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-white/10 text-[10px] font-bold text-slate-400 hover:text-studio-gold hover:border-studio-gold transition-colors uppercase tracking-widest">
                  <Filter size={14} /> Filtro
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-white/10 text-[10px] font-bold text-slate-400 hover:text-studio-gold hover:border-studio-gold transition-colors uppercase tracking-widest">
                  <Download size={14} /> Exportar
                </button>
              </div>
            </div>

            <div className="overflow-x-auto min-h-[400px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-studio-gold" size={40} /></div>
              ) : filteredUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                  <User size={48} className="mb-4 opacity-50" />
                  <p className="text-xs uppercase tracking-widest font-bold">Nenhum cliente encontrado.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Cliente</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Acesso</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Pedidos</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display">Desde</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-display text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredUsers.map((user, idx) => {
                      const isPaused = pausedUsers.has(user.email);

                      return (
                        <tr key={idx} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="size-10 rounded-full border border-studio-gold/20 bg-studio-gold/5 flex items-center justify-center flex-shrink-0 text-studio-gold">
                                {user.avatar ? (
                                  <Image src={user.avatar} alt="avatar" fill className="object-cover rounded-full" />
                                ) : (
                                  <span className="font-bold text-xs uppercase">{user.name.charAt(0)}</span>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white uppercase tracking-wider">{user.name}</p>
                                <p className="text-[10px] text-slate-500 lowercase tracking-wider">{user.email}</p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded text-[9px] font-bold uppercase tracking-wider border ${user.access === 'Admin' ? 'bg-studio-gold/10 text-studio-gold border-studio-gold/30' :
                                isPaused ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' :
                                  'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              }`}>
                              {user.access === 'Admin' ? 'CEO / Admin' : isPaused ? 'Bloqueado (Pedidos)' : 'Cliente VIP'}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="text-xs font-bold text-slate-300 bg-white/10 px-3 py-1 rounded">{user.orders}</span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="text-xs text-slate-500 font-medium tabular-nums">{user.joined ? formatDate(user.joined) : '-'}</span>
                          </td>

                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              {isPaused ? (
                                <button onClick={() => togglePauseUser(user)} className="p-2 border border-white/10 transition-all text-amber-500 hover:border-amber-400 hover:bg-amber-500/10" title="Desbloquear Pedidos">
                                  <Unlock size={16} />
                                </button>
                              ) : (
                                <button onClick={() => togglePauseUser(user)} className="p-2 border border-white/10 transition-all text-slate-400 hover:border-amber-500 hover:text-amber-500" title="Bloquear Novos Pedidos">
                                  <Lock size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-white/5 bg-white/5 flex items-center justify-between">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                A Mostrar <span className="text-studio-gold">1-{Math.min(10, filteredUsers.length)}</span> de <span className="text-studio-gold">{filteredUsers.length}</span> clientes
              </p>
              <div className="flex items-center gap-2">
                <button className="size-8 flex items-center justify-center border border-white/10 text-slate-500 hover:text-studio-gold transition-all cursor-not-allowed opacity-50">
                  <ChevronLeft size={16} />
                </button>
                <button className="size-8 flex items-center justify-center border border-studio-gold bg-studio-gold/10 text-studio-gold text-xs font-bold">1</button>
                <button className="size-8 flex items-center justify-center border border-white/10 text-slate-400 hover:text-studio-gold transition-all">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}