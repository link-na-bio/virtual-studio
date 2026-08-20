'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Star,
  ArrowRight,
  Sparkles,
  DollarSign,
  Clock,
  Shirt,
  TrendingDown,
  Camera,
  UploadCloud,
  Layers,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Instagram,
  Mail,
  Zap,
  Award,
  TrendingUp,
  X,
  Eye,
  Sliders,
  Users
} from 'lucide-react';
import { packsLojistas, doresLojistas, faqsLojistas, depoimentosLojistas, AvatarModel } from './data';
import { galleryData } from '@/app/galeria/data';
import SalesNotification from '@/components/SalesNotification';

interface AvatarWorkflow {
  id: string;
  nome: string;
  categoria: string;
  genero: 'Feminino' | 'Masculino';
  descricao: string;
  image_sheet_url: string;
  product_original_url: string;
  product_transformed_url: string;
  style_category: string;
}

const lojistasWorkflowAvatars: AvatarWorkflow[] = [
  {
    id: "VS-F-001",
    nome: "Sophia Vance",
    categoria: "Elegância Urbana",
    genero: "Feminino",
    descricao: "Perfil cosmopolita, expressivo e de alta autoridade visual. Perfeito para blazers, joias contemporâneas e óculos.",
    image_sheet_url: "/images/lojistas/sheet-f-001.png",
    product_original_url: "/images/lojistas/blusa-aura.png",
    product_transformed_url: "/images/lojistas/product-after-f-blouse.png",
    style_category: "Elegância Urbana"
  },
  {
    id: "VS-M-002",
    nome: "Lucas Sterling",
    categoria: "Minimalismo de Estúdio",
    genero: "Masculino",
    descricao: "Estética limpa, olhar magnético e postura impecável. Ideal para relógios, camisaria e perfumes premium.",
    image_sheet_url: "/images/lojistas/sheet-m-002.png",
    product_original_url: "/images/lojistas/casaco-calça-masculino.png",
    product_transformed_url: "/images/lojistas/product-after-m-outfit.png",
    style_category: "Minimalismo de Estúdio"
  },
  {
    id: "VS-F-003",
    nome: "Elena Rostova",
    categoria: "Luxo Casual",
    genero: "Feminino",
    descricao: "Atmosfera sofisticada com toque despojado e iluminação suave de fim de tarde. Excelente para bolsas de couro e semijoias.",
    image_sheet_url: "/images/lojistas/sheet-f-003.png",
    product_original_url: "/images/lojistas/vestido-verde.jpeg",
    product_transformed_url: "/images/lojistas/product-after-f-dress.png",
    style_category: "Luxo Casual"
  },
  {
    id: "VS-M-004",
    nome: "Marcus Blackwood",
    categoria: "Clássico Atemporal",
    genero: "Masculino",
    descricao: "Presença imponente, contraste low-key e elegância clássica. Desenvolvido para trajes finos e marcas masculinas premium.",
    image_sheet_url: "/images/lojistas/sheet-m-004.png",
    product_original_url: "/images/lojistas/product-before-m-suit.jpeg",
    product_transformed_url: "/images/lojistas/product-after-m-suit.jpeg",
    style_category: "Clássico Atemporal"
  },
  {
    id: "VS-F-005",
    nome: "Beatriz Ferraz",
    categoria: "Minimalismo de Estúdio",
    genero: "Feminino",
    descricao: "Recorte nítido e iluminação suave de estúdio corporativo. Desenvolvido especialmente para realçar brilho de metais, colares e joias finas.",
    image_sheet_url: "/images/lojistas/sheet-f-005.png",
    product_original_url: "/images/lojistas/colar-brinco.jpg",
    product_transformed_url: "/images/lojistas/colar-brinco.png",
    style_category: "Minimalismo de Estúdio"
  },
  {
    id: "VS-M-006",
    nome: "Gabriel Silva",
    categoria: "Elegância Urbana",
    genero: "Masculino",
    descricao: "Atmosfera urbana vibrante com luz natural difusa. Excelente para destacar o design, textura e caimento de tênis casuais e calçados premium.",
    image_sheet_url: "/images/lojistas/sheet-m-006.png",
    product_original_url: "/images/lojistas/tenis-nike.jpeg",
    product_transformed_url: "/images/lojistas/product-after-shoes.png",
    style_category: "Elegância Urbana"
  }
];

