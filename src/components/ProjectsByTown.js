import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js';
import AWS from 'aws-sdk';

Chart.register(
  require('chart.js').elements.ArcElement,
  require('chart.js').controllers.DoughnutController,
  require('chart.js').plugins.Legend,
  require('chart.js').plugins.Title
);

function ProjectsByTown({ data }) {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartContainer.current, {
        type: 'doughnut',
        data: data,
        options: {},
      });
    }

    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="chart">
      <canvas ref={chartContainer} />
    </div>
  );
}

export default ProjectsByTown;
