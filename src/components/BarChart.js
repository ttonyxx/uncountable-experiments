import { useEffect, useState, useMemo } from "react";
import { Chart } from "chart.js";

function BarChart({ id, label, inputs, color, reset }) {
  Chart.defaults.global.defaultFontColor = "#d3d3d3";

  const [chart, setChart] = useState();
  const chartId = useMemo(() => `chart-${id}`, [id])
  const bgColor = useMemo(() => color.substring(0, color.length - 1) + ", 0.5)", [color])

  useEffect(() => {
    if (reset) resetCanvas();
    var ctx = document.getElementById(chartId).getContext("2d");
    if (chart) chart.destroy();
    setChart(
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(inputs),
          datasets: [
            {
              label,
              data: Object.values(inputs),
              borderColor: color,
              backgroundColor: bgColor,
              borderWidth: 2,
            },
          ],
        },
      })
    );
  }, [inputs]);

  /** Resets canvas to fix bug of rendering two graphs at once. */
  function resetCanvas() {
    const el = document.getElementById(chartId)
    el.remove()
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", chartId);
    document.getElementById(`${chartId}-container`).appendChild(canvas);
  }

  return (
    <div className="w-[600px] flex mx-auto my-auto">
      <div
        id={`${chartId}-container`}
        className="border border-gray-400 pt-0 rounded-xl w-full my-auto shadow-xl"
      >
        <canvas id={chartId}></canvas>
      </div>
    </div>
  );
}

export default BarChart;
