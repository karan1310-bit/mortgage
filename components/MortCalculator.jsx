'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

const COLORS = ['#3a3a3a', '#9ca3af'];

export default function MortgageCalculator() {
  const [hasMounted, setHasMounted] = useState(false);
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(5.25);
  const [amortYears, setAmortYears] = useState(25);
  const [termYears, setTermYears] = useState(5);
  const [payment, setPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [balanceEndOfTerm, setBalanceEndOfTerm] = useState(0);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const P = amount;
    const r = rate / 100 / 12;
    const n = amortYears * 12;
    const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    setPayment(monthly);
    setTotalInterest(total - P);

    const termN = termYears * 12;
    const balance =
      P * Math.pow(1 + r, termN) -
      (Math.pow(1 + r, termN) - 1) * (monthly / r);
    setBalanceEndOfTerm(balance);
  }, [amount, rate, amortYears, termYears]);

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Mortgage Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Mortgage Amount: $${amount.toLocaleString()}`, 20, 40);
    doc.text(`Interest Rate: ${rate}%`, 20, 50);
    doc.text(`Amortization Period: ${amortYears} Years`, 20, 60);
    doc.text(`Term: ${termYears} Years`, 20, 70);
    doc.text(`Monthly Payment: $${payment.toFixed(2)}`, 20, 80);
    doc.text(`Total Interest: $${totalInterest.toFixed(2)}`, 20, 90);
    doc.text(`Balance at End of Term: $${balanceEndOfTerm.toFixed(2)}`, 20, 100);
    doc.save('mortgage-report.pdf');
  };

  if (!hasMounted) return null;

  const pieData = [
    { name: 'Principal', value: amount },
    { name: 'Interest', value: totalInterest },
  ];

  return (
    <div className="min-h-screen p-6 md:pt-12 font-satoshi bg-[#e6e1da] text-[#3a3a3a]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left - Inputs */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold mb-4">Mortgage Payment Calculator</h1>
          </div>

          {/* Mortgage Amount */}
          <div>
            <label className="block text-lg font-semibold mb-2">Mortgage Amount</label>
            <input
              type="range"
              min={50000}
              max={2000000}
              step={1000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-[#3a3a3a]"
            />
            <p className="mt-2 font-medium">${amount.toLocaleString()}</p>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-lg font-semibold mb-2">Interest Rate (%)</label>
            <input
              type="range"
              min={0.5}
              max={10}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-[#3a3a3a]"
            />
            <p className="mt-2 font-medium">{rate}%</p>
          </div>

          {/* Amortization Period */}
          <div>
            <label className="block text-lg font-semibold mb-2">Amortization Period (Years)</label>
            <input
              type="range"
              min={5}
              max={35}
              step={1}
              value={amortYears}
              onChange={(e) => setAmortYears(Number(e.target.value))}
              className="w-full accent-[#3a3a3a]"
            />
            <p className="mt-2 font-medium">{amortYears} years</p>
          </div>

          {/* Rate Term */}
          <div>
            <label className="block text-lg font-semibold mb-2">Rate Term (Years)</label>
            <select
              value={termYears}
              onChange={(e) => setTermYears(Number(e.target.value))}
              className="w-full p-2 rounded-lg border-2 border-[#3a3a3a] bg-white"
            >
              {[1, 2, 3, 4, 5].map((year) => (
                <option key={year} value={year}>{year} Year</option>
              ))}
            </select>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full mt-6 py-3 bg-[#3a3a3a] text-white font-semibold rounded-lg hover:bg-black transition"
          >
            Download Report
          </button>
        </motion.div>

        {/* Right - Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold mb-6">Mortgage Summary</h2>
            <div className="space-y-4 text-xl md:text-3xl text-[#3a3a3a]">
              <div><strong>Monthly Payment:</strong> ${payment.toFixed(0)}</div>
              <div><strong>Total Interest:</strong> ${totalInterest.toFixed(0)}</div>
              <div><strong>Balance at Term:</strong> ${balanceEndOfTerm.toFixed(0)}</div>
              <div><strong>Amortization:</strong> {amortYears} Years</div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="h-64 mt-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>

              <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#3a3a3a] rounded-full"></div>
                <span className="text-sm text-[#3a3a3a]">Principal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#9ca3af] rounded-full"></div>
                <span className="text-sm text-[#3a3a3a]">Interest</span>
              </div>
            </div>
            </ResponsiveContainer>

            {/* Pie Chart Legend */}
            
          </div>
        </motion.div>
      </div>
    </div>
  );
}
