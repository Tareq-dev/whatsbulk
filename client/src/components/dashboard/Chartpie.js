import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

function ChartPie() {
    const chartRef = useRef(null);

    useEffect(() => {
      const ctx = chartRef.current.getContext("2d");
  
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
          datasets: [
            {
              data: [12, 19, 3, 5, 2],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#2ECC71", "#9B59B6"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#2ECC71", "#9B59B6"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }, []);
  
    return <canvas ref={chartRef} />;
}

export default ChartPie;
