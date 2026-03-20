'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import {
  Home,
  Library,
  PlusCircle,
  User,
  Settings,
  LogOut,
  ArrowRight,
  CreditCard,
  Lock,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Definição dos Pacotes e Preços Oficiais (Virtual Studio)
const PACOTES_INFO: Record<string, { nome: string, preco: number, fotos: number, icon: any }> = {
  'basico': { nome: 'Essencial', preco: 89.90, fotos: 10, icon: User },
  'popular': { nome: 'Premium', preco: 149.90, fotos: 25, icon: Star },
  'pro': { nome: 'Elite', preco: 247.90, fotos: 50, icon: Zap },
  'essencial': { nome: 'Essencial', preco: 89.90, fotos: 10, icon: User },
  'premium': { nome: 'Premium', preco: 149.90, fotos: 25, icon: Star },
  'elite': { nome: 'Elite', preco: 247.90, fotos: 50, icon: Zap }
};

// 1. Transformamos o antigo CheckoutPage no nosso "Conteúdo do Checkout"
function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [pedido, setPedido] = useState<any>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!orderId) {
        alert("Pedido não encontrado.");
        router.push('/dashboard');
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/login');
          return;
        }

        const userId = session.user.id;
        setUserEmail(session.user.email ?? '');
        setAvatarUrl(session.user.user_metadata?.avatar_url || null);

        const { data: orderData, error: orderError } = await supabase
          .from('pedidos')
          .select('*')
          .eq('id', orderId)
          .single();

        if (orderError || !orderData) throw new Error("Erro ao buscar detalhes do pedido.");

        if (orderData.user_id !== userId) {
          throw new Error("Acesso negado.");
        }

        setPedido(orderData);

      } catch (error: any) {
        console.error(error);
        alert(error.message);
        router.push('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [orderId, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);

    setTimeout(async () => {
      try {
        const { error } = await supabase
          .from('pedidos')
          .update({ status: 'Ensaio Concluído' })
          .eq('id', orderId);

        if (error) throw error;

        alert("Pagamento aprovado! Suas fotos em alta resolução estão liberadas.");
        router.push('/dashboard');
      } catch (error: any) {
        alert("Erro ao finalizar pedido: " + error.message);
      } finally {
        setIsProcessingPayment(false);
      }
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-studio-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-studio-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const pacoteInfo = pedido?.pacote ? PACOTES_INFO[pedido.pacote.toLowerCase()] : PACOTES_INFO['popular'];
  const PacoteIcon = pacoteInfo.icon;

  return (
    <div className="flex min-h-screen bg-studio-black text-white font-sans selection:bg-studio-gold selection:text-studio-black">

      {/* 🧭 SIDEBAR DO CLIENTE */}
      <aside className="w-64 border-r border-white/5 bg-studio-black flex flex-col sticky top-0 h-screen hidden md:flex shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <Image src="/logo.png" alt="Virtual Studio Logo" fill className="object-contain" priority />
            </div>
            <div>
              <h1 className="text-white text-sm font-bold">VIRTUAL STUDIO</h1>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest">Painel do Cliente</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <button onClick={() => router.push('/dashboard')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-studio-gold transition-colors">
              <Home size={18} />
              <span className="text-sm font-medium">Home</span>
            </button>
            <button onClick={() => router.push('/dashboard')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-studio-gold transition-colors">
              <Library size={18} />
              <span className="text-sm font-medium">Meus Ensaios</span>
            </button>
            <button onClick={() => router.push('/dashboard')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-studio-gold transition-colors">
              <PlusCircle size={18} />
              <span className="text-sm font-semibold">Novo Pedido</span>
            </button>
            <button onClick={() => router.push('/dashboard')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-studio-gold transition-colors">
              <User size={18} />
              <span className="text-sm font-medium">Perfil</span>
            </button>
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-studio-gold/20 flex items-center justify-center overflow-hidden relative border border-studio-gold/30">
              {avatarUrl ? (
                <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-studio-gold text-studio-black flex items-center justify-center font-bold text-lg">
                  {userEmail?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate font-display tracking-widest">{userEmail ? userEmail.split('@')[0] : 'Usuário'}</p>
              <p className="text-gray-500 text-[10px] truncate">{userEmail}</p>
            </div>
            <div className="relative flex gap-2">
              <button onClick={handleLogout} title="Sair da conta">
                <LogOut className="text-red-500 cursor-pointer hover:text-red-400 transition-colors" size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* 🛒 MAIN CHECKOUT CONTENT (Centralizado) */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#121212] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-studio-black border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] relative"
        >
          {/* Header do Checkout */}
          <div className="p-8 border-b border-white/5 bg-white/5 text-center relative z-10">
            <h2 className="text-3xl font-display uppercase tracking-widest mb-2 text-white">Finalizar Ensaio</h2>
            <p className="text-studio-gold font-bold uppercase tracking-widest text-xs">Pedido #{pedido?.id.slice(0, 8)}</p>
          </div>

          <div className="p-8 space-y-10 relative z-10">
            {/* Pacote Selecionado */}
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-studio-gold/20 relative overflow-hidden text-center flex flex-col items-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-studio-gold/10 rounded-full blur-3xl"></div>

              <div className="w-16 h-16 rounded-full bg-studio-gold/10 text-studio-gold flex items-center justify-center border border-studio-gold/30 mb-4">
                <PacoteIcon size={32} />
              </div>

              <h3 className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Pacote Selecionado</h3>
              <p className="font-display text-3xl uppercase text-white mb-6">{pacoteInfo.nome}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300 w-full text-left max-w-md mx-auto">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-studio-gold" />
                  Até {pacoteInfo.fotos} fotos HD
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-studio-gold" />
                  Sem marca d'água
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-studio-gold" />
                  Uso comercial livre
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-studio-gold" />
                  Entrega instantânea
                </div>
              </div>
            </div>

            {/* Resumo e Pagamento */}
            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm border-b border-white/10 pb-4">
                <span className="text-gray-400 uppercase tracking-widest text-xs font-bold">Investimento Total</span>
                <span className="text-white font-display text-4xl font-black">R$ {pacoteInfo.preco.toFixed(2)}</span>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                  className="w-full py-6 bg-studio-gold text-studio-black font-display font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-studio-gold-light hover:scale-[1.02] transition-all rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.3)] disabled:opacity-50 text-lg"
                >
                  {isProcessingPayment ? (
                    <div className="w-6 h-6 border-2 border-studio-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Pagar Agora via Stripe
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center justify-center space-x-2 text-gray-500">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <span className="text-[10px] uppercase tracking-widest font-bold tracking-[0.2em]">Pagamento 100% Seguro</span>
                  </div>
                  <p className="text-[9px] text-gray-600 text-center leading-relaxed max-w-xs uppercase tracking-wider">
                    As fotos em alta resolução serão liberadas na sua conta imediatamente após a confirmação.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decoração de fundo sutil */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-studio-gold/5 rounded-full blur-3xl -z-0"></div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-studio-gold/5 rounded-full blur-3xl -z-0"></div>
        </motion.div>
      </main>
    </div>
  );
}

// 2. A bolha de proteção (Suspense) envolvendo o checkout
export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-studio-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-studio-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}