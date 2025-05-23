import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ totalPaid, remainingBalance }) => {
  const [mortgageData, setMortgageData] = useState({
    labels: ['Interest/Principal', 'Remaining Balance'],
    datasets: [
      {
        label: 'Amount',
        data: [totalPaid, remainingBalance],
        backgroundColor: ['#c5c5c5', '#0077b6'],
        borderColor: 'white',
      },
    ],
    borderWidth: 1,
  });

  useEffect(() => {
    setMortgageData((prev) => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0],
          data: [totalPaid, remainingBalance],
        },
      ],
    }));
  }, [totalPaid, remainingBalance]);

  return (
    <div className='container mx-auto w-100' style={{ width: '300px', height: '300px' }}>
      <Doughnut data={mortgageData} options={{ maintainAspectRatio: false, responsive: true }} />
    </div>
  );
};

export default PieChart;
