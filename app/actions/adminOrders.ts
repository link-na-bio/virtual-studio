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
  const supabaseAdmin = getServiceRoleClient();

  const { data: result, error } = await supabaseAdmin
    .from('pedidos')
    .insert({
      user_email: data.cliente,
      observacoes: `PEDIDO CONCIERGE (WhatsApp)\nCliente: ${data.cliente}\nEstilos: ${data.estilos.join(', ')}`,
      pacote: data.pacote,
      valor: data.valor,
      estilos: data.estilos,
      status: 'Aguardando Produção',
      user_id: null // Explicitamente nulo, já que removemos o NOT NULL
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar pedido manual (Service Role):', error);
    throw new Error(error.message);
  }

  return result;
}
