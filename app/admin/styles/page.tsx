'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  UploadCloud,
  Camera
} from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';

const styles = [
  { 
    id: 1, 
    title: 'Retrato Corporativo Luxury', 
    category: 'Retrato', 
    desc: 'Fotografia executiva com iluminação de alto contraste e acabamento cinematográfico para líderes.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDh1JZyuanitceIP4aWXng9aM7IGrGCh76LJBXzN4fafgFo2uk5k6DFYynA4IJSmcZG3XrO-Ak8IbYOcGiQH0F9_8FfJc3n7DK8MiutiOtj0SPEzNWfKtSrTfBiMwuwbyGLSLqM5wOpwcR0IH60W-CU2CQx1ObhXwNHBoEV3QxMPcybLMWgkgRAooinNIGmwkki7YXEBwFpAz8lIAqK-EPrd7aA0WzZMb6q8r8wgHFNq-m42jlXGv5Zr5ihJvM0AwTgT09eTZBZJZN9'
  },
  { 
    id: 2, 
    title: 'Moda & Editorial', 
    category: 'Editorial', 
    desc: 'Foco em composições artísticas, cores vibrantes e narrativas visuais para marcas de luxo.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkcR36BDOIBCYhKhlp8-11olLvnseCLfB36VU1CdiO_JRMgaJgv4hfQSd4L6VqOy_1BKoFnU45rsYOQ04DGrol21sRGZahHOWRri6n9ch3uMXQpJ9y5qNPjvcLCy9nw_5JtFE56t4j_Xr8oJarafShvFGM9twlK7RiXVgUzvT2Wg8_5gy9HjDyDgftfcrrhCiGhyyAAspG-EaZGf5I5q_tofoEmfwx_2gBpKAfvUqMl3gTBt2P5sevuwt-YL3deQoXMT3RBCc0VzDW'
  },
  { 
    id: 3, 
    title: 'Comercial de Produtos', 
    category: 'Comercial', 
    desc: 'Still life de luxo, ideal para joalheria, perfumaria e acessórios premium.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNZpqTmhhH2Ztbhy3n1p_lZOiTzpPAsDgwL7d9D_0LSA8G6BXYS4nCeKULassb3DGFQ7x7MMJG1fNsZOsMtR6MXuIMpQGJtyiqGGPwNSRHw-FR3_RLQIAi9MSAJH8_DoLjI0Kl7XSKdK0n1xo3dR5vRKdf8nsZNDjlsPsbHzOcuUijLltKVYFA5KCfUcTXfaNs17REOzLXj__tkt7m8eCT_9Iaa2TG39m1nby_7JCikpGumhVO-wp2XK2uTy7LpzcQECF7-Cdw1aWO'
  },
];

export default function AdminStyles() {
  const [editingStyle, setEditingStyle] = useState<any>(styles[0]);

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
                placeholder="Buscar estilos (ex: Retrato, Editorial...)" 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="h-10 px-6 bg-studio-gold text-studio-black rounded-none text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-studio-gold-light transition-all font-display">
              <Plus size={16} />
              Novo Estilo
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#121212]">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Content: Grid */}
            <div className="flex-1">
              <div className="mb-10">
                <h1 className="text-4xl font-black mb-2 tracking-tight">Gestão de Estilos</h1>
                <p className="text-slate-500">Curadoria de experiências fotográficas premium para o seu portfólio.</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
                {['Todos', 'Retrato', 'Editorial', 'Comercial'].map((cat) => (
                  <button key={cat} className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${cat === 'Todos' ? 'bg-studio-gold text-studio-black' : 'bg-white/5 border border-white/10 hover:border-studio-gold'}`}>
                    {cat}
                  </button>
                ))}
              </div>

              {/* Style Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {styles.map((style) => (
                  <div key={style.id} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-studio-gold transition-all">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <Image 
                        src={style.img} 
                        alt={style.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-studio-gold text-studio-black text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">{style.category}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{style.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">{style.desc}</p>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setEditingStyle(style)}
                          className="flex-1 py-2 rounded-lg border border-studio-gold text-studio-gold text-sm font-bold hover:bg-studio-gold hover:text-studio-black transition-all"
                        >
                          Editar
                        </button>
                        <button className="p-2 rounded-lg border border-white/10 text-slate-400 hover:text-red-500 hover:border-red-500 transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Add New Placeholder */}
                <div className="border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-12 hover:border-studio-gold transition-all cursor-pointer group">
                  <div className="w-16 h-16 rounded-full bg-studio-gold/10 flex items-center justify-center text-studio-gold mb-4 group-hover:bg-studio-gold group-hover:text-studio-black transition-all">
                    <Plus size={32} />
                  </div>
                  <span className="text-lg font-bold">Adicionar Novo Estilo</span>
                  <p className="text-slate-500 text-sm mt-1">Clique para expandir o catálogo</p>
                </div>
              </div>
            </div>

            {/* Side Panel: Editar Estilo */}
            {editingStyle && (
              <aside className="w-full lg:w-96">
                <div className="sticky top-8 bg-studio-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Editar Estilo</h2>
                    <button onClick={() => setEditingStyle(null)} className="text-slate-400 hover:text-white">
                      <X size={20} />
                    </button>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Image Upload Placeholder */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Imagem de Exemplo</label>
                      <div className="relative group aspect-video rounded-xl overflow-hidden border border-white/10">
                        <Image 
                          src={editingStyle.img} 
                          alt="Preview" 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity cursor-pointer">
                          <UploadCloud size={32} className="text-white mb-1" />
                          <span className="text-white text-[10px] font-bold uppercase">Trocar Imagem</span>
                        </div>
                      </div>
                    </div>
                    {/* Form Fields */}
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Nome do Estilo</label>
                        <input 
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-studio-gold outline-none text-sm" 
                          type="text" 
                          defaultValue={editingStyle.title}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Categoria</label>
                        <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-studio-gold outline-none text-sm appearance-none">
                          <option>Retrato</option>
                          <option>Editorial</option>
                          <option>Comercial</option>
                          <option>Evento</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Descrição</label>
                        <textarea 
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-studio-gold outline-none text-sm resize-none" 
                          rows={4}
                          defaultValue={editingStyle.desc}
                        />
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="pt-4 flex flex-col gap-3">
                      <button className="w-full bg-studio-gold text-studio-black py-3.5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-studio-gold-light transition-all">
                        Salvar Alterações
                      </button>
                      <button onClick={() => setEditingStyle(null)} className="w-full py-3.5 rounded-xl text-slate-400 font-bold text-xs hover:text-slate-100 transition-all">
                        Descartar
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
