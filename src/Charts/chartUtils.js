import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const COLORS = {
  primary: "#4db8ff",
  average: "#ff4d4d",
  grid: "#ccc",
};

export const barOptions = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: { size: 18 },
        color: "black",
      },
    },
    tooltip: {
      titleColor: "black",
      bodyColor: "black",
    },
  },
  scales: {
    x: {
      ticks: {
        font: { size: 16 },
        color: "black",
        maxRotation: 0,
        minRotation: 0,
        autoSkip: false,
      },
    },
    y: {
      ticks: {
        font: { size: 16 },
        color: "black",
      },
    },
  },
};

export const scatterOptions = {
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "linear",
      min: 0,
      max: 6,
      ticks: {
        callback: (v) =>
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][v] || "",
        color: "black",
      },
      grid: {
        color: COLORS.grid,
      },
    },
    y: {
      ticks: { color: "black" },
      grid: {
        color: COLORS.grid,
      },
    },
  },
  plugins: {
    legend: {
      labels: { color: "black" },
    },
  },
};
