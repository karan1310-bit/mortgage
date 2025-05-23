import PieChart from './DoughnutChart';

const TermSummary = ({ mortgageTerm, principalPaid, interestPaid, totalPaid, remainingBalance }) => {
  const formatNumberWithCommas = (number) =>
    number !== null && number !== undefined ? number.toLocaleString() : '-';

  return (
    <div className="flex flex-col items-start space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">Mortgage Term Summary</h3>
        <p className="text-sm text-gray-500">
          {remainingBalance ? `${mortgageTerm} year fixed (closed)` : null}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between w-full gap-6">
        <div className="w-full lg:w-1/2">
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between border-b pb-1">
              <span className="font-medium">Principal Paid</span>
              <span className="text-blue-600 font-semibold">${formatNumberWithCommas(principalPaid)}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="font-medium">+ Interest Paid</span>
              <span className="text-blue-600 font-semibold">${formatNumberWithCommas(interestPaid)}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="font-medium">= Total Paid</span>
              <span className="text-blue-600 font-semibold">${formatNumberWithCommas(totalPaid)}</span>
            </div>
            <div className="flex justify-between pt-2 mt-2 border-t">
              <span className="font-medium">Remaining Balance</span>
              <span className="text-blue-600 font-semibold">${formatNumberWithCommas(remainingBalance)}</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-[200px] h-[200px]">
            <PieChart totalPaid={totalPaid} remainingBalance={remainingBalance} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermSummary;
