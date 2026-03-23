'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Cadastro no Supabase Auth com metadados do nome
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          // Redireciona para o dashboard após confirmar o e-mail (se habilitado)
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;

      if (data?.user?.identities?.length === 0) {
        setError('Este e-mail já está cadastrado. Tente fazer login.');
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      // Opcional: Redirecionar direto se a confirmação de e-mail estiver desabilitada no Supabase
      // setTimeout(() => router.push('/dashboard'), 2000);

    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError('Erro ao conectar com o Google.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans bg-studio-black">
      {/* Fundo Cinematográfico Sutil */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-futurista.png"
          alt="Background"
          fill
          className="object-cover opacity-20 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-studio-black/50 via-studio-black/90 to-studio-black"></div>
      </div>

      {/* Card Central de Vidro Fosco (Glassmorphism) */}
      <div className="w-full max-w-md relative z-10 bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">

        {/* Cabeçalho do Card */}
        <div className="flex flex-col items-center mb-8">
          {/* AQUI ESTÁ A LOGO GRANDE PADRONIZADA (w-28 h-28) */}
          <div className="relative w-28 h-28 mb-3">
            <Image src="/logo.png" alt="Virtual Studio Logo" fill className="object-contain" priority />
          </div>
          <h2 className="text-xl font-display font-bold text-white tracking-[0.2em] uppercase">Virtual Studio</h2>
          <p className="text-studio-gold text-[10px] uppercase tracking-widest mt-1">Crie sua Conta Premium</p>
        </div>

        {/* Mensagens de Feedback */}
        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-500 text-xs text-center font-bold uppercase tracking-widest">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center py-10 flex flex-col items-center space-y-5 bg-studio-gold/5 border border-studio-gold/20 rounded-2xl p-6 shadow-xl shadow-studio-gold/5">
            <div className="w-16 h-16 rounded-full bg-studio-gold flex items-center justify-center text-studio-black">
              <Sparkles size={32} />
            </div>
            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider">Quase lá!</h3>
            <p className="text-gray-300 text-sm leading-relaxed">Enviamos um link de confirmação para <strong className="text-studio-gold">{email}</strong>. Por favor, verifique sua caixa de entrada (e spam) para ativar sua conta e acessar o dashboard.</p>
            <Link href="/login" className="text-studio-gold font-bold text-xs uppercase tracking-widest hover:underline pt-4">Voltar para o Login</Link>
          </div>
        ) : (
          <>
            {/* Formulário */}
            <form onSubmit={handleSignup} className="space-y-5 mb-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white focus:border-studio-gold outline-none transition-colors text-sm"
                    placeholder="Seu Nome Completo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">E-mail Melhor Avaliado</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white focus:border-studio-gold outline-none transition-colors text-sm"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Defina sua Senha segura</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white focus:border-studio-gold outline-none transition-colors text-sm"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !name || !email || !password}
                className="w-full bg-studio-gold text-studio-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-studio-gold-light transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Criar Conta <ArrowRight size={14} /></>}
              </button>
            </form>

            {/* Divisor */}
            <div className="flex items-center gap-4 mb-6 opacity-50">
              <div className="h-px bg-white/20 flex-1"></div>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Ou cadastre-se com</span>
              <div className="h-px bg-white/20 flex-1"></div>
            </div>

            {/* Botão Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-white/5 border border-white/10 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Cadastrar com Google
            </button>

            {/* Rodapé de Login */}
            <p className="mt-8 text-center text-[10px] text-gray-500 uppercase tracking-widest">
              Já possui uma conta? <br className="sm:hidden" />
              <Link href="/login" className="text-studio-gold font-bold hover:underline mt-1 sm:mt-0 sm:ml-1 inline-block">Fazer Login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}