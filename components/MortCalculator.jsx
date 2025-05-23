// MortgagePayCalc.jsx – Final Version ✅
import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MortgagePayCalc = () => {
  const [askingPrice, setAskingPrice] = useState(500000);
  const [downPaymentAmount, setDownPaymentAmount] = useState(100000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [mortgageRate, setMortgageRate] = useState(5.59);
  const [mortgageTerm, setMortgageTerm] = useState(3);
  const [amortizationPeriod, setAmortizationPeriod] = useState(25);
  const [paymentFrequency, setPaymentFrequency] = useState(1);

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [biweeklyPayment, setBiweeklyPayment] = useState(0);
  const [weeklyPayment, setWeeklyPayment] = useState(0);
  const [totalMortgageAmount, setTotalMortgageAmount] = useState(0);
  const [principalPaid, setPrincipalPaid] = useState(0);
  const [interestPaid, setInterestPaid] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [lineChartData, setLineChartData] = useState({ labels: [], datasets: [] });
  const [pieChartData, setPieChartData] = useState({ labels: [], datasets: [] });

  const formatNumber = (num) => num.toLocaleString();

  useEffect(() => {
    const loanAmount = askingPrice - downPaymentAmount;
    setTotalMortgageAmount(loanAmount);

    const monthlyInterestRate = mortgageRate / 100 / 12;
    const months = amortizationPeriod * 12;
    const monthly = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) / (Math.pow(1 + monthlyInterestRate, months) - 1);

    setMonthlyPayment(Math.round(monthly));
    setBiweeklyPayment(Math.round((monthly * 12) / 26));
    setWeeklyPayment(Math.round((monthly * 12) / 52));

    const totalPayments = months;
    let balance = loanAmount;
    let paidPrincipal = 0;
    let paidInterest = 0;

    const yearlyLabels = [];
    const yearlyBalances = [];

    for (let i = 1; i <= totalPayments; i++) {
      const interest = balance * monthlyInterestRate;
      const principal = monthly - interest;
      balance -= principal;
      paidPrincipal += principal;
      paidInterest += interest;

      if (i % 12 === 0 || i === totalPayments) {
        yearlyLabels.push(`Year ${Math.floor(i / 12)}`);
        yearlyBalances.push(Math.max(0, Math.round(balance)));
      }
    }

    setPrincipalPaid(Math.round(paidPrincipal));
    setInterestPaid(Math.round(paidInterest));
    setRemainingBalance(Math.round(balance));

    setLineChartData({
      labels: yearlyLabels,
      datasets: [
        {
          label: 'Balance Remaining',
          data: yearlyBalances,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(59, 130, 246, 0.15)',
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    });

    setPieChartData({
      labels: ['Interest/Principal', 'Remaining Balance'],
      datasets: [
        {
          label: 'Mortgage Split',
          data: [Math.round(paidPrincipal + paidInterest), Math.round(balance)],
          backgroundColor: ['#94a3b8', '#2563eb'],
          borderWidth: 1,
        },
      ],
    });
  }, [askingPrice, downPaymentAmount, mortgageRate, amortizationPeriod, mortgageTerm]);

  return (
    <div className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-lg space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-700">Mortgage Payment Calculator</h1>
        <p className="text-gray-500 mt-2">Find a home that fits within your desired price range</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium">Down Payment ($)</label>
            <input type="number" value={downPaymentAmount} onChange={(e) => setDownPaymentAmount(Number(e.target.value))} className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Down Payment (%)</label>
            <input type="number" value={downPaymentPercent} onChange={(e) => setDownPaymentPercent(Number(e.target.value))} className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Mortgage Rate (%)</label>
            <input type="number" value={mortgageRate} onChange={(e) => setMortgageRate(Number(e.target.value))} className="w-full rounded-xl border px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Amortization Period</label>
            <select value={amortizationPeriod} onChange={(e) => setAmortizationPeriod(Number(e.target.value))} className="w-full rounded-xl border px-4 py-2">
              {[...Array(26)].map((_, i) => <option key={i} value={i + 5}>{i + 5} years</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Mortgage Term</label>
            <select value={mortgageTerm} onChange={(e) => setMortgageTerm(Number(e.target.value))} className="w-full rounded-xl border px-4 py-2">
              {[1, 2, 3, 4, 5].map((year) => <option key={year} value={year}>{year} Year</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Payment Frequency</label>
            <select value={paymentFrequency} onChange={(e) => setPaymentFrequency(Number(e.target.value))} className="w-full rounded-xl border px-4 py-2">
              <option value={1}>Monthly</option>
              <option value={2}>Bi-Weekly</option>
              <option value={4}>Weekly</option>
            </select>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl shadow text-sm space-y-3">
          <h2 className="text-xl font-semibold text-blue-800">Mortgage Summary</h2>
          <p><strong>Principal Paid:</strong> ${formatNumber(principalPaid)}</p>
          <p><strong>Interest Paid:</strong> ${formatNumber(interestPaid)}</p>
          <p><strong>Total Paid:</strong> ${formatNumber(principalPaid + interestPaid)}</p>
          <p><strong>Remaining Balance:</strong> ${formatNumber(remainingBalance)}</p>
          <div className="w-[180px] h-[180px] mx-auto">
            <Doughnut data={pieChartData} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h3 className="text-lg font-semibold mb-4 text-blue-700">Balance Remaining Over Time</h3>
        <Line data={lineChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} height={300} />
      </div>
    </div>
  );
};

export default MortgagePayCalc;