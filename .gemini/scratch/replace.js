const fs = require('fs');
let code = fs.readFileSync('app/dashboard/page.tsx', 'utf8');

code = code.replace(
  /\{\s*id:\s*'pais'[\s\S]*?selectedGlow:\s*'[^']*'\s*\}/,
  \{
    id: 'aniversario',
    ativo: true,
    titulo: 'Especial de Aniversário ??',
    descricao: 'Celebre seu mês de aniversário com um retrato inesquecível! 1 Estilo Temático em altíssima resolução.',
    categoria: 'ESPECIAL DE ANIVERSÁRIO',
    preco: 19.90,
    estilos: '1 Estilo Temático',
    styleClass: 'border-fuchsia-500/30 hover:border-fuchsia-500/60 bg-gradient-to-r from-fuchsia-950/40 to-studio-black shadow-[0_0_30px_rgba(217,70,239,0.15)]',
    glowClass: 'bg-fuchsia-500/10',
    iconBg: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/40 hover:bg-fuchsia-500 hover:text-white',
    icon: 'sparkles',
    tagText: 'OFERTA',
    buttonColor: 'bg-fuchsia-500 hover:bg-fuchsia-600',
    borderColor: 'border-fuchsia-500',
    selectedGlow: 'shadow-[0_0_20px_rgba(217,70,239,0.3)]'
  }\
);

code = code.replace(/campanha\.icon === 'user' \? User : Trophy/g, "campanha.icon === 'sparkles' ? Sparkles : campanha.icon === 'user' ? User : Trophy");
code = code.replace(/campanha\.icon === 'user' \? 'text-blue-500 animate-pulse' : 'text-yellow-400'/g, "campanha.icon === 'sparkles' ? 'text-fuchsia-500 animate-pulse' : campanha.icon === 'user' ? 'text-blue-500 animate-pulse' : 'text-yellow-400'");
code = code.replace(/campanhaAtiva\.icon === 'user' \? User : Trophy/g, "campanhaAtiva.icon === 'sparkles' ? Sparkles : campanhaAtiva.icon === 'user' ? User : Trophy");
code = code.replace(/campanhaAtiva\.icon === 'user' \? 'text-blue-500 animate-pulse' : 'text-yellow-400'/g, "campanhaAtiva.icon === 'sparkles' ? 'text-fuchsia-500 animate-pulse' : campanhaAtiva.icon === 'user' ? 'text-blue-500 animate-pulse' : 'text-yellow-400'");
code = code.replace(/campanha\.icon === 'user' \? 'bg-blue-500' : 'bg-green-600'/g, "campanha.icon === 'sparkles' ? 'bg-fuchsia-500' : campanha.icon === 'user' ? 'bg-blue-500' : 'bg-green-600'");
code = code.replace(/campanhaAtiva\.icon === 'user' \? 'hover:text-blue-500 hover:border-blue-500' : 'hover:text-green-500 hover:border-green-500'/g, "campanhaAtiva.icon === 'sparkles' ? 'hover:text-fuchsia-500 hover:border-fuchsia-500' : campanhaAtiva.icon === 'user' ? 'hover:text-blue-500 hover:border-blue-500' : 'hover:text-green-500 hover:border-green-500'");
code = code.replace(/campanhaAtiva\.icon === 'user' \? 'hover:border-blue-500\/50' : 'hover:border-green-500\/50'/g, "campanhaAtiva.icon === 'sparkles' ? 'hover:border-fuchsia-500/50' : campanhaAtiva.icon === 'user' ? 'hover:border-blue-500/50' : 'hover:border-green-500/50'");
code = code.replace(/campanhaAtiva\.icon === 'user' \? 'bg-blue-500\/10' : 'bg-green-500\/10'/g, "campanhaAtiva.icon === 'sparkles' ? 'bg-fuchsia-500/10' : campanhaAtiva.icon === 'user' ? 'bg-blue-500/10' : 'bg-green-500/10'");
code = code.replace(/campanhaAtiva\.icon === 'user' \? 'bg-blue-500 text-white border-blue-500' : 'bg-green-600 text-white border-green-600'/g, "campanhaAtiva.icon === 'sparkles' ? 'bg-fuchsia-500 text-white border-fuchsia-500' : campanhaAtiva.icon === 'user' ? 'bg-blue-500 text-white border-blue-500' : 'bg-green-600 text-white border-green-600'");
code = code.replace(/campanhaAtiva\.icon === 'user' \? 'group-hover\/card:bg-blue-500\/80 group-hover\/card:border-blue-500' : 'group-hover\/card:bg-green-600\/80 group-hover\/card:border-green-600'/g, "campanhaAtiva.icon === 'sparkles' ? 'group-hover/card:bg-fuchsia-500/80 group-hover/card:border-fuchsia-500' : campanhaAtiva.icon === 'user' ? 'group-hover/card:bg-blue-500/80 group-hover/card:border-blue-500' : 'group-hover/card:bg-green-600/80 group-hover/card:border-green-600'");

fs.writeFileSync('app/dashboard/page.tsx', code);
console.log('done');
