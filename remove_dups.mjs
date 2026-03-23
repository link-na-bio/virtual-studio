import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ruildppqtxrgycgsactu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1aWxkcHBxdHhyZ3ljZ3NhY3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjA0OTYsImV4cCI6MjA4OTA5NjQ5Nn0.iZI_yzmOQBJWMdDUetuyRLFKHMrJ_SHkTOetFYnUQ2w';

const supabase = createClient(supabaseUrl, supabaseKey);

async function removeDups() {
  console.log('Fetching estilos...');
  const { data, error } = await supabase.from('estilos').select('*').order('criado_em', { ascending: true });
  
  if (error) {
    console.error('Error fetching data:', error);
    return;
  }
  
  console.log(`Found ${data.length} estilos in total.`);
  
  const targetTitles = [
    'cenário 29/50', 'cenário 40/50', 'cenário 36/50', 'cenário 34/50', 'cenário 31/50'
  ];
  
  const toDelete = [];
  const seen = new Set();
  
  for (const style of data) {
    if (!style.titulo) continue;
    
    const lowerTitle = style.titulo.toLowerCase();
    
    if (targetTitles.includes(lowerTitle)) {
      if (seen.has(lowerTitle)) {
        // This is a duplicate (since we sorted by criado_em, we keep the older one and delete newer ones)
        toDelete.push(style.id);
      } else {
        seen.add(lowerTitle);
      }
    }
  }
  
  if (toDelete.length === 0) {
    console.log('No duplicates found for the specified titles.');
    return;
  }
  
  console.log('IDs to delete:', toDelete);
  
  for (const id of toDelete) {
    console.log(`Deleting id ${id}...`);
    const { error: delErr } = await supabase.from('estilos').delete().eq('id', id);
    if (delErr) {
      console.error(`Failed to delete id ${id}:`, delErr);
    } else {
      console.log(`Successfully deleted id ${id}`);
    }
  }
  
  console.log('Done.');
}

removeDups();
