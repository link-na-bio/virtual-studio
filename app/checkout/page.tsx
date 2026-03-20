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
  const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);
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

        const path = `${userId}/${orderId}/`;
        const { data: files, error: filesError } = await supabase.storage
          .from('previa_ensaios')
          .list(path);

        if (filesError) throw filesError;

        const validFiles = files ? files.filter(f => f.name !== '.emptyFolderPlaceholder') : [];

        const urlPromises = validFiles.map(async (file) => {
          const { data, error } = await supabase.storage
            .from('previa_ensaios')
            .createSignedUrl(`${path}${file.name}`, 3600);
          if (error) throw error;
          return data.signedUrl;
        });

        const urls = await Promise.all(urlPromises);
        setPreviewPhotos(urls);

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

      {/* 🛒 MAIN CHECKOUT CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto bg-[#121212]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

          <section className="lg:col-span-7 space-y-8">
            <header>
              <h2 className="text-3xl font-display uppercase tracking-widest mb-2 text-white">Finalizar Ensaio</h2>
              <p className="text-studio-gold/60 text-sm font-bold uppercase tracking-widest">Pedido #{pedido?.id.slice(0, 8)}</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
              {previewPhotos.map((url, i) => (
                <div key={i} className="relative group aspect-[3/4] overflow-hidden border border-white/5 bg-studio-black rounded-xl" onContextMenu={(e) => e.preventDefault()}>
                  <img
                    src={url}
                    alt={`Preview ${i + 1}`}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 z-10 cursor-not-allowed"></div>
                  <div
                    className="absolute inset-0 z-20 pointer-events-none opacity-25 mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cstyle%3E .watermark { font-family: 'sans-serif'; font-size: 10px; font-weight: 900; fill: %23ffffff; text-transform: uppercase; letter-spacing: 0.2em; opacity: 0.6; } %3C/style%3E%3Ctext x='50' y='50' transform='rotate(-45 50 50)' text-anchor='middle' className='watermark'%3EVIRTUAL STUDIO%3C/text%3E%3C/svg%3E")`,
                      backgroundRepeat: 'repeat',
                      backgroundSize: '80px 80px'
                    }}
                  ></div>
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase tracking-widest text-studio-gold border border-studio-gold/20 z-30">
                    Preview_{i + 1}.jpg
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="lg:col-span-5 space-y-8">
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-studio-gold/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-studio-gold/10 rounded-full blur-3xl"></div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-studio-gold/10 text-studio-gold flex items-center justify-center border border-studio-gold/30">
                  <PacoteIcon size={24} />
                </div>
                <div>
                  <h3 className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Pacote Selecionado</h3>
                  <p className="font-display text-2xl uppercase text-white">{pacoteInfo.nome}</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-300 relative z-10">
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-studio-gold" /> Até {pacoteInfo.fotos} fotos geradas em alta resolução
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-studio-gold" /> Sem marca d'água
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-studio-gold" /> Licença de uso comercial
                </li>
              </ul>
            </div>

            <div className="bg-[#0e0d0a] border border-white/5 p-8 rounded-2xl space-y-6">
              <h3 className="font-display text-lg uppercase tracking-widest text-studio-gold border-b border-white/10 pb-4">Resumo do Pedido</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 uppercase tracking-wider text-[10px] font-bold">Pacote {pacoteInfo.nome}</span>
                  <span className="text-white">R$ {pacoteInfo.preco.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 uppercase tracking-wider text-[10px] font-bold">Taxas</span>
                  <span className="text-emerald-400 uppercase text-[10px] font-bold">Isento</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span className="text-studio-gold font-display uppercase text-base font-bold">Total a Pagar</span>
                  <span className="text-white font-display text-3xl">R$ {pacoteInfo.preco.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessingPayment}
                className="w-full py-5 mt-4 bg-studio-gold text-studio-black font-display font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-studio-gold-light hover:scale-[1.02] transition-all rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.2)] disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <div className="w-5 h-5 border-2 border-studio-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Efetuar Pagamento
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="pt-6 flex flex-col items-center gap-4">
                <div className="flex items-center justify-center space-x-2 text-gray-500">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Pagamento Seguro via Stripe</span>
                </div>
                <p className="text-[10px] text-gray-600 text-center leading-relaxed">
                  Ao prosseguir, você concorda com nossos Termos de Serviço. As fotos em alta resolução serão liberadas imediatamente após a confirmação do pagamento.
                </p>
              </div>
            </div>
          </aside>
        </div>
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