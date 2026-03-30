-- ==========================================================
-- SCRIPT DE MIGRATION - TABELA DE CONFIGURAÇÕES MESTRE
-- EXECUTE NO "SQL EDITOR" DO PAINEL DO SUPABASE
-- ==========================================================

-- 1. Cria a tabela de Configurações Globais da Plataforma
CREATE TABLE IF NOT EXISTS public.plataforma_config (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Garantir que existe apenas 1 linha configurada
  preco_essencial NUMERIC(10, 2) DEFAULT 89.90,
  preco_premium NUMERIC(10, 2) DEFAULT 149.90,
  preco_elite NUMERIC(10, 2) DEFAULT 247.90,
  preco_amostra NUMERIC(10, 2) DEFAULT 19.90,
  manutencao BOOLEAN DEFAULT FALSE,
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- Ativa RLS
ALTER TABLE public.plataforma_config ENABLE ROW LEVEL SECURITY;

-- Permite que QUALQUER pessoa logada LEIA o status ou preços
CREATE POLICY "Public pode ler configurações da plataforma" 
ON public.plataforma_config 
FOR SELECT 
TO authenticated 
USING (true);

-- Permite atualizar/inserir (Update) apenas SE FOR ADMIN ('brunomeueditor@gmail.com')
CREATE POLICY "Apenas admins podem atualizar configurações da plataforma" 
ON public.plataforma_config 
FOR UPDATE 
TO authenticated 
USING (auth.jwt() ->> 'email' = 'brunomeueditor@gmail.com') 
WITH CHECK (auth.jwt() ->> 'email' = 'brunomeueditor@gmail.com');

CREATE POLICY "Apenas admins podem inserir a primeira linha" 
ON public.plataforma_config 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.jwt() ->> 'email' = 'brunomeueditor@gmail.com');


-- 2. Tabela de Cupons
CREATE TABLE IF NOT EXISTS public.cupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo TEXT UNIQUE NOT NULL,
  desconto_percentual NUMERIC(5, 2) NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  criado_por UUID REFERENCES auth.users(id)
);

-- Habilitar RLS
ALTER TABLE public.cupons ENABLE ROW LEVEL SECURITY;

-- Qualquer um pode consultar pra aplicar
CREATE POLICY "Qualquer pessoa logada le cupom ativo" 
ON public.cupons 
FOR SELECT 
TO authenticated 
USING (ativo = true OR auth.jwt() ->> 'email' = 'brunomeueditor@gmail.com');

-- Apenas admins criam
CREATE POLICY "Apenas admins podem criar/deletar/atualizar cupons" 
ON public.cupons 
FOR ALL 
TO authenticated 
USING (auth.jwt() ->> 'email' = 'brunomeueditor@gmail.com') 
WITH CHECK (auth.jwt() ->> 'email' = 'brunomeueditor@gmail.com');


-- 3. Inserir a linha padrão na plataforma_config 
-- (Irá falhar se o id=1 já existir, mas está ok já que é segura)
INSERT INTO public.plataforma_config (id, preco_essencial, preco_premium, preco_elite, preco_amostra, manutencao)
VALUES (1, 89.90, 149.90, 247.90, 19.90, FALSE)
ON CONFLICT (id) DO NOTHING;
