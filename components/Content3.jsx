'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MessageCircleMore, Plus, Minus } from 'lucide-react';

gsap.registerPlugin();

const faqs = [
  {
    question: "Can't afford to put 20% down?",
    answer:
      "There are low down payment options available, including government-backed loans like FHA which may require as little as 3.5%.",
  },
  {
    question: 'Do we offer Custom Loan programs?',
    answer:
      "Yes, we provide custom loan solutions tailored to your financial situation and goals. Speak with a loan advisor to learn more.",
  },
  {
    question: 'Can I use some of my IRA or 401(k) plan for a down payment?',
    answer:
      "Yes, under certain conditions you can withdraw from your IRA or 401(k) for a first-time home purchase without penalties. Consult a tax advisor.",
  },
  {
    question: "What's the difference between a fixed and an adjustable rate mortgage?",
    answer:
      "A fixed-rate mortgage keeps the same interest rate throughout the loan. An adjustable-rate mortgage (ARM) can change over time, typically after an initial fixed period.",
  },
  {
    question: "What's better, a fixed or an adjustable rate mortgage?",
    answer:
      "It depends on your goals. Fixed rates offer stability. ARMs may be cheaper initially but carry risk if rates rise later.",
  },
  {
    question: 'What is private mortgage insurance (PMI)?',
    answer:
      "PMI is insurance that protects the lender if you default. It's usually required if your down payment is less than 20%.",
  },
];

export default function Content3() {
  const sectionRef = useRef(null);
  useGSAP(() => {
    gsap.from('.faq-item', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });
  }, { scope: sectionRef });

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#e6e1da] text-black font-Satoshi py-14 md:py-20 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#000000]/10 w-fit p-4 rounded-full">
            <MessageCircleMore size={48} className="text-black" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Answers To Some Commonly Asked Questions.
          </h2>
          <p className="text-[#3a3a3a] text-sm md:text-base max-w-md">
            If you have additional questions, please give us a call at{' '}
            <span className="text-[#295937] font-medium">970-828-1610</span> or email us at anytime at{' '}
            <span className="">help@animasmountainmortgage.com</span>.
          </p>
        </div>

        {/* Right Side - Accordion */}
        <div className="flex flex-col divide-y divide-[#d6d2ca]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item py-6 cursor-pointer flex flex-col gap-3 select-none"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center text-lg font-medium">
                {faq.question}
                {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
              </div>
              {openIndex === index && (
                <p className="text-sm text-[#3a3a3a] pt-2">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}