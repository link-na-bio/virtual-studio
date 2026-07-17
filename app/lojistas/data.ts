export interface AvatarModel {
  id: string;
  codigo: string;
  nome: string;
  categoria: 'Elegância Urbana' | 'Minimalismo de Estúdio' | 'Luxo Casual' | 'Clássico Atemporal';
  genero: 'Feminino' | 'Masculino';
  etnia: string;
  descricao: string;
  img_url: string;
  indicacaoProdutos: string[];
  destaque?: boolean;
}

export const avataresLojistas: AvatarModel[] = [
  {
    id: "av-01",
    codigo: "AV-101",
    nome: "Sophia Vance",
    categoria: "Elegância Urbana",
    genero: "Feminino",
    etnia: "Caucásica / Europeia",
    descricao: "Perfil cosmopolita, expressivo e de alta autoridade visual. Perfeito para moda urbana de luxo, alfaiataria feminina, blazers, joias contemporâneas e óculos de sol.",
    img_url: "/images/galeria/moda-urbana-ca47e0d0-43ce-4869-88be-bb463478edb2.webp",
    indicacaoProdutos: ["Alfaiataria Feminina", "Moda Urbana", "Acessórios de Luxo", "Óculos"],
    destaque: true
  },
  {
    id: "av-02",
    codigo: "AV-102",
    nome: "Lucas Sterling",
    categoria: "Minimalismo de Estúdio",
    genero: "Masculino",
    etnia: "Caucásico / Contemporâneo",
    descricao: "Estética limpa, olhar magnético e postura impecável sob iluminação de estúdio direcional. Ideal para camisas sociais, relógios de luxo, perfumes e moda masculina executiva.",
    img_url: "/images/galeria/retrato-executivo-minimalista-low-key-ddb9cd22-46c5-4d72-ba75-7d424b1e6c3c.webp",
    indicacaoProdutos: ["Moda Masculina Executiva", "Relógios & Joias", "Perfumes Premium", "Camisaria"],
    destaque: true
  },
  {
    id: "av-03",
    codigo: "AV-103",
    nome: "Elena Rostova",
    categoria: "Luxo Casual",
    genero: "Feminino",
    etnia: "Eslava / Mediterrânea",
    descricao: "Atmosfera sofisticada com toque despojado e iluminação suave de fim de tarde. Excelente para vestidos de malha premium, tricôs luxuosos, bolsas de couro e semijoias refinadas.",
    img_url: "/images/galeria/sentada-bege-412aa7ae-4fb0-4b59-9083-5aa30b9b89ee.webp",
    indicacaoProdutos: ["Tricôs e Malhas de Luxo", "Bolsas de Couro", "Semijoias e Brincos", "Moda Casual Chic"],
    destaque: true
  },
  {
    id: "av-04",
    codigo: "AV-104",
    nome: "Marcus Blackwood",
    categoria: "Clássico Atemporal",
    genero: "Masculino",
    etnia: "Afro-descendente / Internacional",
    descricao: "Presença imponente com contraste low-key profundo e elegância dramática. Desenvolvido para marcas que buscam transmitir exclusividade, alto valor agregado e sofisticação incomparável.",
    img_url: "/images/galeria/black-on-black-210ba114-79d9-4e00-a945-121a13b0a30d.webp",
    indicacaoProdutos: ["Trajes Esporte Fino", "Acessórios em Couro Preto", "Joias em Ouro/Prata", "Streetwear Premium"],
    destaque: true
  },
  {
    id: "av-05",
    codigo: "AV-105",
    nome: "Camila Duarte",
    categoria: "Elegância Urbana",
    genero: "Feminino",
    etnia: "Latina / Brasileira",
    descricao: "Luz natural difusa com energia vibrante e urbana. Um dos perfis de maior conversão para lojas de e-commerce femininas de moda casual, jeanswear, blusas de seda e calçados.",
    img_url: "/images/galeria/lifestyle-urbano-d6160273-dedf-4512-993b-ff463286788b.webp",
    indicacaoProdutos: ["Jeanswear Premium", "Moda Casual Feminina", "Calçados e Sandálias", "Óculos & Bolsas"]
  },
  {
    id: "av-06",
    codigo: "AV-106",
    nome: "Henri Laurent",
    categoria: "Luxo Casual",
    genero: "Masculino",
    etnia: "Europeu / Francês",
    descricao: "Sobretudo texturizado em cenário urbano com bokeh cinematográfico e reflexos suaves. A escolha perfeita para sobreposições, casacos de inverno, cachecóis e relógios de pulso.",
    img_url: "/images/galeria/retrato-urbano-editorial-501be71c-7acb-4c78-9cf9-1d9e0fb778a0.webp",
    indicacaoProdutos: ["Casacos & Sobretudos", "Moda Outono/Inverno", "Relógios Mecânicos", "Acessórios Urbanos"]
  },
  {
    id: "av-07",
    codigo: "AV-107",
    nome: "Isabella Moretti",
    categoria: "Clássico Atemporal",
    genero: "Feminino",
    etnia: "Italiana / Mediterrânea",
    descricao: "Iluminação dramática de estúdio focada em texturas de tecidos e trações faciais nobres. Transmite altíssimo padrão para marcas de alta costura, joias em ouro 18k e vestidos de noite.",
    img_url: "/images/galeria/retrato-de-luxo-dfd6031a-e288-4122-8e0f-b4cdd9582860.webp",
    indicacaoProdutos: ["Alta Costura & Vestidos", "Joias em Ouro 18k", "Acessórios de Gala", "Maquiagem de Luxo"]
  },
  {
    id: "av-08",
    codigo: "AV-108",
    nome: "Arthur König",
    categoria: "Minimalismo de Estúdio",
    genero: "Masculino",
    etnia: "Nórdico / Alemão",
    descricao: "Fundo cinza carvão uniforme e recorte preciso em luz direcional. Realça texturas de lã, blazers estruturados, camisas gola alta e acessórios masculinos minimalistas.",
    img_url: "/images/galeria/eleg-ncia-corporativa-8480d9c9-cc7f-42ef-b4f6-a4093ff73978.webp",
    indicacaoProdutos: ["Blazers & Ternos", "Moda Corporativa", "Óculos de Grau", "Relógios de Couro"]
  },
  {
    id: "av-09",
    codigo: "AV-109",
    nome: "Beatriz Ferraz",
    categoria: "Minimalismo de Estúdio",
    genero: "Feminino",
    etnia: "Latina / Morena",
    descricao: "Traje branco em contraste elegante com iluminação de estúdio equilibrada. Perfeito para realçar peças coloridas, joias delicadas, cintos de couro e moda feminina executiva.",
    img_url: "/images/galeria/blazer-branco-8a658353-ac63-41c0-805c-11f8e05dc8fa.webp",
    indicacaoProdutos: ["Alfaiataria Branca/Neutra", "Joias e Colares", "Bolsas Estruturadas", "Moda Executiva Feminina"]
  },
  {
    id: "av-10",
    codigo: "AV-110",
    nome: "Gabriel Silva",
    categoria: "Elegância Urbana",
    genero: "Masculino",
    etnia: "Latino / Brasileiro",
    descricao: "Ambiente autêntico de café/lounge urbano com luz natural filtrada. Excelente para camisas de linho, polos premium, calçados casuais e acessórios do dia a dia.",
    img_url: "/images/galeria/retrato-aut-ntico-com-caf-urbano-78b63b50-228a-4a24-a24f-3a63e6819340.webp",
    indicacaoProdutos: ["Moda Casual & Linho", "Camisas Polo Premium", "Sneakers & Mocassins", "Pulseiras & Relógios"]
  },
  {
    id: "av-11",
    codigo: "AV-111",
    nome: "Victoria Chen",
    categoria: "Luxo Casual",
    genero: "Feminino",
    etnia: "Asiática / Oriental",
    descricao: "Perfil estético impecável, pele de porcelana e expressão serena em cenário aconchegante. Recomendada para tricôs leves, loungewear de luxo, cosméticos e joias minimalistas.",
    img_url: "/images/galeria/sentada-olhar-lateral-d3c8880b-aac3-46dc-b1a8-bb4d02918f0c.webp",
    indicacaoProdutos: ["Loungewear de Luxo", "Tricôs e Cardigans", "Cosméticos & Skincare", "Joias Minimalistas"]
  },
  {
    id: "av-12",
    codigo: "AV-112",
    nome: "Rodrigo Alcantara",
    categoria: "Clássico Atemporal",
    genero: "Masculino",
    etnia: "Ibérico / Latino",
    descricao: "Retrato editorial dramático com foco em contraste de texturas e olhar profundo. Ideal para marcas masculinas tradicionais, sapatos de couro nobre, cintos e alfaiataria escura.",
    img_url: "/images/galeria/retrato-dram-tico-104cbe36-a8e4-404d-a9d3-d0b425735e42.webp",
    indicacaoProdutos: ["Sapatos & Marroquinaria", "Alfaiataria Escura", "Perfumes & Grooming", "Acessórios de Couro Nobre"]
  },
  {
    id: "av-13",
    codigo: "AV-113",
    nome: "Mariana Vasconcelos",
    categoria: "Clássico Atemporal",
    genero: "Feminino",
    etnia: "Brasileira / Caucásica",
    descricao: "Composição editorial em close e meio corpo valorizando caimento e corte das peças. Excelente para vestidos midi, blazers acinturados e joias com pedraria.",
    img_url: "/images/galeria/close-e-blazer-c3ad87ef-408c-476c-ad7c-f2052ec68034.webp",
    indicacaoProdutos: ["Blazers Acinturados", "Vestidos Midi & Longos", "Joias com Pedraria", "Moda Clássica"]
  },
  {
    id: "av-14",
    codigo: "AV-114",
    nome: "David Miller",
    categoria: "Elegância Urbana",
    genero: "Masculino",
    etnia: "Anglo-saxão / Americano",
    descricao: "Estilo cinematográfico urbano com profundidade de campo rasa e foco absoluto na peça vestida. Indicado para jaquetas de couro, jeanswear, camisetas heavy cotton e botas.",
    img_url: "/images/galeria/retrato-cinematogr-fico-urbano-6bb32c2b-9ebc-4a3b-a2c1-0f959a32d63f.webp",
    indicacaoProdutos: ["Jaquetas de Couro", "Camisetas Heavy Cotton", "Jeanswear Masculino", "Botas e Acessórios"]
  },
  {
    id: "av-15",
    codigo: "AV-115",
    nome: "Juliana Santos",
    categoria: "Minimalismo de Estúdio",
    genero: "Feminino",
    etnia: "Afro-brasileira",
    descricao: "Iluminação controlada com destaque para tons de pele dourados e expressões seguras. Ideal para cores vibrantes, estampas exclusivas, moda praia de luxo e joias douradas.",
    img_url: "/images/galeria/sucesso-e-confian-a-d6048c2a-e15b-43a3-a44a-78dac65d9993.webp",
    indicacaoProdutos: ["Peças em Cores Vibrantes", "Moda Praia de Luxo", "Joias em Ouro Dourado", "Alfaiataria Moderna"]
  },
  {
    id: "av-16",
    codigo: "AV-116",
    nome: "Eduardo Montenegro",
    categoria: "Luxo Casual",
    genero: "Masculino",
    etnia: "Latino / Caucásico",
    descricao: "Composição despojada com blazer em mãos ou sobre os ombros em estúdio minimalista. Transmite modernidade para marcas casuais esporte fino e calçados híbridos.",
    img_url: "/images/galeria/segurando-blazer-a2d202d0-957e-420e-a4dc-1c630b60d980.webp",
    indicacaoProdutos: ["Esporte Fino", "Camisas de Lã & Algodão", "Sneakers de Couro", "Bolsas de Mão Masculinas"]
  }
];