export default function LojistasPage() {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [selectedAvatars, setSelectedAvatars] = useState<AvatarModel[]>([]);
  const [modalAvatar, setModalAvatar] = useState<AvatarModel | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Controle de comparação Antes/Depois visual interativo para Hero e Cases
  const [sliderHero, setSliderHero] = useState<number>(55);
  const [sliderCase1, setSliderCase1] = useState<number>(50);
  const [sliderCase2, setSliderCase2] = useState<number>(50);

  // Estados e Handlers para o Carrossel de Avatares (Workflow)
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const activeAvatar = lojistasWorkflowAvatars[currentAvatarIndex];

  const handleNextAvatar = () => {
    setCurrentAvatarIndex((prev) => (prev + 1) % lojistasWorkflowAvatars.length);
    setCurrentSlideIndex(0);
  };

  const handlePrevAvatar = () => {
    setCurrentAvatarIndex((prev) => (prev - 1 + lojistasWorkflowAvatars.length) % lojistasWorkflowAvatars.length);
    setCurrentSlideIndex(0);
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % 4);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + 4) % 4);
  };

  // Mapeia galleryData (excluindo categorias que não são voltadas para lojistas B2B)
  const EXCLUDED_CATEGORIES = [
    'especial dia dos pais',
    'copa 2026',
    'evento',
    'especial dia dos namorados',
    'profissões e negócios',
    'especial dia das mães',
    'newborn',
    'formatura',
    'gestação'
  ];

  const EXCLUDED_TITLES = [
    'live-action com bob esponja',
    'lifestyle 41/50',
    'lifestyle 43/50',
    'lifestyle 44/50',
    'estúdio 16/50'
  ];

  const avataresLojistas: AvatarModel[] = galleryData
    .filter(item => {
      const isExcludedCategory = EXCLUDED_CATEGORIES.includes(item.categoria?.toLowerCase() || '');
      const isExcludedTitle = EXCLUDED_TITLES.includes(item.titulo?.toLowerCase() || '');
      return !isExcludedCategory && !isExcludedTitle;
    })
    .map((item, index) => ({
      id: item.id,
      codigo: `VS-${(index + 1).toString().padStart(3, '0')}`,
      nome: item.titulo,
      categoria: item.categoria as any,
      genero: (item.genero === 'Ambos' ? 'Todos' : item.genero) as any,
      etnia: 'Fotorrealismo IA',
      descricao: item.descricao,
      img_url: item.img_url,
      indicacaoProdutos: item.dica_roupa ? [item.dica_roupa] : ['Vestuário Geral', 'Editorial'],
      destaque: index < 8
    }));

  // Categorias de filtro extraídas dinamicamente dos avatares B2B válidos
  const uniqueCategories = Array.from(new Set(avataresLojistas.map((s: any) => s.categoria))).filter(Boolean) as string[];
  const categories = ['Todos', ...uniqueCategories];

  // Alternar seleção de avatar para orçamento
  const toggleAvatar = (avatar: AvatarModel, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedAvatars(prev => {
      const exists = prev.find(a => a.id === avatar.id);
      if (exists) {
        return prev.filter(a => a.id !== avatar.id);
      } else {
        return [...prev, avatar];
      }
    });
  };

  // Cálculo de desconto e preço para avatares selecionados
  const getPrecoUnitario = (qtd: number) => {
    if (qtd >= 20) return 7.40;
    if (qtd >= 10) return 9.79;
    if (qtd >= 5) return 13.58;
    return 19.90;
  };

  const getPackageSugestao = (qtd: number) => {
    if (qtd >= 20) return 'Pack Elite (20+ fotos)';
    if (qtd >= 10) return 'Pack Premium (10+ fotos)';
    if (qtd >= 5) return 'Pack Essencial (5+ fotos)';
    return 'Avulso (Sugerimos 5+ para desconto)';
  };

  const getWhatsAppLinkSelecao = () => {
    const qtd = selectedAvatars.length || 1;
    const precoUnit = getPrecoUnitario(qtd);
    const total = qtd * precoUnit;
    const nomes = selectedAvatars.map(a => `${a.codigo} (${a.nome})`).join(', ');

    const texto = `Olá! Selecionei ${qtd} modelo(s) virtual(is) na página para Lojistas do Virtual Studio:\n` +
      `- Avatares: ${nomes}\n` +
      `- Sugestão de Pacote: ${getPackageSugestao(qtd)}\n` +
      `- Valor estimado: R$ ${total.toFixed(2).replace('.', ',')} (R$ ${precoUnit.toFixed(2).replace('.', ',')}/foto)\n\n` +
      `Gostaria de saber como enviar as fotos dos meus produtos para iniciar meu ensaio de elite!`;

    return `https://wa.me/556193314473?text=${encodeURIComponent(texto)}`;
  };

  const getWhatsAppLinkAvatar = (avatar: AvatarModel) => {
    const texto = `Olá, tenho interesse em realizar o ensaio da minha loja com o modelo virtual ${avatar.nome} (${avatar.codigo} - ${avatar.categoria}) do Virtual Studio. Como podemos começar?`;
    return `https://wa.me/556193314473?text=${encodeURIComponent(texto)}`;
  };

  const getWhatsAppLinkPack = (packNome: string, waMensagem: string) => {
    return `https://wa.me/556193314473?text=${encodeURIComponent(waMensagem)}`;
  };

  // Filtragem dos avatares
  const filteredAvatars = avataresLojistas.filter(avatar => {
    return activeCategory === 'Todos' || avatar.categoria === activeCategory;
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-studio-black text-white font-sans flex flex-col selection:bg-studio-gold selection:text-studio-black">
      {/* Header Fixo Premium */}
      <header className="fixed top-0 w-full z-50 bg-studio-black/90 backdrop-blur-md py-4 border-b border-white/5 transition-all">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group text-gray-400 hover:text-studio-gold transition">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition" />
            <span className="uppercase tracking-widest text-xs font-display font-semibold">Voltar para Home</span>
          </Link>

          {/* Logo Oficial Centralizada */}
          <Link href="/" className="relative w-[180px] sm:w-[220px] h-[60px] flex items-center justify-center">
            <Image
              src="/logo_transparente_.png"
              alt="Virtual Studio Gold Premium Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Botão de WhatsApp Rápido */}
          <a
            href="https://wa.me/556193314473?text=Ol%C3%A1!%20Sou%20lojista%20e%20quero%20saber%20mais%20sobre%20os%20ensaios%20com%20IA%20para%20meus%20produtos."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-studio-gold text-studio-black px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-studio-gold-light transition rounded-lg shadow-lg shadow-studio-gold/20"
          >
            <MessageCircle size={16} className="fill-studio-black" />
            Atendimento Zap
          </a>
        </div>
      </header>

      {/* 1. HERO SECTION (Topo da Página) */}
      <section className="pt-36 pb-20 md:pb-32 relative overflow-hidden">
        {/* Glow de fundo Dark Premium */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[400px] bg-studio-gold/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Texto do Hero */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-studio-gold/10 border border-studio-gold/30 text-studio-gold text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles size={14} className="animate-pulse" />
                SOLUÇÃO EXCLUSIVA PARA E-COMMERCE & LOJISTAS
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight italic font-display mb-6 leading-[1.08]">
                Virtual Studio para <span className="text-studio-gold block sm:inline">Lojistas:</span> <br className="hidden sm:block" />
                Ensaios de Elite com IA
              </h1>

              <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                Transforme seus produtos em <span className="text-white font-semibold">obras de arte que vendem</span>, sem os custos, a logística e a complexidade dos ensaios fotográficos tradicionais.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => scrollToSection('modelos')}
                  className="w-full sm:w-auto px-8 py-5 bg-studio-gold text-studio-black font-black uppercase tracking-widest text-xs sm:text-sm rounded-xl hover:bg-studio-gold-light transition-all shadow-[0_15px_35px_rgba(212,175,55,0.3)] hover:scale-105 flex items-center justify-center gap-3 group"
                >
                  Conheça Nossos Modelos Virtuais
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection('packs')}
                  className="w-full sm:w-auto px-8 py-5 bg-white/5 border border-white/10 hover:border-studio-gold/50 text-white font-bold uppercase tracking-widest text-xs sm:text-sm rounded-xl transition-all hover:bg-white/10 flex items-center justify-center gap-2"
                >
                  Ver Packs e Valores
                </button>
              </div>

              {/* Badges de Confiança */}
              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-center lg:text-left">
                <div className="flex flex-col items-center lg:items-start">
                  <p className="text-studio-gold font-serif text-2xl md:text-3xl font-bold italic">80% -</p>
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-medium mt-1">Economia no Custo por Foto</p>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <p className="text-studio-gold font-serif text-2xl md:text-3xl font-bold italic">Full HD</p>
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-medium mt-1">Resolução Fotorrealista</p>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <p className="text-studio-gold font-serif text-2xl md:text-3xl font-bold italic">Até 48h</p>
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-medium mt-1">Entrega Rápida</p>
                </div>
              </div>
            </motion.div>

            {/* Demonstração visual interativa do Hero (Antes: Produto no Cabide / Depois: Ensaio de Elite com Avatar) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 w-full max-w-xl mx-auto"
            >
              <div className="bg-[#141414] border border-studio-gold/30 rounded-2xl p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="text-xs font-mono text-gray-400 ml-2 uppercase tracking-widest">Virtual Studio</span>
                  </div>
                  <span className="text-[10px] bg-studio-gold/20 text-studio-gold px-2.5 py-1 rounded font-bold uppercase tracking-widest">
                    Simulação Interativa
                  </span>
                </div>

                {/* Container de comparação com slider */}
                <div className="relative aspect-[4/5] sm:aspect-[1/1] w-full overflow-hidden rounded-xl bg-black select-none border border-white/5">
                  {/* Foto Base (Depois - Com Virtual Studio) */}
                  <Image
                    src="/images/avatar_lojistas/casaco_depois.png"
                    alt="Depois: Ensaio com Modelo Virtual"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />

                  {/* Camada do Antes (Foto Bruta do Produto) - cortada com clipPath */}
                  <div
                    className="absolute inset-0 z-10"
                    style={{ clipPath: `inset(0 ${100 - sliderHero}% 0 0)` }}
                  >
                    <Image
                      src="/images/avatar_lojistas/casaco_antes.png"
                      alt="Antes: Foto Simples do Produto"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>

                  {/* Linha e Puxador do Slider */}
                  <div
                    className="absolute inset-y-0 z-20 w-1 bg-studio-gold shadow-[0_0_20px_rgba(212,175,55,0.8)] pointer-events-none"
                    style={{ left: `${sliderHero}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-studio-gold rounded-full flex items-center justify-center shadow-2xl border-4 border-studio-black text-studio-black font-black">
                      <Sliders size={18} />
                    </div>
                  </div>

                  {/* Input do Slider real invisível */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderHero}
                    onChange={(e) => setSliderHero(Number(e.target.value))}
                    className="absolute inset-0 z-30 opacity-0 cursor-ew-resize w-full h-full"
                  />

                  {/* Labels Antes/Depois */}
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <span className="bg-black/80 text-gray-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded border border-white/10">
                      ← Antes <span className="hidden sm:inline">(Sua Foto Simples)</span>
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 z-20 pointer-events-none">
                    <span className="bg-studio-gold text-studio-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded shadow-lg">
                      <span className="sm:hidden">Depois →</span>
                      <span className="hidden sm:inline">Depois (Com Virtual Studio) →</span>
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Eye size={14} className="text-studio-gold" /> Arraste a linha para comparar
                  </span>
                  <span className="font-semibold text-white">Exemplo Real • Casaco de Lã Premium</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SEÇÃO "A DOR DO LOJISTA" (Problema) */}
      <section className="py-24 bg-[#0d0d0d] border-y border-white/5 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase italic tracking-tight font-display mb-4">
              Cansado de Fotos que <span className="text-red-500">Não Vendem?</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
              O mercado de e-commerce nunca esteve tão competitivo. Se a sua loja ainda depende dos métodos antigos ou de fotos amadoras, o prejuízo diário em vendas é inevitável.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {doresLojistas.map((dor, index) => (
              <div
                key={index}
                className="bg-studio-black border border-white/5 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-300 flex flex-col items-start group"
              >
                <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                  {dor.icone === 'DollarSign' && <DollarSign size={28} />}
                  {dor.icone === 'Clock' && <Clock size={28} />}
                  {dor.icone === 'Shirt' && <Shirt size={28} />}
                  {dor.icone === 'TrendingDown' && <TrendingDown size={28} />}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide font-display mb-3 text-white">
                  {dor.titulo}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {dor.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO "A SOLUÇÃO VIRTUAL STUDIO" (Proposta de Valor) */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-studio-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-studio-gold text-xs font-bold uppercase tracking-[0.3em] block mb-3">
              SIMPLICIDADE, VELOCIDADE & QUALIDADE FULL HD
            </span>
            <h2 className="text-3xl md:text-6xl font-extrabold uppercase italic tracking-tight font-display mb-6">
              A Revolução <span className="text-studio-gold">Dark Premium</span> para o Seu E-commerce
            </h2>
            <p className="text-gray-300 text-lg font-light leading-relaxed">
              Esqueça o estresse de alugar estúdios e coordenar equipes. Com o Virtual Studio, você transforma qualquer foto do seu produto em um ensaio de alto padrão mundial em apenas 3 passos:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
            {/* Linha conectora desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-studio-gold/20 via-studio-gold to-studio-gold/20 -translate-y-12 z-0"></div>

            {/* Passo 1 */}
            <div className="bg-[#141414] border border-studio-gold/20 rounded-2xl p-8 relative z-10 hover:border-studio-gold/60 transition-all duration-300 hover:-translate-y-1 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-studio-gold text-studio-black font-black text-2xl flex items-center justify-center mb-6 shadow-lg shadow-studio-gold/20 font-display">
                01
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider font-display mb-3 text-white flex items-center gap-2">
                <Users size={20} className="text-studio-gold" />
                Escolha seu Modelo
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Navegue por nossa galeria exclusiva de avatares de elite. Escolha a estética, etnia, gênero e estilo que melhor dialogam com a identidade e o público da sua marca.
              </p>
            </div>

            {/* Passo 2 */}
            <div className="bg-[#141414] border border-studio-gold/20 rounded-2xl p-8 relative z-10 hover:border-studio-gold/60 transition-all duration-300 hover:-translate-y-1 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-studio-gold text-studio-black font-black text-2xl flex items-center justify-center mb-6 shadow-lg shadow-studio-gold/20 font-display">
                02
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider font-display mb-3 text-white flex items-center gap-2">
                <UploadCloud size={20} className="text-studio-gold" />
                Envie seu Produto
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Faça o upload da foto da sua peça ou produto (no cabide, manequim ou superfície plana). Você não precisa gastar com frete nem esperar transporte.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="bg-[#141414] border border-studio-gold/20 rounded-2xl p-8 relative z-10 hover:border-studio-gold/60 transition-all duration-300 hover:-translate-y-1 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-studio-gold text-studio-black font-black text-2xl flex items-center justify-center mb-6 shadow-lg shadow-studio-gold/20 font-display">
                03
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider font-display mb-3 text-white flex items-center gap-2">
                <Sparkles size={20} className="text-studio-gold" />
                Receba seu Ensaio
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Nossa IA generativa combinada com curadoria artística humana entrega imagens fotorrealistas Full HD, com luzes, caimento perfeito e prontas para usar em suas redes sociais e e-commerce.
              </p>
            </div>
          </div>

          {/* Destaques comparativos */}
          <div className="mt-16 bg-gradient-to-r from-studio-gold/10 via-[#1a1a1a] to-studio-gold/10 border border-studio-gold/30 rounded-2xl p-8 max-w-2xl md:max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-around gap-6 text-left">
            <div className="flex items-start gap-3 w-full md:w-auto">
              <CheckCircle2 className="text-studio-gold shrink-0 mt-1" size={22} />
              <div>
                <p className="text-white font-bold text-base uppercase leading-snug">Qualidade Cinematográfica</p>
                <p className="text-gray-400 text-xs mt-0.5">Iluminação física & texturas reais</p>
              </div>
            </div>
            <div className="flex items-start gap-3 w-full md:w-auto">
              <CheckCircle2 className="text-studio-gold shrink-0 mt-1" size={22} />
              <div>
                <p className="text-white font-bold text-base uppercase leading-snug">Economia Absoluta</p>
                <p className="text-gray-400 text-xs mt-0.5">Até 80% mais barato que estúdios</p>
              </div>
            </div>
            <div className="flex items-start gap-3 w-full md:w-auto">
              <CheckCircle2 className="text-studio-gold shrink-0 mt-1" size={22} />
              <div>
                <p className="text-white font-bold text-base uppercase leading-snug">Licença Comercial Total</p>
                <p className="text-gray-400 text-xs mt-0.5">Para Site, Instagram, Meta Ads & Google</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEÇÃO "NOSSOS MODELOS VIRTUAIS DE ELITE" (Carrossel de Avatares) */}
      <section id="modelos" className="py-24 bg-[#0a0a0a] border-t border-white/5 scroll-mt-24 relative overflow-hidden">
        {/* Background glow decorativo */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-studio-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-studio-gold uppercase tracking-[0.4em] text-xs font-bold mb-3 font-display">
              CATÁLOGO DE AVATARES
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 italic uppercase tracking-tighter font-display">
              Escolha o <span className="text-studio-gold">Avatar Perfeito</span> Para Sua Marca
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
              Navegue pelos nossos modelos virtuais e visualize o workflow de estilo do Virtual Studio. Veja a transformação de um produto simples em um ensaio de luxo.
            </p>
          </div>

          {/* Componente Carrossel Interativo */}
          <div className="max-w-5xl mx-auto bg-[#111111]/80 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md relative shadow-2xl">
            {/* Navegação entre Avatares (Setas Laterais) - Desktop */}
            <button
              onClick={handlePrevAvatar}
              className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-[#141414] border border-white/10 text-white hover:text-studio-black hover:bg-studio-gold hover:border-studio-gold hover:scale-110 size-12 rounded-full items-center justify-center transition-all cursor-pointer shadow-lg"
              aria-label="Avatar anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNextAvatar}
              className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-[#141414] border border-white/10 text-white hover:text-studio-black hover:bg-studio-gold hover:border-studio-gold hover:scale-110 size-12 rounded-full items-center justify-center transition-all cursor-pointer shadow-lg"
              aria-label="Próximo avatar"
            >
              <ChevronRight size={24} />
            </button>

            {/* Selector de Modelos no Topo */}
            <div className="flex justify-start md:justify-center gap-2 mb-6 overflow-x-auto pb-3 scrollbar-none flex-nowrap -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth">
              {lojistasWorkflowAvatars.map((av, idx) => (
                <button
                  key={av.id}
                  onClick={() => { setCurrentAvatarIndex(idx); setCurrentSlideIndex(0); }}
                  className={`px-4 py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all border shrink-0 ${currentAvatarIndex === idx
                    ? 'bg-studio-gold border-studio-gold text-studio-black shadow-[0_0_15px_rgba(212,175,55,0.35)] scale-105'
                    : 'bg-transparent border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                    }`}
                >
                  {av.id} ({av.genero === 'Feminino' ? 'F' : 'M'})
                </button>
              ))}
            </div>

            {/* Grid Principal: Esquerda Imagem, Direita Texto e Controles de Workflow */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Esquerda: Container da Imagem com Aspect Ratio 4:5 */}
              <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-studio-black/60 border border-white/5 shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentAvatarIndex}-${currentSlideIndex}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {currentSlideIndex === 3 ? (
                      /* Slide 4: CTA com Logo Gold Premium */
                      <div className="absolute inset-0 bg-gradient-to-br from-[#181613] to-studio-black flex flex-col items-center justify-center p-8 text-center select-none">
                        <div className="relative w-32 h-32 mb-6">
                          <Image
                            src="/logo_transparente_.png"
                            alt="Virtual Studio Logo"
                            fill
                            className="object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                            unoptimized
                            priority
                          />
                        </div>
                        <p className="text-studio-gold text-[10px] font-black uppercase tracking-[0.25em] mb-2">Virtual Studio</p>
                        <h3 className="text-lg font-bold uppercase text-white font-display tracking-widest">Estúdio Fotográfico IA</h3>
                        <div className="w-12 h-[1px] bg-studio-gold/30 mt-4"></div>
                      </div>
                    ) : (
                      /* Slides 1, 2, 3: Imagem do workflow */
                      <Image
                        src={currentSlideIndex === 0 ? activeAvatar.image_sheet_url : currentSlideIndex === 1 ? activeAvatar.product_original_url : activeAvatar.product_transformed_url}
                        alt={currentSlideIndex === 0 ? `Avatar ID: ${activeAvatar.id}` : currentSlideIndex === 1 ? 'Seu Produto Original' : 'Seu Produto no Virtual Studio'}
                        fill
                        className="object-cover"
                        unoptimized
                        priority
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Sombra interna do gradiente */}
                {currentSlideIndex !== 3 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-studio-black/60 via-transparent to-transparent pointer-events-none"></div>
                )}
              </div>

              {/* Direita: Detalhes, Workflow e CTA */}
              <div className="flex flex-col justify-between h-full min-h-[220px] md:min-h-[350px]">
                <div>
                  {/* Badge de Etapa */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-studio-gold/10 text-studio-gold px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.15em] border border-studio-gold/20">
                      Passo {currentSlideIndex + 1} de 4
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                      {currentSlideIndex === 0 && 'O Avatar / Referência'}
                      {currentSlideIndex === 1 && 'O Produto do Lojista'}
                      {currentSlideIndex === 2 && 'Resultado Final IA'}
                      {currentSlideIndex === 3 && 'Parceria WhatsApp'}
                    </span>
                  </div>

                  {/* Título com transição suave */}
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={`${currentAvatarIndex}-${currentSlideIndex}-title`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight font-display mb-4"
                    >
                      {currentSlideIndex === 0 && `Avatar ID: ${activeAvatar.id}`}
                      {currentSlideIndex === 1 && 'Seu Produto Original'}
                      {currentSlideIndex === 2 && 'Seu Produto no Virtual Studio'}
                      {currentSlideIndex === 3 && 'Gostou deste Avatar?'}
                    </motion.h3>
                  </AnimatePresence>

                  {/* Descrição */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`${currentAvatarIndex}-${currentSlideIndex}-desc`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400 text-sm sm:text-base font-light leading-relaxed mb-4 md:mb-8"
                    >
                      {currentSlideIndex === 0 && `${activeAvatar.genero}, ${activeAvatar.style_category}. ${activeAvatar.descricao}`}
                      {currentSlideIndex === 1 && 'Assim como você nos enviaria. Fundo neutro, iluminação padrão.'}
                      {currentSlideIndex === 2 && `Transformado em um ensaio fotorrealista 8K no estilo ${activeAvatar.style_category}, pronto para vender!`}
                      {currentSlideIndex === 3 && 'Escolha este modelo e envie as fotos do seu produto. Nós cuidamos do resto!'}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Controles de Slides do Workflow */}
                <div className="mt-auto">
                  {/* Navegação de Passos (Tabs Interativas) */}
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {['01. Avatar', '02. Antes', '03. Depois', '04. Escolher'].map((stepName, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`py-2 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all border ${currentSlideIndex === idx
                          ? 'bg-studio-gold/15 border-studio-gold text-studio-gold shadow'
                          : 'bg-transparent border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-400'
                          }`}
                      >
                        {stepName}
                      </button>
                    ))}
                  </div>

                  {/* Botões de Ação na Direita */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    {currentSlideIndex === 3 ? (
                      /* CTA Final para WhatsApp */
                      <a
                        href={`https://wa.me/556193314473?text=${encodeURIComponent(`Olá, tenho interesse em usar o avatar ${activeAvatar.id} para meus ensaios.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-studio-gold text-studio-black py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-studio-gold-light hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-lg shadow-studio-gold/20 cursor-pointer text-center"
                      >
                        <MessageCircle size={18} className="fill-studio-black" />
                        Escolher Avatar {activeAvatar.id}
                      </a>
                    ) : (
                      /* Avançar Workflow (Apenas Desktop) */
                      <button
                        onClick={handleNextSlide}
                        className="hidden md:flex w-full bg-white/10 border border-white/20 text-white hover:bg-white/20 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all items-center justify-center gap-2 cursor-pointer"
                      >
                        Avançar no Workflow <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL DE DETALHES DO AVATAR */}
      <AnimatePresence>
        {modalAvatar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalAvatar(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141414] border border-studio-gold/30 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-auto"
            >
              <button
                onClick={() => setModalAvatar(null)}
                aria-label="Fechar modal"
                className="absolute top-4 right-4 z-30 size-10 rounded-full bg-black/70 text-gray-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Imagem do Avatar ampliada */}
                <div className="relative aspect-[4/5] bg-black">
                  <Image
                    src={modalAvatar.img_url}
                    alt={modalAvatar.nome}
                    fill
                    className="object-contain sm:object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent md:hidden"></div>
                </div>

                {/* Detalhes do Avatar */}
                <div className="p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-studio-gold/20 text-studio-gold px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                        {modalAvatar.codigo}
                      </span>
                      <span className="text-xs text-gray-400 uppercase tracking-wider">
                        {modalAvatar.categoria}
                      </span>
                    </div>

                    <h3 className="text-3xl font-extrabold uppercase font-display tracking-tight text-white mb-2">
                      {modalAvatar.nome}
                    </h3>
                    <p className="text-xs text-studio-gold uppercase tracking-widest mb-6">
                      {modalAvatar.genero} • {modalAvatar.etnia}
                    </p>

                    <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                      {modalAvatar.descricao}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Especialmente Recomendado Para:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {modalAvatar.indicacaoProdutos.map((prod, idx) => (
                          <span key={idx} className="bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1 rounded-full">
                            ✓ {prod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
                    <button
                      onClick={() => {
                        toggleAvatar(modalAvatar);
                        setModalAvatar(null);
                      }}
                      className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border flex items-center justify-center gap-2 ${selectedAvatars.some(a => a.id === modalAvatar.id)
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                        }`}
                    >
                      {selectedAvatars.some(a => a.id === modalAvatar.id) ? '✓ Avatar Adicionado à sua Lista' : '+ Adicionar à minha Lista de Seleção'}
                    </button>

                    <a
                      href={getWhatsAppLinkAvatar(modalAvatar)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-studio-gold text-studio-black py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-studio-gold-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-studio-gold/20"
                    >
                      <MessageCircle size={18} className="fill-studio-black" />
                      Quero meu Ensaio com este Modelo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. SEÇÃO "PACKS EXCLUSIVOS PARA LOJISTAS" (Preços e Descontos) */}
      <section id="packs" className="py-28 relative overflow-hidden scroll-mt-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-studio-gold/5 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-studio-gold text-xs font-bold uppercase tracking-[0.3em] block mb-3 font-display">
              TABELA DE PREÇOS
            </span>
            <h2 className="text-3xl md:text-6xl font-extrabold uppercase italic tracking-tight font-display mb-6">
              Packs Feitos Para o <span className="text-studio-gold">Sucesso</span> da Sua Loja
            </h2>
            <p className="text-gray-300 text-lg font-light leading-relaxed">
              Quanto mais fotos você produz, menor o investimento por unidade. Todos os pacotes incluem curadoria artística dedicada e licença comercial irrestrita para impulsionar suas vendas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {packsLojistas.map((pack) => (
              <div
                key={pack.id}
                className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative ${pack.destaque
                  ? 'bg-gradient-to-b from-[#1c1a14] via-[#141414] to-[#121212] border-2 border-studio-gold shadow-[0_0_50px_rgba(212,175,55,0.25)] scale-105 z-20'
                  : 'bg-[#141414] border border-white/10 hover:border-studio-gold/40 z-10'
                  }`}
              >
                {/* Badge Superior */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full ${pack.destaque
                      ? 'bg-studio-gold text-studio-black font-black'
                      : 'bg-white/10 text-studio-gold'
                      }`}>
                      {pack.badge}
                    </span>
                    {pack.destaque && <Award size={24} className="text-studio-gold" />}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold uppercase font-display text-white mb-2 tracking-wide">
                    {pack.nome}
                  </h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">
                    {pack.qtdFotos} Fotos / Ensaios completos
                  </p>

                  {/* Preço em destaque com R$ 13,58 e similares */}
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-5 mb-8 text-center min-h-[220px] flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-gray-400 uppercase font-semibold mb-1">Preço por Foto:</div>
                      <div className="text-4xl sm:text-5xl font-black font-display text-studio-gold tracking-tight">
                        R$ {pack.precoPorFoto.toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                    <div className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-1 min-h-[32px] text-center my-2">
                      <TrendingUp size={14} className="shrink-0" />
                      <span className="leading-tight">{pack.descontoTexto}</span>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex flex-col gap-1">
                      <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Investimento Total do Pack:</span>
                      <span className="text-2xl sm:text-3xl text-white font-black font-display tracking-wide">R$ {pack.precoTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>

                  {/* Lista de Benefícios (Ocultada temporariamente) */}
                  {/* <ul className="space-y-3.5 mb-10">
                    {pack.beneficios.map((ben, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300 font-light leading-snug">
                        <Check size={18} className="text-studio-gold shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul> */}
                </div>

                {/* Container Inferior (Garante que o Limite de Avatares e o Botão fiquem alinhados e com o mesmo espaçamento em todos os cards) */}
                <div className="mt-6 w-full">
                  {/* Limite de Avatares */}
                  <div className="flex items-center justify-center gap-2 text-gray-300 mb-6">
                    <Users size={16} className="text-studio-gold shrink-0" />
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em]">
                      {pack.limiteAvatares}
                    </span>
                  </div>

                  {/* Botão CTA para o WhatsApp */}
                  <a
                    href={getWhatsAppLinkPack(pack.nome, pack.waMensagem)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 text-center ${pack.destaque
                      ? 'bg-studio-gold text-studio-black hover:bg-studio-gold-light shadow-xl shadow-studio-gold/30 hover:scale-105'
                      : 'bg-white/10 text-white hover:bg-studio-gold hover:text-studio-black border border-white/10'
                      }`}
                  >
                    <MessageCircle size={18} className={pack.destaque ? 'fill-studio-black' : ''} />
                    Contratar {pack.nome}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SEÇÃO "RESULTADOS QUE VENDEM" (Testemunhos & Casos de Sucesso Antes/Depois) */}
      <section className="py-24 bg-[#0d0d0d] border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-studio-gold text-xs font-bold uppercase tracking-[0.3em] block mb-3 font-display">
              CASOS REAIS & PROVA SOCIAL
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase italic tracking-tight font-display mb-6">
              Lojistas que <span className="text-studio-gold">Transformaram Suas Vendas</span> com o Virtual Studio
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
              Veja a diferença prática na percepção de valor dos produtos. Nossos avatares vestem suas coleções transmitindo desejo, autoridade e sofisticação imediata ao consumidor final.
            </p>
          </div>

          {/* Comparadores Antes e Depois (Ocultados temporariamente) */}
          {false && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
              {/* Case 1 */}
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-studio-gold uppercase tracking-widest">Case: Alfaiataria & Corporativo</span>
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp size={14} /> +142% Cliques em Ads
                  </span>
                </div>

                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black select-none border border-white/5">
                  <Image
                    src="/images/galeria/eleg-ncia-corporativa-8480d9c9-cc7f-42ef-b4f6-a4093ff73978.webp"
                    alt="Depois: Ensaio no Avatar"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div
                    className="absolute inset-0 z-10"
                    style={{ clipPath: `inset(0 ${100 - sliderCase1}% 0 0)` }}
                  >
                    <Image
                      src="/images/galeria/moda-urbana-ca47e0d0-43ce-4869-88be-bb463478edb2.webp"
                      alt="Antes: Foto no Manequim"
                      fill
                      className="object-cover filter grayscale"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="bg-black/80 text-white text-xs px-3 py-1.5 rounded uppercase font-bold tracking-widest border border-white/20">Foto Inicial</span>
                    </div>
                  </div>

                  <div
                    className="absolute inset-y-0 z-20 w-0.5 bg-studio-gold shadow pointer-events-none"
                    style={{ left: `${sliderCase1}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 bg-studio-gold rounded-full flex items-center justify-center text-studio-black font-black border-2 border-black">
                      ↔
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderCase1}
                    onChange={(e) => setSliderCase1(Number(e.target.value))}
                    className="absolute inset-0 z-30 opacity-0 cursor-ew-resize w-full h-full"
                  />

                  <div className="absolute bottom-3 left-3 z-20 pointer-events-none bg-black/80 text-gray-300 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                    Antes
                  </div>
                  <div className="absolute bottom-3 right-3 z-20 pointer-events-none bg-studio-gold text-studio-black text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                    Depois (IA Full HD)
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4 leading-relaxed font-light">
                  <strong className="text-white">Loja L&A Alfaiataria:</strong> Substituíram os ensaios de estúdio físicos pelo Pack Premium e reduziram o tempo de lançamento do catálogo de 14 dias para apenas 48 horas.
                </p>
              </div>

              {/* Case 2 */}
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-studio-gold uppercase tracking-widest">Case: Casual & Streetwear</span>
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <TrendingUp size={14} /> 3.4x Retorno no ROAS
                  </span>
                </div>

                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black select-none border border-white/5">
                  <Image
                    src="/images/galeria/sentada-bege-412aa7ae-4fb0-4b59-9083-5aa30b9b89ee.webp"
                    alt="Depois: Ensaio no Avatar"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div
                    className="absolute inset-0 z-10"
                    style={{ clipPath: `inset(0 ${100 - sliderCase2}% 0 0)` }}
                  >
                    <Image
                      src="/images/galeria/sucesso-e-confian-a-d6048c2a-e15b-43a3-a44a-78dac65d9993.webp"
                      alt="Antes: Foto Simples"
                      fill
                      className="object-cover filter grayscale"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="bg-black/80 text-white text-xs px-3 py-1.5 rounded uppercase font-bold tracking-widest border border-white/20">Foto de Celular</span>
                    </div>
                  </div>

                  <div
                    className="absolute inset-y-0 z-20 w-0.5 bg-studio-gold shadow pointer-events-none"
                    style={{ left: `${sliderCase2}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 bg-studio-gold rounded-full flex items-center justify-center text-studio-black font-black border-2 border-black">
                      ↔
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderCase2}
                    onChange={(e) => setSliderCase2(Number(e.target.value))}
                    className="absolute inset-0 z-30 opacity-0 cursor-ew-resize w-full h-full"
                  />

                  <div className="absolute bottom-3 left-3 z-20 pointer-events-none bg-black/80 text-gray-300 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                    Antes
                  </div>
                  <div className="absolute bottom-3 right-3 z-20 pointer-events-none bg-studio-gold text-studio-black text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                    Depois (IA Full HD)
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4 leading-relaxed font-light">
                  <strong className="text-white">Marca Bella Concept:</strong> Utilizaram fotos tiradas com o celular no cabide e receberam ensaios cinematográficos com os avatares da categoria Luxo Casual.
                </p>
              </div>
            </div>
          )}

          {/* Testemunhos em Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {depoimentosLojistas.map((depoimento, idx) => (
              <div key={idx} className="bg-studio-black border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex text-studio-gold mb-4">
                    {[...Array(depoimento.estrelas)].map((_, i) => (
                      <Star key={i} size={16} className="fill-studio-gold" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm font-light italic mb-6 leading-relaxed">
                    &ldquo;{depoimento.texto}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="size-10 rounded-full bg-studio-gold/20 text-studio-gold font-bold flex items-center justify-center text-xs shrink-0">
                    {depoimento.iniciais}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase">{depoimento.nome}</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-normal">{depoimento.cargo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SEÇÃO "PERGUNTAS FREQUENTES" (FAQ) */}
      <section className="py-24 bg-[#121212] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-studio-gold text-xs font-bold uppercase tracking-[0.3em] block mb-3 font-display">
              TIRE SUAS DÚVIDAS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase italic tracking-tight font-display mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-light">
              Tudo o que você precisa saber sobre o funcionamento do Virtual Studio para Lojistas e E-commerce.
            </p>
          </div>

          <div className="space-y-4">
            {faqsLojistas.map((faq, index) => (
              <div
                key={index}
                className="bg-studio-black border border-white/10 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-white font-display tracking-wide uppercase">
                    {faq.pergunta}
                  </span>
                  <div className={`size-8 rounded-full bg-studio-gold/10 text-studio-gold flex items-center justify-center shrink-0 transition-transform ${openFaq === index ? 'rotate-180 bg-studio-gold text-studio-black' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-gray-300 text-sm sm:text-base font-light leading-relaxed border-t border-white/5">
                        {faq.resposta}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-white/5 border border-white/10 rounded-2xl p-8">
            <HelpCircle size={32} className="mx-auto text-studio-gold mb-3" />
            <h3 className="text-lg font-bold uppercase text-white font-display mb-2">Ainda tem alguma dúvida?</h3>
            <p className="text-xs text-gray-400 mb-6">Nossa equipe de atendimento está pronta para analisar suas peças no WhatsApp.</p>
            <a
              href="https://wa.me/556193314473?text=Ol%C3%A1!%20Sou%20lojista%20e%20tenho%20uma%20d%C3%BAvida%20espec%C3%ADfica%20sobre%20os%20ensaios%20com%20IA."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-studio-gold text-studio-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-studio-gold-light transition-all shadow-lg shadow-studio-gold/20"
            >
              <MessageCircle size={16} className="fill-studio-black" />
              Falar com Consultor no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-t from-studio-black to-[#0e0e0e] py-28 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-studio-gold/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <Star size={44} className="text-studio-gold fill-studio-gold mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 italic uppercase tracking-tight font-display">
            PRONTO PARA REVOLUCIONAR <br /> AS VENDAS DA <span className="text-studio-gold">SUA LOJA?</span>
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto mb-10 font-light">
            Não deixe que fotos sem vida continuem prejudicando suas conversões. Escolha seus avatares e comece agora mesmo pelo WhatsApp com atendimento dedicado.
          </p>
          <a
            href="https://wa.me/556193314473?text=Ol%C3%A1!%20Sou%20lojista%20e%20quero%20iniciar%20a%20produ%C3%A7%C3%A3o%20das%20fotos%20da%20minha%20loja%20com%20o%20Virtual%20Studio."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-10 sm:px-14 py-6 bg-studio-gold text-studio-black font-extrabold uppercase tracking-[0.2em] hover:bg-studio-gold-light hover:scale-105 transition-all shadow-2xl shadow-studio-gold/30 rounded-2xl text-sm md:text-lg group"
          >
            INICIAR AGORA PELO WHATSAPP
            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </a>
          <p className="mt-8 text-gray-500 text-xs tracking-[0.3em] font-light uppercase">
            Atendimento Rápido • Garantia Risco Zero
          </p>
        </div>
      </section>

      {/* 8. FOOTER OFICIAL (Idêntico à página principal e galeria) */}
      <footer className="py-12 bg-studio-black border-t border-white/5 shrink-0" id="contato">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
            {/* Logo e Copyright */}
            <div className="flex flex-col items-center md:items-start order-2 md:order-1">
              <div className="relative w-[150px] h-[55px] mb-2">
                <Image src="/logo_transparente_.png" alt="Virtual Studio Logo" fill className="object-contain" />
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-light">
                © 2026 VIRTUAL STUDIO • LOJISTAS B2B<br />
                <span className="opacity-60">Todos os direitos reservados</span>
              </p>
            </div>

            {/* Links Legais */}
            <div className="flex flex-col items-center gap-3 text-[10px] text-gray-400 uppercase tracking-widest font-light order-3 md:order-2">
              <Link href="/termos-de-uso" className="hover:text-studio-gold transition-colors">Termos de Uso</Link>
              <Link href="/politica-de-privacidade" className="hover:text-studio-gold transition-colors">Política de Privacidade</Link>
              <Link href="/galeria" className="hover:text-studio-gold transition-colors">Galeria Pessoa Física</Link>
            </div>

            {/* Redes Sociais e Voltar ao Topo */}
            <div className="flex flex-col items-center md:items-end gap-3 order-1 md:order-3">
              <div className="flex gap-4">
                <a
                  href="mailto:suporte@virtualstudio.click"
                  className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-gray-400 hover:text-studio-gold hover:border-studio-gold/30 transition-all duration-300"
                  aria-label="Suporte por e-mail"
                >
                  <Mail size={16} />
                </a>
                <a
                  href="https://www.instagram.com/virtualstudio.click/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-gray-400 hover:text-studio-gold hover:border-studio-gold/30 transition-all duration-300"
                  aria-label="Instagram oficial"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://tiktok.com/@virtualstudio.click"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-gray-400 hover:text-studio-gold hover:border-studio-gold/30 transition-all duration-300"
                  aria-label="TikTok oficial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-4 h-4"
                  >
                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                  </svg>
                </a>
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-[10px] text-studio-gold uppercase tracking-widest hover:underline opacity-80 pt-1 cursor-pointer"
              >
                Voltar ao Topo ↑
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button para Lojistas que Selecionaram Avatares */}
      <AnimatePresence>
        {selectedAvatars.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-6"
          >
            <a
              href={getWhatsAppLinkSelecao()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-studio-gold text-studio-black p-4 rounded-2xl shadow-[0_20px_50px_rgba(212,175,55,0.45)] hover:scale-105 transition-all group border border-studio-black/20"
            >
              <div className="flex flex-col items-start">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-75">
                  {getPackageSugestao(selectedAvatars.length)} • {selectedAvatars.length} {selectedAvatars.length === 1 ? 'avatar selecionado' : 'avatares selecionados'}
                </span>
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider mt-0.5">
                  Solicitar Ensaio • R$ {(selectedAvatars.length * getPrecoUnitario(selectedAvatars.length)).toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="bg-studio-black/15 p-3 rounded-xl group-hover:bg-studio-black/25 transition-colors flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider">
                <span>Continuar</span>
                <MessageCircle size={22} className="fill-studio-black" />
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notificação Flutuante de Prova Social */}
      <SalesNotification />
    </div>
  );
}
