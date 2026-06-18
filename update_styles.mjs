import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ruildppqtxrgycgsactu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1aWxkcHBxdHhyZ3ljZ3NhY3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjA0OTYsImV4cCI6MjA4OTA5NjQ5Nn0.iZI_yzmOQBJWMdDUetuyRLFKHMrJ_SHkTOetFYnUQ2w";
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('estilos').select('*').ilike('categoria', '%Pais%');
  console.log('Found:', data?.length);
  if (error) {
     console.error(error);
     return;
  }
  
  if (data && data.length > 0) {
     for (const style of data) {
        // Change category and optionally title
        const newCategory = "Especial Dia dos Pais";
        let newTitle = style.titulo.replace(/Romântico/gi, 'Pai').replace(/Romântica/gi, 'Pai');
        // If "Casal" was in title, change to "Pai e Filho" etc. (Depends on the title, let's see them first).
        console.log(`Updating ${style.id}: Title: ${style.titulo} -> ${newTitle}, Categoria -> ${newCategory}`);
        const { error: updateError } = await supabase.from('estilos').update({ 
           categoria: newCategory,
           titulo: newTitle
        }).eq('id', style.id);
        
        if (updateError) {
           console.error("Error updating", style.id, updateError);
        } else {
           console.log(`Successfully updated ${style.id}`);
        }
     }
  } else {
     console.log("No namorados styles found.");
  }
}
run();