export const packsLojistas = [
  {
    id: "essencial",
    nome: "Pack Essencial",
    badge: "Para Testar & Validar",
    qtdFotos: 5,
    precoTotal: 67.90,
    precoPorFoto: 13.58,
    descontoTexto: "Preço unitário de R$ 13,58",
    destaque: false,
    beneficios: [
      "5 Fotos fotorrealistas em Full HD Ultra Nitidez",
      "Escolha 1 modelo/avatar",
      "Ajuste fino de textura, relevo e cor exata do seu produto",
      "Direção de arte & curadoria humana em cada imagem",
      "Licença comercial para e-commerce, Redes Sociais e Ads",
      "Entrega rápida e segura (Até 48h)"
    ],
    ctaTexto: "Contratar Pack Essencial",
    waMensagem: "Olá, tenho interesse no Pack Essencial para Lojistas (5 fotos por R$ 67,90) do Virtual Studio. Quero transformar os produtos da minha loja em ensaios de elite!"
  },
  {
    id: "premium",
    nome: "Pack Premium",
    badge: "🔥 O Mais Escolhido pelas Lojas",
    qtdFotos: 10,
    precoTotal: 97.90,
    precoPorFoto: 9.79,
    descontoTexto: "Economia de R$ 3,79 por foto vs. Essencial",
    destaque: true,
    beneficios: [
      "10 Fotos fotorrealistas em Full HD Ultra Nitidez",
      "Escolha de até 1 modelo/avatar",
      "Ajuste fino de textura, relevo e cor exata do seu produto",
      "Direção de arte & curadoria humana em cada imagem e controle rigoroso de qualidade",
      "Licença comercial para e-commerce, Redes Sociais e Ads",
      "Prioridade na fila de processamento VIP (Até 48h)",
      "Garantia de Risco Zero com aprovação prévia com marca d'água"
    ],
    ctaTexto: "Contratar Pack Premium",
    waMensagem: "Olá, tenho interesse no Pack Premium para Lojistas (10 fotos por R$ 97,90, saindo R$ 9,79/foto) do Virtual Studio. Quero elevar o nível do catálogo da minha loja!"
  },
  {
    id: "elite",
    nome: "Pack Elite",
    badge: "💎 Máxima Escala & ROI",
    qtdFotos: 20,
    precoTotal: 147.90,
    precoPorFoto: 7.40,
    descontoTexto: "Melhor preço garantido: Apenas R$ 7,40 por foto",
    destaque: false,
    beneficios: [
      "20 Fotos fotorrealistas em Full HD Ultra Nitidez",
      "Liberdade total para combinar avatares, cenários e ângulos",
      "Ideal para lançamentos de coleções completas e lookbooks",
      "Curadoria dedicada e consultoria de estilo pelo WhatsApp",
      "Licença comercial vitalícia e arquivos em formato TIFF/PNG/JPG",
      "Atendimento VIP super prioritário (Entrega acelerada)",
      "Garantia 100% Risco Zero e suporte pós-entrega"
    ],
    ctaTexto: "Contratar Pack Elite",
    waMensagem: "Olá, tenho interesse no Pack Elite para Lojistas (20 fotos por R$ 147,90, saindo R$ 7,40/foto) do Virtual Studio. Quero produzir o catálogo completo da minha coleção com IA de elite!"
  }
];

