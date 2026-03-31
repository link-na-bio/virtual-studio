'use client';

import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Tag, 
  Power, 
  Settings as SettingsIcon,
  Save,
  Plus,
  Loader2,
  Trash2
} from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import { supabase } from '@/lib/supabaseClient';

export default function AdminSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingCoupon, setIsGeneratingCoupon] = useState(false);

  // Preços
  const [prices, setPrices] = useState({ essencial: 89.90, premium: 149.90, elite: 247.90, amostra: 19.90 });
  
  // Cupons
  const [couponName, setCouponName] = useState('');
  const [couponDiscount, setCouponDiscount] = useState('');
  const [activeCoupons, setActiveCoupons] = useState<any[]>([]);
  
  // Manutenção
  const [isMaintenance, setIsMaintenance] = useState(false);
  

  // Busca os dados iniciais do BD
  const fetchSettingsData = async () => {
    try {
      // 1. Busca configurações gerais (Preços e Manutenção)
      const { data: configData, error: configError } = await supabase
        .from('plataforma_config')
        .select('*')
        .eq('id', 1)
        .single();
        
      if (!configError && configData) {
        setPrices({
          essencial: configData.preco_essencial || 89.90,
          premium: configData.preco_premium || 149.90,
          elite: configData.preco_elite || 247.90,
          amostra: configData.preco_amostra || 19.90
        });
        setIsMaintenance(configData.manutencao || false);
      }

      // 2. Busca Cupons ativos
      const { data: couponsData, error: couponsError } = await supabase
        .from('cupons')
        .select('*')
        .eq('ativo', true)
        .order('criado_em', { ascending: false });

      if (!couponsError && couponsData) {
        setActiveCoupons(couponsData);
      }

    } catch (err: any) {
      console.error('Erro ao buscar configurações:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettingsData();
  }, []);

  // Salva Configurações (Preços)
  const handleSavePricesAndSettings = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('plataforma_config')
        .upsert({
          id: 1, // Fixa o ID 1
          preco_essencial: prices.essencial,
          preco_premium: prices.premium,
          preco_elite: prices.elite,
          preco_amostra: prices.amostra,
          manutencao: isMaintenance,
          atualizado_em: new Date().toISOString()
        }, { onConflict: 'id' });

      if (error) throw error;
      alert("Configurações atualizadas com sucesso!");
    } catch (err: any) {
      alert("Erro ao salvar configurações: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Botão dedicado toggle manutenção (auto-save)
  const handleToggleMaintenance = async () => {
    const newVal = !isMaintenance;
    setIsMaintenance(newVal); // Toggle local imediato
    
    // Atualiza imediatamente na DB se quiser, mas aqui vou agrupar tudo no Salvar abaixo:
    // Só pra interface já mostrar ligado/desligado.
  };

  const handleGenerateCoupon = async () => {
    if (!couponName || !couponDiscount) {
      alert("Preencha o nome e o desconto do cupom.");
      return;
    }

    setIsGeneratingCoupon(true);
    try {
      const { data, error } = await supabase
        .from('cupons')
        .insert({
          codigo: couponName.toUpperCase().trim(),
          desconto_percentual: Number(couponDiscount)
        })
        .select()
        .single();

      if (error) throw error;

      setActiveCoupons([data, ...activeCoupons]);
      setCouponName('');
      setCouponDiscount('');
      alert("Cupom gerado com sucesso.");
    } catch (err: any) {
      alert("Erro ao gerar cupom: " + err.message);
    } finally {
      setIsGeneratingCoupon(false);
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (!confirm("Tem certeza que deseja inativar este cupom?")) return;

    try {
      const { error } = await supabase
        .from('cupons')
        .update({ ativo: false })
        .eq('id', id);

      if (error) throw error;
      setActiveCoupons(activeCoupons.filter(c => c.id !== id));
    } catch (err: any) {
      alert("Erro ao deletar cupom: " + err.message);
    }
  };


  if (isLoading) {
    return (
      <div className="flex h-screen bg-studio-black">
        <AdminSidebar />
        <main className="flex-1 flex flex-col items-center justify-center bg-[#121212]">
          <Loader2 className="animate-spin text-studio-gold w-10 h-10" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-studio-black text-white">
      <AdminSidebar />
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#121212]">
        
        <div className="p-4 md:p-8 space-y-8 mx-auto w-full max-w-7xl relative z-10 pb-20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-display uppercase tracking-widest font-bold mb-2 flex items-center gap-3">
                <SettingsIcon className="text-studio-gold text-opacity-80 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]" size={32} />
                Configurações da Plataforma
              </h1>
              <p className="text-slate-500 text-xs tracking-widest uppercase">Controle de sistema, pacotes, e segurança administrativa</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Toggle Manutenção Reduzido */}
              <div className="flex items-center gap-4 bg-[#121212] border border-white/10 px-5 py-2.5 rounded-xl shadow-inner">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Modo Manutenção</span>
                  <span className={`text-[9px] font-bold uppercase ${isMaintenance ? 'text-amber-500' : 'text-emerald-400'}`}>
                    {isMaintenance ? 'Sistema Suspenso' : 'Sistema Online'}
                  </span>
                </div>
                <button 
                  onClick={handleToggleMaintenance}
                  className={`relative w-[52px] h-7 rounded-full p-1 transition-all duration-300 ease-in-out cursor-pointer ${isMaintenance ? 'bg-amber-500/20 border border-amber-500/50' : 'bg-white/5 border border-white/10 hover:border-white/30'}`}
                  title="Bloquear novos formulários e pagamentos"
                >
                  <div className={`absolute left-1 top-1 size-5 flex items-center justify-center rounded-full shadow-md transform transition-all duration-300 ease-in-out ${isMaintenance ? 'translate-x-6 bg-amber-500' : 'translate-x-0 bg-white/30'}`}>
                    <Power size={10} className={isMaintenance ? "text-studio-black" : "text-black/50"} />
                  </div>
                </button>
              </div>

              {/* Botão Global de Salvar Pricing/Maintenance */}
              <button 
                onClick={handleSavePricesAndSettings} 
                disabled={isSaving}
                className="px-6 py-3 bg-studio-gold text-black font-bold uppercase tracking-widest text-[10px] hover:bg-studio-gold-light transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-2 rounded-xl h-full"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Salvar Alterações
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* GESTÃO DE PREÇOS */}
            <div className="bg-studio-black border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group hover:border-studio-gold/30 transition-all flex flex-col">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <DollarSign size={80} className="text-studio-gold" />
              </div>
              <h3 className="flex items-center gap-3 font-display uppercase tracking-widest text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">
                <DollarSign className="text-studio-gold" size={20} /> Gestão de Preços (Pacotes)
              </h3>
              
              <div className="space-y-4 flex-1 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-1/2 flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Plano Essencial</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">R$</span>
                      <input type="number" step="0.01" value={prices.essencial} onChange={(e) => setPrices({...prices, essencial: Number(e.target.value)})} className="w-full bg-[#121212] border border-white/10 text-white px-4 py-3 pl-12 focus:outline-none focus:border-studio-gold transition-colors font-mono font-bold text-lg rounded-xl" />
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Plano Premium</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">R$</span>
                      <input type="number" step="0.01" value={prices.premium} onChange={(e) => setPrices({...prices, premium: Number(e.target.value)})} className="w-full bg-[#121212] border border-white/10 text-white px-4 py-3 pl-12 focus:outline-none focus:border-studio-gold transition-colors font-mono font-bold text-lg text-studio-gold rounded-xl" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-1/2 flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Plano Elite</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">R$</span>
                      <input type="number" step="0.01" value={prices.elite} onChange={(e) => setPrices({...prices, elite: Number(e.target.value)})} className="w-full bg-[#121212] border border-white/10 text-white px-4 py-3 pl-12 focus:outline-none focus:border-studio-gold transition-colors font-mono font-bold text-lg text-emerald-400 rounded-xl" />
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold text-purple-400">Amostra Premium</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500/50 font-bold">R$</span>
                      <input type="number" step="0.01" value={prices.amostra} onChange={(e) => setPrices({...prices, amostra: Number(e.target.value)})} className="w-full bg-[#121212] border border-white/10 text-white px-4 py-3 pl-12 focus:outline-none focus:border-purple-500 transition-colors font-mono font-bold text-lg text-purple-400 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* CUPONS DE DESCONTO */}
            <div className="bg-studio-black border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group hover:border-studio-gold/30 transition-all flex flex-col">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Tag size={80} className="text-studio-gold" />
              </div>
              <h3 className="flex items-center gap-3 font-display uppercase tracking-widest text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">
                <Tag className="text-studio-gold" size={20} /> Cupons de Desconto
              </h3>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6 relative z-10">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Nome do Cupom</label>
                  <input type="text" placeholder="Ex: VIRTUAL20" value={couponName} onChange={(e) => setCouponName(e.target.value.toUpperCase())} className="bg-[#121212] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-studio-gold transition-colors uppercase font-mono font-bold rounded-xl" />
                </div>
                <div className="md:w-32 flex flex-col gap-2">
                  <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Desconto (%)</label>
                  <div className="relative">
                    <input type="number" placeholder="20" value={couponDiscount} onChange={(e) => setCouponDiscount(e.target.value)} className="w-full bg-[#121212] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-studio-gold transition-colors font-mono font-bold rounded-xl" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">%</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleGenerateCoupon} 
                disabled={isGeneratingCoupon}
                className="w-full py-4 border border-white/10 bg-white/5 text-slate-300 hover:border-studio-gold hover:text-studio-gold hover:bg-studio-gold/5 font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 mb-8 relative z-10 rounded-xl rounded-t-none border-t-0"
              >
                {isGeneratingCoupon ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} 
                Gerar Novo Cupom NO BD
              </button>

              <div className="flex-1 relative z-10">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3">Lista de Cupons Ativos no BD</p>
                <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                  {activeCoupons.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-4 uppercase tracking-widest">Nenhum cupom ativo.</p>
                  ) : (
                    activeCoupons.map((coupon, i) => (
                      <div key={coupon.id} className="flex items-center justify-between px-4 py-3 bg-[#121212] border border-white/5 hover:border-white/10 transition-colors rounded-xl">
                        <div className="flex items-center gap-3">
                          <Tag size={14} className="text-slate-500" />
                          <span className="text-studio-gold font-bold font-mono tracking-widest">{coupon.codigo}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-emerald-400 font-bold text-xs bg-emerald-400/10 px-2 py-1 rounded">- {coupon.desconto_percentual}%</span>
                          <button onClick={() => handleDeleteCoupon(coupon.id)} className="text-rose-500/50 hover:text-rose-500 transition-colors p-1" title="Inativar Cupom">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>



          </div>
        </div>
      </main>
    </div>
  );
}
