'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {

  return (
    <section className="relative font-Satoshi h-screen w-full overflow-hidden">
        <motion.div
          className="relative h-screen w-full flex items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
      <Image 
        src="/images/hero4.png" 
        alt="Mountain" 
        fill 
        className="object-cover z-[1]"
        priority
      />
     </motion.div>
    </section>
  );
}