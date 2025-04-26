'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';

const COLORS = ['#3a3a3a', '#9ca3af', '#60a5fa'];

export default function PurchaseCalculator() {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(10);
  const [rate, setRate] = useState(5.25);
  const [amortYears, setAmortYears] = useState(25);
  const [termYears, setTermYears] = useState(5);
  const [propertyTax, setPropertyTax] = useState(0);
  const [condoFees, setCondoFees] = useState(0);
  const [heat, setHeat] = useState(0);
  const [otherExpenses, setOtherExpenses] = useState(0);
  const [rentalIncome, setRentalIncome] = useState(0);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;

  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const mortgageBase = homePrice - downPaymentAmount;
  const insuranceRate = downPaymentPercent < 20 ? 0.04 : 0;
  const mortgageInsurance = mortgageBase * insuranceRate;
  const totalLoan = mortgageBase + mortgageInsurance;

  const r = rate / 100 / 12;
  const n = amortYears * 12;
  const monthlyMortgage = (totalLoan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const monthlyExpenses = Number(propertyTax) + Number(condoFees) + Number(heat) + Number(otherExpenses);

  const totalMonthlyCost = monthlyMortgage + monthlyExpenses - Number(rentalIncome);

  const closingCosts = homePrice * 0.028;
  const interestPaid = monthlyMortgage * n - totalLoan;

  const chartData = [
    { name: 'Mortgage Payment', value: monthlyMortgage },
    { name: 'Home Expenses', value: Number(propertyTax) + Number(condoFees) + Number(heat) },
    { name: 'Other Expenses', value: Number(otherExpenses) },
  ];

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Purchase Calculator Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Home Price: $${homePrice.toLocaleString()}`, 20, 40);
    doc.text(`Down Payment: $${downPaymentAmount.toLocaleString()} (${downPaymentPercent}%)`, 20, 50);
    doc.text(`Mortgage Amount: $${mortgageBase.toLocaleString()}`, 20, 60);
    doc.text(`Mortgage Insurance: $${mortgageInsurance.toFixed(2)}`, 20, 70);
    doc.text(`Total Loan: $${totalLoan.toFixed(2)}`, 20, 80);
    doc.text(`Interest Rate: ${rate}%`, 20, 90);
    doc.text(`Amortization: ${amortYears} Years`, 20, 100);
    doc.text(`Term: ${termYears} Years`, 20, 110);
    doc.text(`Monthly Mortgage: $${monthlyMortgage.toFixed(2)}`, 20, 120);
    doc.text(`Total Monthly Cost: $${totalMonthlyCost.toFixed(2)}`, 20, 130);
    doc.text(`Closing Costs: $${closingCosts.toFixed(2)}`, 20, 140);
    doc.save('purchase-calculator-report.pdf');
  };

  return (
    <div className="min-h-screen p-6 bg-[#e6e1da] text-[#3a3a3a]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left Inputs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-3xl font-bold mb-6">Purchase Calculator</h1>

          {/* Home Price */}
          <div>
            <label className="block font-semibold mb-1">Home Price</label>
            <input
              type="range"
              min={50000}
              max={2000000}
              step={1000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full accent-[#3a3a3a]"
            />
            <p>${homePrice.toLocaleString()}</p>
          </div>

          {/* Down Payment */}
          <div>
            <label className="block font-semibold mb-1">Down Payment (%)</label>
            <select
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full p-2 rounded-lg border-2 border-[#3a3a3a] bg-white"
            >
              {[5, 10, 15, 20, 25].map((val) => (
                <option key={val} value={val}>{val}%</option>
              ))}
            </select>
            <p>Down Payment: ${downPaymentAmount.toLocaleString()}</p>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block font-semibold mb-1">Interest Rate (%)</label>
            <input
              type="range"
              min={0.5}
              max={10}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-[#3a3a3a]"
            />
            <p>{rate}%</p>
          </div>

          {/* Amortization Period */}
          <div>
            <label className="block font-semibold mb-1">Amortization Period (Years)</label>
            <input
              type="range"
              min={5}
              max={35}
              step={1}
              value={amortYears}
              onChange={(e) => setAmortYears(Number(e.target.value))}
              className="w-full accent-[#3a3a3a]"
            />
            <p>{amortYears} years</p>
          </div>

          {/* Rate Term */}
          <div>
            <label className="block font-semibold mb-1">Rate Term (Years)</label>
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

          {/* Extra Expenses */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Property Tax (Monthly)</label>
              <input
                type="number"
                value={propertyTax}
                onChange={(e) => setPropertyTax(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Condo Fees (Monthly)</label>
              <input
                type="number"
                value={condoFees}
                onChange={(e) => setCondoFees(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Heat (Monthly)</label>
              <input
                type="number"
                value={heat}
                onChange={(e) => setHeat(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Other Expenses (Monthly)</label>
              <input
                type="number"
                value={otherExpenses}
                onChange={(e) => setOtherExpenses(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Rental Income (Monthly)</label>
              <input
                type="number"
                value={rentalIncome}
                onChange={(e) => setRentalIncome(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full mt-6 py-3 bg-[#3a3a3a] text-white font-semibold rounded-lg hover:bg-black transition"
          >
            Download Report
          </button>
        </motion.div>
        {/* Left Inputs - remains unchanged */}
        {/* ... form fields go here ... */}

        {/* Right - Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold mb-6">Summary</h2>

            <div className="space-y-3 text-base">
              <div><strong>Monthly Mortgage:</strong> ${monthlyMortgage.toFixed(2)}</div>
              <div><strong>Home Expenses:</strong> ${(Number(propertyTax) + Number(condoFees) + Number(heat)).toFixed(2)}</div>
              <div><strong>Other Expenses:</strong> ${Number(otherExpenses).toFixed(2)}</div>
              <div><strong>Rental Income:</strong> -${Number(rentalIncome).toFixed(2)}</div>
            </div>

            <div className="mt-6 border-t pt-6 text-lg">
              <div className="font-semibold text-[#3a3a3a]">Total Monthly Cost:</div>
              <div className="text-4xl font-extrabold mt-2">${totalMonthlyCost.toFixed(0)}</div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="h-72 mt-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Pie Chart Legend */}
            <div className="flex justify-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#3a3a3a] rounded-full"></div>
                <span>Mortgage Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#9ca3af] rounded-full"></div>
                <span>Home Expenses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#60a5fa] rounded-full"></div>
                <span>Other Expenses</span>
              </div>
            </div>
          </div>

          {/* Loan Details */}
          <div className="border-t pt-6 mt-6 space-y-2 text-sm">
            <div><strong>Mortgage Amount:</strong> ${mortgageBase.toLocaleString()}</div>
            <div><strong>Mortgage Insurance:</strong> ${mortgageInsurance.toFixed(2)}</div>
            <div><strong>Total Loan:</strong> ${totalLoan.toFixed(2)}</div>
            <div><strong>Closing Costs:</strong> ${closingCosts.toFixed(2)}</div>
            <div><strong>Interest Paid over Term:</strong> ${interestPaid.toFixed(2)}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
