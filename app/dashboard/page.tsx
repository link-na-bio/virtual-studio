'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Camera, 
  Home, 
  Library, 
  PlusCircle, 
  User, 
  Settings, 
  CloudUpload, 
  Check, 
  Clock, 
  CheckCheck, 
  Archive, 
  HelpCircle,
  MessageSquare,
  X,
  Send,
  Sparkles,
  Headset
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Dashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['LinkedIn']);

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    } else if (selectedStyles.length < 3) {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  return (
    <div className="flex min-h-screen bg-studio-black text-white">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 bg-studio-black flex flex-col sticky top-0 h-screen hidden md:flex">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-studio-gold rounded flex items-center justify-center">
              <Camera className="text-studio-black" size={18} />
            </div>
            <div>
              <h1 className="text-white text-sm font-bold">AI Photo Studio</h1>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest">Painel do Cliente</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-studio-gold transition-colors">
              <Home size={18} />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-studio-gold transition-colors">
              <Library size={18} />
              <span className="text-sm font-medium">Meus Ensaios</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 bg-studio-gold/10 text-studio-gold border-r-2 border-studio-gold transition-colors">
              <PlusCircle size={18} />
              <span className="text-sm font-semibold">Novo Pedido</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-studio-gold transition-colors">
              <User size={18} />
              <span className="text-sm font-medium">Perfil</span>
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-studio-gold/20 flex items-center justify-center overflow-hidden relative">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApVoUWWWOkvx-6seBGqpbrMUG8IklvLesuRVHnIGhorRvnxiizwaloOnq5tXOF62Cf0SWnYEdDsrzeQ1jJM63fnHxzSmQ1xSbMZaaqvope0P0envbx8H51yHCPIT5SRWjNkWSNgVJ_Ynlue0AKc_vCTBG1AdaLTaq-RmttvgBpgym_9O-Gy1E-FNBdLREgu7z_5M1Hd5IL37q0rnpbIjDiSDyiEirpTmpZwDEnapfJFcugQKG-mb_ytbaTBcNAXUzfVxaLKZdKgwMH"
                alt="Avatar"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate font-display uppercase tracking-widest">Alex Silva</p>
              <p className="text-gray-500 text-[10px]">Plano Pro</p>
            </div>
            <div className="relative">
              <Settings className="text-gray-500 cursor-pointer hover:text-studio-gold transition-colors" size={18} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="relative inline-flex items-center justify-center rounded-full h-4 w-4 bg-red-600 text-[8px] font-bold text-white border border-studio-black">1</span>
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-[#121212]">
        <header className="mb-8">
          <h2 className="text-2xl font-bold">Novo Ensaio</h2>
          <p className="text-gray-500">Siga os passos abaixo para gerar suas fotos profissionais com IA.</p>
        </header>

        {/* Wizard Steps Indicator */}
        <div className="flex items-center gap-8 mb-10 border-b border-white/5">
          <div className="flex items-center gap-2 pb-4 border-b-2 border-studio-gold text-studio-gold">
            <span className="w-6 h-6 rounded-full bg-studio-gold text-studio-black text-xs flex items-center justify-center font-bold">1</span>
            <span className="text-sm font-bold font-display uppercase tracking-widest">Escolher Estilos</span>
          </div>
          <div className="text-gray-500 flex items-center gap-2 pb-4">
            <span className="w-6 h-6 rounded-full border border-gray-500 text-xs flex items-center justify-center">2</span>
            <span className="text-sm font-bold font-display uppercase tracking-widest">Upload de Fotos</span>
          </div>
          <div className="text-gray-500 flex items-center gap-2 pb-4">
            <span className="w-6 h-6 rounded-full border border-gray-500 text-xs flex items-center justify-center">3</span>
            <span className="text-sm font-bold font-display uppercase tracking-widest">Revisão</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Step 1 & 2 Container */}
          <div className="lg:col-span-2 space-y-10">
            {/* Style Selection Grid */}
            <section>
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-xl font-bold font-display uppercase tracking-widest">1. Selecione os estilos desejados</h3>
                <span className="text-gray-500 text-xs">Selecione até 3 estilos ({selectedStyles.length}/3)</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { id: 'LinkedIn', title: 'Profissional LinkedIn', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALXrXlCCFvyetET0VD21T_lARuCFX-xhZsJ9_hh4exmvo2yfBIRPmPAeYGhkm0gvB1Vl89p2Xqkxmds_gKYnmHLyzLDp956bSwcVaivAGQSyiXxJqDIcgdY3FbRrtdBRpinu9M-DXePdLxlhX1TYxbkoTxBOzPVlFEZv-s6aIlLnCUzGlgJbFijCMMzPLJaIELGCs8WqJocBU45X5SpleWfMWgshqnaO6tu6K9U6RfZe8PmBTdVdyG5HtkcJUdLDzwGvDT1NRnB4VU' },
                  { id: 'Cyberpunk', title: 'Cyberpunk Night', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE9GQWOUefHfWCXeSCrxAnktS17MUuBrhVcxkk2gSBFJ0aH1Y0DLFV_ySFHx9l0vnx-CXSbdyPlMBc40xu5KaUsCvCv9PCHfQLyJyKHiORJm13B8m5uZ0sHDEmXOFJhnHci9aWxSwIpZnlsjcXzkEXqJAiJIFzQt8V7Gxf1b84_vqUfkE2syucROsnMjhHbV9M_WHcZbAxjTpVNmnYkPL94hEGwU08LEKmvHO7zlmhI_LnzXXo2yiwxNd1kL41SiinraB1jONY6i99' },
                  { id: 'Casual', title: 'Casual Externo', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyEJ9lKfYhevI9XiXuxtl2P16Gx2A6RfOaDNpw11V1tXgVraAef01glzZu_9oyDriw3VaR30R7bsGOh07KcQGbYx2LE1L7nmZgYPbldf8zPPKk6P5PHDH2h6o3juIxH6pwvGZBHTSDqXW17NmWGh8VL_l5LQLR-wV2x7iciLWbqRXmDkhLMGvAuNbGRRcwc0hV7tZOxA_PxRDk836FtWqslZPY1iKw-9wuIZmeGu7IL82vLd-7-FLIlSf2gLBa7l5Yb4QqUvidrLwo' }
                ].map((style) => (
                  <div 
                    key={style.id} 
                    onClick={() => toggleStyle(style.id)}
                    className={`relative group cursor-pointer border overflow-hidden transition-all ${selectedStyles.includes(style.id) ? 'border-studio-gold shadow-2xl scale-[1.02]' : 'border-white/10 hover:border-studio-gold/50'}`}
                  >
                    <div className="aspect-square relative">
                      <Image 
                        src={style.img} 
                        alt={style.title} 
                        fill 
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className={`absolute inset-0 flex flex-col justify-end p-4 transition-all ${selectedStyles.includes(style.id) ? 'bg-studio-gold/20' : 'bg-black/40 group-hover:bg-black/20'}`}>
                      {selectedStyles.includes(style.id) && (
                        <div className="absolute top-2 right-2 bg-studio-gold text-studio-black rounded-full p-1">
                          <Check size={12} strokeWidth={4} />
                        </div>
                      )}
                      <p className="text-white font-bold drop-shadow-md font-display uppercase tracking-widest text-xs">{style.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Upload Zone */}
            <section>
              <h3 className="text-xl font-bold mb-6 font-display uppercase tracking-widest">2. Upload de Fotos de Referência</h3>
              <div className="border border-dashed border-studio-gold/30 p-12 flex flex-col items-center justify-center text-center bg-white/5 hover:border-studio-gold transition-colors cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-studio-gold/10 text-studio-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CloudUpload size={32} />
                </div>
                <h4 className="text-lg font-bold font-display uppercase tracking-widest">Arraste e solte suas fotos aqui</h4>
                <p className="text-gray-500 text-sm mt-2">Envie entre 5 a 10 fotos nítidas do seu rosto para melhores resultados. Formatos aceitos: JPG, PNG.</p>
                <button className="mt-6 px-6 py-2 bg-studio-gold text-studio-black font-display font-bold uppercase tracking-widest hover:bg-studio-gold-light transition-all">Selecionar Arquivos</button>
              </div>
            </section>
          </div>

          {/* Sidebar Info / Recent Orders */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <div className="bg-studio-black p-6 border border-white/5 shadow-sm">
              <h3 className="text-lg font-bold mb-4 font-display uppercase tracking-widest">Resumo do Pedido</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Estilos selecionados</span>
                  <span className="font-semibold">{selectedStyles.length}/3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Fotos enviadas</span>
                  <span className="font-semibold text-red-500">0/10</span>
                </div>
                <div className="border-t border-white/5 my-2"></div>
                <div className="flex justify-between text-lg font-bold font-display uppercase tracking-widest">
                  <span>Total</span>
                  <span>R$ 49,90</span>
                </div>
              </div>
              <button className="w-full py-3 bg-studio-gold text-studio-black font-display font-bold uppercase tracking-widest hover:bg-studio-gold-light transition-all">Prosseguir para Pagamento</button>
              <p className="text-gray-500 text-[10px] text-center mt-4 uppercase tracking-widest">Processamento seguro via Stripe</p>
            </div>

            {/* Recent Orders List */}
            <div className="bg-studio-black p-6 border border-white/5 shadow-sm">
              <h3 className="text-lg font-bold mb-4 font-display uppercase tracking-widest">Pedidos Recentes</h3>
              <div className="space-y-4">
                {[
                  { title: 'Ensaio Executivo', time: 'Há 2 dias', status: 'Em produção', icon: <Sparkles size={16} />, color: 'text-amber-400 bg-amber-900/30' },
                  { title: 'Pack Social Media', time: 'Há 5 dias', status: 'Prévia Disponível', icon: <CheckCheck size={16} />, color: 'text-green-400 bg-green-900/30' },
                  { title: 'Exploração Cyberpunk', time: 'Há 12 dias', status: 'Arquivado', icon: <Archive size={16} />, color: 'text-slate-400 bg-white/5' }
                ].map((order, i) => (
                  <div key={i} className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <div className={`w-10 h-10 rounded flex items-center justify-center shrink-0 ${order.color}`}>
                      {order.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-bold truncate font-display uppercase tracking-widest">{order.title}</p>
                        <span className="text-gray-500 text-[10px]">{order.time}</span>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${order.color}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 border border-white/10 rounded text-xs font-semibold text-gray-400 hover:bg-white/5 transition-colors uppercase tracking-widest">Ver todos os pedidos</button>
            </div>

            {/* Help Card */}
            <div className="bg-studio-gold/5 p-4 border border-studio-gold/20 flex items-center gap-4">
              <HelpCircle className="text-studio-gold" size={24} />
              <div>
                <p className="text-white text-sm font-bold">Precisa de ajuda?</p>
                <p className="text-gray-500 text-xs">Fale com nosso suporte em tempo real.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Chat Button */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-studio-gold text-studio-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <MessageSquare size={28} />
        <span className="absolute top-3 right-3 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 border border-studio-black"></span>
        </span>
      </button>

      {/* Elegant Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-studio-black border border-studio-gold/30 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-studio-gold p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-studio-black flex items-center justify-center">
                  <Headset className="text-studio-gold" size={16} />
                </div>
                <div>
                  <h4 className="text-studio-black font-bold font-display uppercase text-sm tracking-wider">Suporte VIP</h4>
                  <p className="text-studio-black/70 text-[10px] uppercase font-bold">Online agora</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-studio-black hover:rotate-90 transition-transform">
                <X size={20} />
              </button>
            </div>
            {/* Chat Content */}
            <div className="p-6 h-80 overflow-y-auto space-y-4 bg-[#121212]/50">
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-studio-gold/20 flex items-center justify-center shrink-0">
                  <Sparkles size={12} className="text-studio-gold" />
                </div>
                <div className="bg-white/5 p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl">
                  <p className="text-xs text-gray-300">Olá! Sou seu assistente de estilo. Como posso ajudar com seu novo ensaio hoje?</p>
                </div>
              </div>
            </div>
            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-studio-black">
              <div className="relative">
                <input className="w-full bg-white/5 border border-studio-gold/20 py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-studio-gold placeholder-gray-600" placeholder="Digite sua mensagem..." type="text"/>
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-studio-gold hover:translate-x-1 transition-transform">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
