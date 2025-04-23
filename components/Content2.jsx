'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator, FileText, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Content2() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.resource-card', {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 100%',
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#e6e1da] font-Satoshi text-black py-20 lg:py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl uppercase font-bold mb-4">Mortgage Resources</h2>
        <p className="text-[#3a3a3a] text-base md:text-lg max-w-2xl mx-auto mb-16">
          Below are several resources to help answer any question you may have about your mortgage or refinancing options.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {resources.map((resource, index) => (
          <div key={index} className="resource-card flex flex-col items-center gap-4">
            <div className="bg-[#000000]/10 p-4 rounded-full">
              <resource.icon size={48} strokeWidth={1.5} className="text-black" />
            </div>
            <h3 className="text-xl font-semibold">{resource.title}</h3>
            <p className="text-[#3a3a3a] text-sm max-w-xs whitespace-pre-line">
              {resource.description}
            </p>
            {resource.link && (
              <Link href={resource.link} className="mt-2 text-sm font-semibold text-black nav-hover-btn inline-flex items-center gap-2">
                {resource.linkLabel} <span className="text-xl">→</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

const resources = [
  {
    title: 'Compare Loans',
    description: 'Consider our complete list of loans to help you decide which loan is the best fit for you.',
    icon: FileText,
    link: '#',
    linkLabel: 'COMPARE LOANS',
  },
  {
    title: 'Calculators',
    description: 'Make sense of the numbers. We have several different calculators to explore for different mortgage needs.',
    icon: Calculator,
    link: '#',
    linkLabel: 'CALCULATORS',
  },
  {
    title: 'Questions & Answers',
    description: 'The most common mortgage questions addressed. Still looking for answers? Give us a call!\n970-828-1610',
    icon: MessageSquare,
    link: '#',
    linkLabel: 'LEARN MORE',
  },
];