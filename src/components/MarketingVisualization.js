import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js';
import AWS from 'aws-sdk';
Chart.register(
  require('chart.js').elements.ArcElement,
  require('chart.js').controllers.PieController,
  require('chart.js').plugins.Legend,
  require('chart.js').plugins.Title
);

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [{
    label: 'Sample Data',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
};

function Marketing() {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartContainer.current, {
        type: 'pie',
        data: data,
        options: {},
      });
    }
  }, [data]);

  return (
    <div className="chart">
      <canvas ref={chartContainer} />
    </div>
  );
}

export default Marketing;