export const doresLojistas = [
  {
    icone: "DollarSign",
    titulo: "Custos Exorbitantes",
    descricao: "Aluguel de estúdio, contratação de modelos presenciais, maquiadores, fotógrafos e iluminação custam milhares de reais a cada nova peça."
  },
  {
    icone: "Clock",
    titulo: "Demora na Logística",
    descricao: "Semanas entre enviar os produtos para o estúdio, agendar a equipe, realizar o shooting e aguardar a edição final das fotos."
  },
  {
    icone: "Shirt",
    titulo: "Fotos Estáticas de Cabide",
    descricao: "Roupas no cabide, no chão ou em manequins de plástico não geram conexão emocional nem desejo de compra no cliente."
  },
  {
    icone: "TrendingDown",
    titulo: "Baixa Conversão e ROI",
    descricao: "Fotos amadoras ou genéricas diminuem a autoridade da sua marca, resultando em carrinhos abandonados e custo por clique alto nos anúncios."
  }
];

export const faqsLojistas = [
  {
    pergunta: "Como funciona exatamente o Virtual Studio para Lojistas?",
    resposta: "O processo é revolucionário e simples: você escolhe os avatares (modelos virtuais) em nosso catálogo de estilos, envia fotos nítidas dos seus produtos (mesmo tiradas no manequim ou com celular em boa luz), e nossa inteligência artificial avançada de estúdio veste os modelos com suas peças. Tudo passa por uma rigorosa curadoria humana de artistas digitais para garantir caimento de tecido perfeito, sombras físicas reais e resolução Full HD."
  },
  {
    pergunta: "Que tipo de fotos do meu produto eu preciso enviar?",
    resposta: "Você pode enviar fotos do seu produto vestido em um manequim, deitado em uma superfície plana (flat lay) ou até em uma pessoa com pose simples. O importante é que a foto tenha boa iluminação natural ou de estúdio, sem cortes na peça e com a cor bem representativa. Nossa IA se encarrega de mapear cada costura, textura e relevo para aplicar no avatar virtual."
  },
  {
    pergunta: "Os clientes vão perceber que é inteligência artificial?",
    resposta: "Não! Diferente de geradores de imagem comuns que deixam rostos plastificados e roupas distorcidas, nossa tecnologia proprietária combina simulação física de tecidos com curadoria e pós-produção humana. O resultado são imagens com realismo cinematográfico, textura de pele autêntica e profundidade de campo dignas das maiores revistas de moda do mundo."
  },
  {
    pergunta: "Eu tenho os direitos comerciais das fotos geradas?",
    resposta: "Sim, absolutamente. Ao contratar qualquer um de nossos packs para lojistas, você recebe a licença comercial completa de uso das imagens. Você pode utilizá-las livremente em sua loja virtual (Shopify, Nuvemshop, WooCommerce, etc.), no Instagram, no TikTok, em outdoors, catálogos em PDF e em campanhas de tráfego pago (Meta Ads e Google Ads)."
  },
  {
    pergunta: "Como funciona a Garantia de Risco Zero?",
    resposta: "Nós confiamos tanto na qualidade do nosso trabalho que operamos com risco zero para você. Após o envio das fotos e escolha dos avatares, nós geramos as prévias com marca d'água para a sua aprovação. Você avalia o caimento e o realismo de cada foto e só finaliza o pagamento pelas imagens aprovadas em altíssima resolução. Você não paga no escuro!"
  },
  {
    pergunta: "Qual é o prazo para receber as fotos da minha coleção?",
    resposta: "O prazo padrão é de até 48 a 72 horas para entregarmos as suas prévias na galeria VIP. Para pedidos urgentes de lançamento de coleção, nossos clientes dos packs Premium e Elite contam com fila prioritária de processamento."
  },
  {
    pergunta: "Posso pedir para o modelo usar mais de uma peça (look completo)?",
    resposta: "Com certeza! Você pode combinar, por exemplo, uma blusa, uma calça, um casaco e até acessórios adequados em um mesmo look. Basta nos indicar na hora do envio como deseja a combinação, e nosso time de curadoria garantirá a harmonia do look no avatar escolhido."
  }
];

