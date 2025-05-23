import { useState, useEffect } from 'react';
import TermSummary from './TermSummary';

const TooltipIcon = ({ content }) => (
  <span className="ml-1 cursor-help" title={content}>
    <i className="bi bi-question-circle-fill text-gray-500"></i>
  </span>
);

const formatNumberWithCommas = (number) =>
  number !== null && number !== undefined ? number.toLocaleString() : '-';

const MortgagePayCalc = () => {
  const [askingPrice, setAskingPrice] = useState(500000);
  const [downPaymentAmount, setDownPaymentAmount] = useState(100000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [mortgageRate, setMortgageRate] = useState(5.59);
  const [amortizationPeriod, setAmortizationPeriod] = useState(25);
  const [paymentFrequency, setPaymentFrequency] = useState(1);
  const [mortgageTerm, setMortgageTerm] = useState(3);

  const [totalMortgageAmount, setTotalMortgageAmount] = useState(null);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [biweeklyPayment, setBiweeklyPayment] = useState(null);
  const [weeklyPayment, setWeeklyPayment] = useState(null);
  const [principalPaid, setPrincipalPaid] = useState(null);
  const [interestPaid, setInterestPaid] = useState(null);
  const [totalPaid, setTotalPaid] = useState(null);
  const [remainingBalance, setRemainingBalance] = useState(null);

  useEffect(() => {
    const loan = askingPrice - downPaymentAmount;
    setTotalMortgageAmount(loan);

    const monthlyRate = mortgageRate / 100 / 12;
    const n = amortizationPeriod * 12;
    const power = Math.pow(1 + monthlyRate, n);
    const monthly = (loan * monthlyRate * power) / (power - 1);
    setMonthlyPayment(Number(monthly.toFixed(2)));
    setBiweeklyPayment(Number(((monthly * 12) / 26).toFixed(2)));
    setWeeklyPayment(Number(((monthly * 12) / 52).toFixed(2)));

    const freq = paymentFrequency === 1 ? 12 : paymentFrequency === 2 ? 26 : 52;
    const totalPayments = freq * mortgageTerm;
    let balance = loan;
    let principal = 0;
    let interest = 0;
    const payment =
      paymentFrequency === 1
        ? monthly
        : paymentFrequency === 2
        ? (monthly * 12) / 26
        : (monthly * 12) / 52;
    const ratePerPayment =
      paymentFrequency === 1
        ? monthlyRate
        : paymentFrequency === 2
        ? (monthlyRate * 12) / 26
        : (monthlyRate * 12) / 52;

    for (let i = 0; i < totalPayments; i++) {
      const interestPayment = balance * ratePerPayment;
      const principalPayment = payment - interestPayment;
      balance -= principalPayment;
      principal += principalPayment;
      interest += interestPayment;
    }

    setPrincipalPaid(Number(principal.toFixed(2)));
    setInterestPaid(Number(interest.toFixed(2)));
    setTotalPaid(Number((principal + interest).toFixed(2)));
    setRemainingBalance(Number(balance.toFixed(2)));
  }, [
    askingPrice,
    downPaymentAmount,
    downPaymentPercent,
    mortgageRate,
    amortizationPeriod,
    paymentFrequency,
    mortgageTerm,
  ]);

  return (
    <section className="max-w-7xl mx-auto mt-12 px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Section */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">Mortgage Payment Calculator</h1>
            <p className="text-gray-600 mb-6">Use our calculator to find a home that fits within your desired price range.</p>

            <div className="mb-4">
              <label className="font-semibold">
                Asking Price <TooltipIcon content="The list price of the home you’re interested in buying." />
              </label>
              <div className="flex">
                <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l">$</span>
                <input
                  type="number"
                  value={askingPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setAskingPrice(val);
                    setDownPaymentPercent(((downPaymentAmount / val) * 100).toFixed(2));
                  }}
                  className="w-full border border-gray-300 px-3 py-2 rounded-r"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="font-semibold">
                Down Payment <TooltipIcon content="The upfront payment made toward the purchase of your home." />
              </label>
              <div className="flex space-x-2">
                <div className="flex w-full">
                  <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l">$</span>
                  <input
                    type="number"
                    value={downPaymentAmount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setDownPaymentAmount(val);
                      setDownPaymentPercent(((val / askingPrice) * 100).toFixed(2));
                    }}
                    className="w-full border border-gray-300 px-3 py-2 rounded-r"
                  />
                </div>
                <input
                  type="number"
                  value={downPaymentPercent}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setDownPaymentPercent(val);
                    setDownPaymentAmount(((val / 100) * askingPrice).toFixed(2));
                  }}
                  className="w-1/3 border border-gray-300 px-3 py-2 rounded"
                />
                <span className="self-center">%</span>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">
                  Mortgage rate <TooltipIcon content="Annual interest rate on your mortgage." />
                </label>
                <div className="flex">
                  <input
                    type="number"
                    value={mortgageRate}
                    onChange={(e) => setMortgageRate(Number(e.target.value))}
                    className="w-full border border-gray-300 px-3 py-2 rounded-l"
                  />
                  <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r">%</span>
                </div>
              </div>
              <div>
                <label className="font-semibold">
                  Amortization period <TooltipIcon content="Total loan duration, typically 25 years." />
                </label>
                <select
                  value={amortizationPeriod}
                  onChange={(e) => setAmortizationPeriod(Number(e.target.value))}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                >
                  {Array.from({ length: 26 }, (_, i) => (
                    <option key={i} value={i + 5}>
                      {i + 5} years
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">
                  Payment Frequency <TooltipIcon content="How often you'll make payments." />
                </label>
                <select
                  value={paymentFrequency}
                  onChange={(e) => setPaymentFrequency(Number(e.target.value))}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                >
                  <option value={1}>Monthly</option>
                  <option value={2}>Bi-Weekly</option>
                  <option value={4}>Weekly</option>
                </select>
              </div>
              <div>
                <label className="font-semibold">
                  Mortgage Term <TooltipIcon content="Length of fixed rate agreement." />
                </label>
                <select
                  value={mortgageTerm}
                  onChange={(e) => setMortgageTerm(Number(e.target.value))}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                >
                  {[1, 2, 3, 4, 5].map((year) => (
                    <option key={year} value={year}>
                      {year} Year
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-gray-50 rounded-md px-6 py-4 flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Total mortgage amount:</p>
                <p className="text-lg font-semibold text-gray-800">${formatNumberWithCommas(totalMortgageAmount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Payment:</p>
                <p className="text-lg font-semibold text-gray-800">${formatNumberWithCommas(monthlyPayment)}</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <TermSummary
              mortgageTerm={mortgageTerm}
              principalPaid={principalPaid}
              interestPaid={interestPaid}
              totalPaid={totalPaid}
              remainingBalance={remainingBalance}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgagePayCalc;
