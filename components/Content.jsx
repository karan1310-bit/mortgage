'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Home, Building2, CreditCard } from 'lucide-react';

export default function Content() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeUp}
      className="w-full bg-[#e6e1da] text-[#000000] font-Satoshi py-4 px-6 md:px-12 lg:px-24"
    >
      <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
        Find the right <span className="text-[#5b5b5b]">mortgage solution</span> for you
      </motion.h2>

      <motion.div variants={fadeUp} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            className="bg-white rounded-2xl text-center p-16 flex flex-col items-center justify-between h-full md:h-[50vh] shadow-md hover:shadow-lg transition hover:bg-[#5b5b5b] hover:text-white group"
          >
            <div className="mb-6 text-[#5b5b5b] group-hover:text-white transition">
              {card.icon}
            </div>
            <h3 className="text-xl font-semibold mb-4 text-[#000000] group-hover:text-white transition">{card.title}</h3>
            <p className="text-sm md:text-base text-[#3a3a3a] group-hover:text-white leading-relaxed max-w-xs transition">
              {card.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
      >
        <button className="border-2 border-[#5b5b5b] text-[#5b5b5b] px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#3d3d3d] hover:text-white transition">
          MORE SOLUTIONS
        </button>
        <button className="bg-[#5b5b5b] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#1f1f1f] transition">
          APPLY NOW
        </button>
      </motion.div>
    </motion.section>
  );
}

const cards = [
  {
    title: 'Residential',
    description:
      'Buying your first home, move-up home, or an income property? We can help secure the best rate.',
    icon: <Home size={48} />,
  },
  {
    title: 'Commercial',
    description:
      'Grow your business - We have expertise in construction financing, business start-up or expansion and land acquisitions.',
    icon: <Building2 size={48} />,
  },
  {
    title: 'Debt Consolidation',
    description:
      'Combining your high interest debts into one convenient payment can save you money and improve your credit score.',
    icon: <CreditCard size={48} />,
  },
];