export interface DepoimentoModel {
  nome: string;
  iniciais: string;
  cargo: string;
  texto: string;
  estrelas: number;
}

export const depoimentosLojistas: DepoimentoModel[] = [
  {
    nome: "Mariana Fontes",
    iniciais: "MF",
    cargo: "Fundadora • Studio M E-commerce",
    texto: "Como dona de e-commerce, o custo de fazer ensaios mensais estava comendo toda a minha margem de lucro. O Virtual Studio salvou meu negócio. As fotos ficam tão reais que minhas clientes perguntam o nome da modelo!",
    estrelas: 5
  },
  {
    nome: "Ricardo Santoro",
    iniciais: "RS",
    cargo: "Diretor de Marketing • Santoro Men",
    texto: "Contratamos o Pack Elite para o lançamento da coleção de inverno. A qualidade da textura das roupas e da iluminação dos avatares superou qualquer expectativa. Nosso custo de aquisição (CPA) caiu pela metade no Meta Ads.",
    estrelas: 5
  },
  {
    nome: "Camila Pires",
    iniciais: "CP",
    cargo: "CEO • CP Concept Store",
    texto: "A velocidade é o maior diferencial. Eu mando a foto da peça recém-chegada do fornecedor de manhã e em dois dias já estou rodando anúncio com o avatar vestindo no estúdio. Serviço espetacular.",
    estrelas: 5
  },
  {
    nome: "Beatriz Rocha",
    iniciais: "BR",
    cargo: "CEO • Rocha Acessórios",
    texto: "Sempre tivemos dificuldade em fotografar semijoias e relógios por conta do reflexo e foco. Com o Virtual Studio, a nitidez é inacreditável. O detalhamento dos metais e pedras nos avatares elevou a percepção de luxo da marca.",
    estrelas: 5
  },
  {
    nome: "Felipe Diniz",
    iniciais: "FD",
    cargo: "Fundador • Diniz Sportswear",
    texto: "Antes gastávamos uma fortuna com diárias de modelos e fotógrafos. Hoje conseguimos lançar novos drops semanalmente. A velocidade de entrega de 48h é crucial para o nosso fluxo de vendas.",
    estrelas: 5
  },
  {
    nome: "Gustavo Neves",
    iniciais: "GN",
    cargo: "Fundador • Neves Calçados",
    texto: "Sempre gastávamos muito tempo editando fotos de sapatos para tirar imperfeições e ajustar as sombras do couro. Com o Virtual Studio, os modelos calçam as peças de forma impecável, mostrando o caimento perfeito do produto real. As vendas subiram 35% no primeiro mês.",
    estrelas: 5
  }
];
