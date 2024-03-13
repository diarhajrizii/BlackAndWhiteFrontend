const fetchSalesData = async (years, type) => {
  try {
    const response = await fetch("/api/v1/transactions/years", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ years, type }),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data;
    } else {
      throw new Error("Failed to fetch sales data");
    }
  } catch (error) {
    console.error("Error fetching sales data:", error);
  }
};

// chartExample1 and chartExample2 options
let chart1_2_options = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: {
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: "rgba(29,140,248,0.0)",
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 60,
        suggestedMax: 125,
        padding: 20,
        fontColor: "#9a9a9a",
      },
    },
    xAxes: {
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: "rgba(29,140,248,0.1)",
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#9a9a9a",
      },
    },
  },
};

let chartExample1 = {
  data1: async ({ canvas, type, years }) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    try {
      const salesData = await fetchSalesData(years, type);
      let datasets;
      if (salesData.length > 1) {
        datasets = salesData.map((data) => ({
          label: data.year.toString(),
          fill: true,

          backgroundColor: `rgba(${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, 0.4)`,
          borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, 1)`,
          borderWidth: 1,
          hoverBackgroundColor: `rgba(${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, 0.8)`,

          hoverBorderColor: `rgba(${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, 1)`,
          data: data.salesArray,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 10,
          pointRadius: 4,
          borderDash: [],
          borderDashOffset: 0.0,
        }));
      } else {
        datasets = [
          {
            label: salesData[0].year,
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: salesData[0].salesArray,
          },
        ];
      }
      return {
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
        datasets: datasets,
      };
    } catch (error) {
      console.log(error);
    }
  },
  options: chart1_2_options,
};

let chartExample2 = {
  data1: async ({ canvas, type, year }) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
    try {
      const [salesData] = await fetchSalesData(year, type);
      const totalQuantity = salesData.salesArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      console.log(totalQuantity); // This will output the sum of numbers in quantityArray

      return {
        totalQuantity,
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
        datasets: [
          {
            label: "2024",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: salesData.salesArray,
          },
        ],
      };
    } catch (error) {
      console.log(error);
    }
  },
  data: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
      datasets: [
        {
          label: "Data",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [80, 100, 70, 80, 120, 80],
        },
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 20,
            suggestedMax: 90,
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
    },
  },
};

let chartExample3 = {
  data1: async ({ canvas, type, year }) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
    try {
      const [salesData] = await fetchSalesData(year, type);
      const totalQuantity = salesData.salesArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      console.log(totalQuantity); // This will output the sum of numbers in quantityArray

      return {
        totalQuantity,
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
        datasets: [
          {
            label: "2023",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: salesData.salesArray,
          },
        ],
      };
    } catch (error) {
      console.log(error);
    }
  },
  data: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
    gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

    return {
      labels: [
        "USA",
        "GER",
        "AUS",
        "UK",
        "RO",
        "BR",
        "UK",
        "RO",
        "BR",
        "UK",
        "RO",
        "BR",
      ],
      datasets: [
        {
          label: "2023",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#d048b6",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [53, 20, 10, 80, 100, 45, 80, 100, 45, 80, 100, 45],
        },
        {
          label: "2021",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#2bffc6",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [53, 20, 10, 80, 100, 45, 70, 100, 45, 80, 100, 45],
        },
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: {
        gridLines: {
          drawBorder: false,
          color: "rgba(225,78,202,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 120,
          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
      xAxes: {
        gridLines: {
          drawBorder: false,
          color: "rgba(225,78,202,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
    },
  },
};

const chartExample4 = {
  data: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
    gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
    gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

    return {
      labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
      datasets: [
        {
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#00d6b4",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#00d6b4",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#00d6b4",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [90, 27, 60, 12, 80],
        },
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },

    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 50,
          suggestedMax: 125,
          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
      xAxes: {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(0,242,195,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
    },
  },
};
let chartExample5 = {
  data: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
    gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); // purple colors

    return {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Monthly Data",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#d048b6",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [30, 45, 35, 60, 80, 55], // Example static data
        },
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 20,
            suggestedMax: 90,
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
    },
  },
};
// Chart Example 6
let chartExample6 = {
  data: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); // blue colors

    return {
      labels: ["A", "B", "C", "D", "E", "F"],
      datasets: [
        {
          label: "Dataset 1",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [25, 40, 30, 55, 75, 50], // Example static data
        },
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: { display: false },
    responsive: true,
    scales: {
      yAxes: [{ ticks: { suggestedMin: 20, suggestedMax: 80, padding: 20 } }],
      xAxes: [{ ticks: { padding: 20 } }],
    },
  },
};

// Chart Example 7
let chartExample7 = {
  data: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(255, 87, 34, 0.2)");
    gradientStroke.addColorStop(0.4, "rgba(255, 87, 34, 0.0)");
    gradientStroke.addColorStop(0, "rgba(255, 87, 34, 0)"); // orange colors

    return {
      labels: ["X", "Y", "Z", "W", "V", "U"],
      datasets: [
        {
          label: "Dataset 2",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#ff5722",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [50, 65, 45, 60, 80, 70], // Example static data
        },
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: { display: false },
    responsive: true,
    scales: {
      yAxes: [{ ticks: { suggestedMin: 40, suggestedMax: 90, padding: 20 } }],
      xAxes: [{ ticks: { padding: 20 } }],
    },
  },
};

// Chart Example 8
let chartExample8 = {
  data: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(0, 216, 255, 0.2)");
    gradientStroke.addColorStop(0.4, "rgba(0, 216, 255, 0.0)");
    gradientStroke.addColorStop(0, "rgba(0, 216, 255, 0)"); // cyan colors

    return {
      labels: ["P", "Q", "R", "S", "T", "U"],
      datasets: [
        {
          label: "Dataset 3",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#00d8ff",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [30, 45, 35, 60, 75, 50], // Example static data
        },
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: { display: false },
    responsive: true,
    scales: {
      yAxes: [{ ticks: { suggestedMin: 20, suggestedMax: 80, padding: 20 } }],
      xAxes: [{ ticks: { padding: 20 } }],
    },
  },
};

// Chart Example 9
let chartExample9 = {
  data: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(255, 193, 7, 0.2)");
    gradientStroke.addColorStop(0.4, "rgba(255, 193, 7, 0.0)");
    gradientStroke.addColorStop(0, "rgba(255, 193, 7, 0)"); // yellow colors

    return {
      labels: ["M", "N", "O", "P", "Q", "R"],
      datasets: [
        {
          label: "Dataset 4",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#ffc107",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [40, 55, 45, 70, 90, 80], // Example static data
        },
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: { display: false },
    responsive: true,
    scales: {
      yAxes: [{ ticks: { suggestedMin: 30, suggestedMax: 100, padding: 20 } }],
      xAxes: [{ ticks: { padding: 20 } }],
    },
  },
};

// Chart Example 10
let chartExample10 = {
  data: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(0, 75, 145, 0.2)");
    gradientStroke.addColorStop(0.4, "rgba(0, 75, 145, 0.0)");
    gradientStroke.addColorStop(0, "rgba(0, 75, 145, 0)"); // navy colors

    return {
      labels: ["G", "H", "I", "J", "K", "L"],
      datasets: [
        {
          label: "Dataset 5",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#004b91",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [25, 40, 30, 55, 75, 50], // Example static data
        },
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: { display: false },
    responsive: true,
    scales: {
      yAxes: [{ ticks: { suggestedMin: 20, suggestedMax: 80, padding: 20 } }],
      xAxes: [{ ticks: { padding: 20 } }],
    },
  },
};
let chartExample11 = {
  data: {
    labels: ["P", "Q", "R", "S", "T", "U"],
    datasets: [
      {
        data: [30, 45, 35, 60, 75, 50], // Example static data
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
          "#ff8c00",
        ],
        hoverBackgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
          "#ff8c00",
        ],
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
  },
};
let chartExample12 = {
  data: {
    datasets: [
      {
        label: "Bubble Dataset",
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Red color
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: [
          { x: 20, y: 30, r: 15 }, // Example static data
          { x: 40, y: 10, r: 20 },
          { x: 30, y: 25, r: 10 },
        ],
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: { beginAtZero: true },
      x: { beginAtZero: true },
    },
  },
};
// Chart Example 7 (Doughnut Chart)
let chartExample13 = {
  data: {
    labels: ["X", "Y", "Z", "W", "V", "U"],
    datasets: [
      {
        data: [50, 65, 45, 60, 80, 70], // Example static data
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
          "#ff8c00",
        ],
        hoverBackgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
          "#ff8c00",
        ],
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
  },
};

// Chart Example 8 (Polar Area Chart)
let chartExample14 = {
  data: {
    labels: ["P", "Q", "R", "S", "T", "U"],
    datasets: [
      {
        data: [30, 45, 35, 60, 75, 50], // Example static data
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
          "#ff8c00",
        ],
        hoverBackgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
          "#ff8c00",
        ],
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
  },
};

// Chart Example 9 (Radar Chart)
let chartExample15 = {
  data: {
    labels: ["M", "N", "O", "P", "Q", "R"],
    datasets: [
      {
        label: "Radar Dataset",
        fill: true,
        backgroundColor: "rgba(255, 193, 7, 0.2)", // Yellow color
        borderColor: "#ffc107",
        pointBackgroundColor: "#ffc107",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#ffc107",
        data: [40, 55, 45, 70, 90, 80], // Example static data
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
  },
};
// Chart Example 11 (Horizontal Bar Chart)
let chartExample16 = {
  data: {
    labels: [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
      "Category 5",
    ],
    datasets: [
      {
        label: "Horizontal Bar Dataset",
        backgroundColor: "#4caf50", // Green color
        borderColor: "#4caf50",
        borderWidth: 1,
        hoverBackgroundColor: "#4caf50",
        hoverBorderColor: "#4caf50",
        data: [45, 30, 55, 20, 65], // Example static data
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
};
// Chart Example 11 (Doughnut Chart)
let chartExample17 = {
  data: {
    labels: [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
      "Category 5",
    ],
    datasets: [
      {
        data: [25, 20, 15, 10, 30], // Example static data
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4caf50",
          "#2196f3",
        ], // Different colors for each segment
        hoverBackgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4caf50",
          "#2196f3",
        ],
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    cutout: "70%", // Adjust the cutout percentage as needed
  },
};
// Chart Example 12 (Radar Chart)
let chartExample18 = {
  data: {
    labels: [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
      "Category 5",
    ],
    datasets: [
      {
        label: "Dataset 1",
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
        data: [70, 60, 80, 50, 75],
      },
      {
        label: "Dataset 2",
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        pointBackgroundColor: "rgb(75, 192, 192)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(75, 192, 192)",
        data: [50, 70, 60, 80, 65],
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    scale: {
      ticks: { beginAtZero: true },
    },
  },
};
// Chart Example 13 (Bubble Chart)
let chartExample19 = {
  data1: async (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    try {
      const salesData = await fetchSalesData(); // Assuming fetchSalesData is an asynchronous function
      const salePrices = salesData.map((sale) => parseFloat(sale.sale_price));
      console.log(salePrices);

      return {
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
        datasets: [
          {
            label: "My First dataset",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: salePrices,
          },
        ],
      };
    } catch (error) {
      console.log(error);
    }
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: { type: "linear", position: "bottom" },
      y: { min: 0, max: 50 },
    },
  },
};
// Chart Example 14 (Doughnut Chart)
let chartExample20 = {
  data: {
    labels: ["Red", "Blue", "Yellow", "Green"],
    datasets: [
      {
        data: [300, 50, 100, 40],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#2ECC71"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#2ECC71"],
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
  },
};

let chartExample21 = {
  data1: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      datasets: [
        {
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
        },
      ],
    };
  },

  data2: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      datasets: [
        {
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
        },
      ],
    };
  },
  data3: (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      datasets: [
        {
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
        },
      ],
    };
  },
  options: chart1_2_options,
};

module.exports = {
  chartExample1, // in src/views/Dashboard.js
  chartExample2, // in src/views/Dashboard.js
  chartExample3, // in src/views/Dashboard.js
  chartExample4, // in src/views/Dashboard.js
  chartExample5,
  chartExample6,
  chartExample7,
  chartExample8,
  chartExample9,
  chartExample10,
  chartExample11,
  chartExample12,
  chartExample13,
  chartExample14,
  chartExample15,
  chartExample16,
  chartExample17,
  chartExample18,
  chartExample19,
  chartExample20,
  chartExample21,
};
