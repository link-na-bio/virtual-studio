'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Camera, 
  ShoppingBag, 
  Users, 
  Palette, 
  CreditCard, 
  Settings, 
  BarChart3,
  MessageSquare,
  MoreVertical
} from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { label: 'Management', type: 'header' },
  { label: 'Pedidos', icon: ShoppingBag, href: '/admin/orders' },
  { label: 'Usuários', icon: Users, href: '/admin/users' },
  { label: 'Mensagens', icon: MessageSquare, href: '/admin/messages' },
  { label: 'Estilos', icon: Palette, href: '/admin/styles' },
  { label: 'Financeiro', icon: CreditCard, href: '/admin/finance' },
  { label: 'System', type: 'header' },
  { label: 'Configurações', icon: Settings, href: '/admin/settings' },
  { label: 'Relatórios', icon: BarChart3, href: '/admin/reports' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/5 bg-studio-black flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-studio-gold size-10 rounded-lg flex items-center justify-center text-studio-black">
          <Camera size={24} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-white text-base font-bold leading-none">Photo AI</h1>
          <p className="text-slate-500 text-xs font-medium">Control Center</p>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item, i) => {
          if (item.type === 'header') {
            return (
              <div key={i} className="text-xs font-bold text-gray-500 uppercase tracking-widest px-3 mb-4 mt-8 first:mt-4 font-display">
                {item.label}
              </div>
            );
          }
          
          const Icon = item.icon!;
          const isActive = pathname === item.href;

          return (
            <Link 
              key={i}
              href={item.href!} 
              className={`flex items-center gap-3 px-3 py-3 rounded transition-colors group ${isActive ? 'bg-studio-gold/10 text-studio-gold border-r-2 border-studio-gold' : 'text-gray-400 hover:text-studio-gold'}`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium uppercase tracking-wider font-display">{item.label}</span>
              {item.label === 'Mensagens' && (
                <span className="ml-auto size-2 bg-red-500 rounded-full"></span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl">
          <div className="size-10 rounded-full border-2 border-studio-gold/20 overflow-hidden relative">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_4fPLwv0ILRXegI4yYbvYBTywcE9uL_yL1Z_Jmq75sqNPfSmd4VzFTEVzdn4kyVqO-wCGewlfwx4WSJVK_RU31Zec45XWoZI-G94Ql4VueQEWBmGisdYWR29Q1F6h6JXvnQHbTQcYWM3eyu4OoZPib6JLZMC_vG7BXGzDUK4GdYJeSkun08-fRSrMAD5PIfJxitdi3wplfE8yWuOkYXHccsUoMjte8D0rUbrEVKtRhL94KcMIoz3T3r78G2EQec3VTr7Z1OIY5xdS"
              alt="Admin"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-white">Ricardo Admin</p>
            <p className="text-xs text-slate-500 truncate">System Manager</p>
          </div>
          <MoreVertical size={16} className="text-slate-400" />
        </div>
      </div>
    </aside>
  );
}
