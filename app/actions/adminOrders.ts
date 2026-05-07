'use server';

import { createClient } from '@supabase/supabase-js';

// Cria um cliente com privilégios de Service Role que ignora RLS
function getServiceRoleClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function createManualOrderAction(data: {
  cliente: string;
  pacote: string;
  valor: number;
  estilos: string[];
}) {
  try {
    const supabaseAdmin = getServiceRoleClient();

    const { data: result, error } = await supabaseAdmin
      .from('pedidos')
      .insert({
        user_email: data.cliente,
        observacoes: `PEDIDO CONCIERGE (WhatsApp)\nCliente: ${data.cliente}\nEstilos: ${data.estilos.join(', ')}`,
        pacote: data.pacote,
        valor: data.valor,
        estilos: data.estilos,
        status: 'Aguardando Produção'
      })
      .select()
      .single();

    if (error) {
      console.error('Erro no Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: result };
  } catch (err: any) {
    console.error('Exceção na Action:', err);
    return { success: false, error: err.message || 'Erro interno no servidor' };
  }
}
