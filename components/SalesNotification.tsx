'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const salesData = [
  // Nomes originais
  { name: 'Marcelo A.', action: 'acabou de gerar um', package: 'Ensaio Elite', time: 'há poucos minutos' },
  { name: 'Dra. Camila', action: 'aproveitou a', package: 'Amostra VIP 💎', time: 'há poucos instantes' },
  { name: 'Thiago Exec.', action: 'iniciou um', package: 'Ensaio Premium', time: 'há poucos minutos' },
  { name: 'Luciana V.', action: 'acabou de gerar um', package: 'Ensaio Premium', time: 'há poucos instantes' },
  { name: 'Pr. Roberto', action: 'iniciou um', package: 'Ensaio Elite', time: 'há poucos minutos' },
  // Novos 50 nomes
  { name: 'Juliana C.', action: 'garantiu seu', package: 'Ensaio Premium', time: 'há 2 minutos' },
  { name: 'Carlos M.', action: 'aproveitou a', package: 'Amostra VIP 💎', time: 'há poucos instantes' },
  { name: 'Fernanda L.', action: 'acabou de gerar um', package: 'Ensaio Elite', time: 'há 5 minutos' },
  { name: 'Dr. Paulo', action: 'iniciou um', package: 'Ensaio Premium', time: 'há 1 minuto' },
  { name: 'Mariana S.', action: 'solicitou um', package: 'Ensaio Essencial', time: 'há poucos instantes' },
  { name: 'Ricardo CEO', action: 'acabou de gerar um', package: 'Ensaio Elite', time: 'há 3 minutos' },
  { name: 'Vitor H.', action: 'aproveitou a', package: 'Amostra VIP 💎', time: 'há 4 minutos' },
  { name: 'Ana Paula', action: 'garantiu seu', package: 'Ensaio Premium', time: 'há poucos minutos' },
  { name: 'Dra. Beatriz', action: 'iniciou um', package: 'Ensaio Elite', time: 'há 7 minutos' },
  { name: 'Fábio R.', action: 'acabou de gerar um', package: 'Ensaio Premium', time: 'há 2 minutos' },
  { name: 'Camila T.', action: 'solicitou um', package: 'Ensaio Essencial', time: 'há instantes' },
  { name: 'Guilherme B.', action: 'aproveitou a', package: 'Amostra VIP 💎', time: 'há 6 minutos' },
  { name: 'Letícia N.', action: 'garantiu seu', package: 'Ensaio Elite', time: 'há poucos minutos' },
  { name: 'Dr. Henrique', action: 'iniciou um', package: 'Ensaio Premium', time: 'há 3 minutos' },
  { name: 'Aline Corretora', action: 'acabou de gerar um', package: 'Ensaio Elite', time: 'há instantes' },
  { name: 'Pedro S.', action: 'solicitou um', package: 'Ensaio Premium', time: 'há 8 minutos' },
  { name: 'Rafaela M.', action: 'aproveitou a', package: 'Amostra VIP 💎', time: 'há 1 minuto' },
  { name: 'Gustavo Adv.', action: 'garantiu seu', package: 'Ensaio Elite', time: 'há 12 minutos' },
  { name: 'Carolina D.', action: 'iniciou um', package: 'Ensaio Premium', time: 'há 2 minutos' },
  { name: 'Lucas F.', action: 'acabou de gerar um', package: 'Ensaio Essencial', time: 'há poucos minutos' },
  { name: 'Dra. Vanessa', action: 'solicitou um', package: 'Ensaio Elite', time: 'há 4 minutos' },
  { name: 'Matheus L.', action: 'aproveitou a', package: 'Amostra VIP 💎', time: 'há instantes' },
  { name: 'Amanda J.', action: 'garantiu seu', package: 'Ensaio Premium', time: 'há 5 minutos' },
  { name: 'Bruno C.', action: 'iniciou um', package: 'Ensaio Elite', time: 'há 9 minutos' },
  { name: 'Tatiana Med.', action: 'acabou de gerar um', package: 'Ensaio Premium', time: 'há poucos minutos' },
  { name: 'Rodrigo P.', action: 'solicitou um', package: 'Ensaio Essencial', time: 'há 10 minutos' },
  { name: 'Isabela G.', action: 'aproveitou a', package: 'Amostra VIP 💎', time: 'há 2 minutos' },
  { name: 'Dr. Leonardo', action: 'garantiu seu', package: 'Ensaio Elite', time: 'há instantes' },
  { name: 'Patrícia A.', action: 'iniciou um', package: 'Ensaio Premium', time: 'há 6 minutos' },
  { name: 'Diego M.', action: 'acabou de gerar um', package: 'Ensaio Elite', time: 'há 3 minutos' },
  { name: 'Larissa R.', action: 'solicitou um', package: 'Ensaio Premium', time: 'há poucos minutos' },
  { name: 'Eduardo T.', action: 'aproveitou a', package: 'Amostra VIP 💎', time: 'há 7 minutos' },
  { name: 'Pr. Marcos', action: 'garantiu seu', package: 'Ensaio Elite', time: 'há instantes' },
  { name: 'Jéssica B.', action: 'iniciou um', package: 'Ensaio Essencial', time: 'há 4 minutos' },
  { name: 'Thiago F.', action: 'acabou de gerar um', package: 'Ensaio Premium', time: 'há 11 minutos' },
  { name: 'Dra. Renata', action: 'solicitou um', package: 'Ensaio Elite', time: 'há 2 minutos' },
  { name: 'André V.', action: 'aproveitou a', package: 'Amostra VIP 💎', time: 'há poucos minutos' },
  { name: 'Bianca S.', action: 'garantiu seu', package: 'Ensaio Premium', time: 'há 5 minutos' },
  { name: 'Felipe D.', action: 'iniciou um', package: 'Ensaio Elite', time: 'há instantes' },
  { name: 'Cláudia Arq.', action: 'acabou de gerar um', package: 'Ensaio Premium', time: 'há 8 minutos' },
  { name: 'Marcelo O.', action: 'solicitou um', package: 'Ensaio Essencial', time: 'há 3 minutos' },
  { name: 'Nayara K.', action: 'aproveitou a', package: 'Amostra VIP 💎', time: 'há poucos minutos' },
  { name: 'Dr. Fernando', action: 'garantiu seu', package: 'Ensaio Elite', time: 'há 6 minutos' },
  { name: 'Silvia M.', action: 'iniciou um', package: 'Ensaio Premium', time: 'há 1 minuto' },
  { name: 'Leandro P.', action: 'acabou de gerar um', package: 'Ensaio Elite', time: 'há 9 minutos' },
  { name: 'Milena C.', action: 'solicitou um', package: 'Ensaio Premium', time: 'há instantes' },
  { name: 'Gabriel N.', action: 'aproveitou a', package: 'Amostra VIP 💎', time: 'há 4 minutos' },
  { name: 'Dra. Laura', action: 'garantiu seu', package: 'Ensaio Elite', time: 'há poucos minutos' },
  { name: 'Samuel L.', action: 'iniciou um', package: 'Ensaio Essencial', time: 'há 7 minutos' },
  { name: 'Vitória B.', action: 'acabou de gerar um', package: 'Ensaio Premium', time: 'há 2 minutos' }
];

export default function SalesNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSale, setCurrentSale] = useState(salesData[0]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const showNotification = () => {
      const randomSale = salesData[Math.floor(Math.random() * salesData.length)];
      setCurrentSale(randomSale);
      setIsVisible(true);
      
      setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Fica 5s na tela

      // Calcula tempo aleatório para a próxima (entre 20s e 25s)
      const nextInterval = Math.floor(Math.random() * (25000 - 20000 + 1)) + 20000;
      timeoutId = setTimeout(showNotification, nextInterval);
    };

    // Tiro inicial após 3s
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 3000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed bottom-6 left-6 z-[100] bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-l-2 border-l-studio-gold p-4 min-w-[300px]"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-studio-gold/10 text-studio-gold flex items-center justify-center shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div className="flex flex-col">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                {currentSale.name} • {currentSale.time}
              </p>
              <p className="text-white text-sm">
                {currentSale.action} <span className="text-studio-gold font-bold">{currentSale.package}</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
