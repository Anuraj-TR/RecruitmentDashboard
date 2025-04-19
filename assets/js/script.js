const handleMobileMenus = () => {
  const hamburger = document.querySelector(".jsHamburger");
  const sidebar = document.querySelector(".jsSidebarMenu");
  const profileBtn = document.querySelector(".jsProfileBtn");
  const profileSidebar = document.querySelector(".jsProfileSidebar");

  const toggleSidebar = () => {
    hamburger.classList.toggle("is-active");
    sidebar.classList.toggle("is-active");
  };
  
  const toggleProfile = () => {
    profileBtn.classList.toggle("is-active");
    profileSidebar.classList.toggle("is-active");
  };

  // handle sidebar menu 
  const handleSidebarMenu = () => {
    if (!hamburger || !sidebar) return;
  
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent click from bubbling to document
      profileBtn.classList.remove("is-active");
      profileSidebar.classList.remove("is-active");
      toggleSidebar();
    });
  
    document.addEventListener("click", (e) => {
      if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove("is-active");
        sidebar.classList.remove("is-active");
      }
    });
  };
  
  // handle profile sidebar 
  const handleProfileSidebar = () => {
    if (!profileBtn || !profileSidebar) return;
  
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      hamburger.classList.remove("is-active");
      sidebar.classList.remove("is-active");
      toggleProfile();
    });
  
    document.addEventListener("click", (e) => {
      if (!profileSidebar.contains(e.target) && !profileBtn.contains(e.target)) {
        profileBtn.classList.remove("is-active");
        profileSidebar.classList.remove("is-active");
      }
    });
  };


  handleSidebarMenu();
  handleProfileSidebar();
}

// Statistics bar chart

let stackedChart = null;

const statisticsChart = () => {
  const statisticsCanvas = document
    .getElementById("jsStatisticsCanvas")
    .getContext("2d");
  
  if (stackedChart) {
    stackedChart.destroy();
  }

  stackedChart = new Chart(statisticsCanvas, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Stage 1",
          data: [50, 48, 45, 40, 42, 38, 39],
          width: 20,
          backgroundColor: "#f97316", // Orange
          barThickness: 20,
          borderRadius: 20,
        },
        {
          label: "Stage 2",
          data: [10, 12, 25, 20, 18, 30, 25],
          backgroundColor: "#facc15", // Yellow
          barThickness: 20,
          borderRadius: 20,
        },
        {
          label: "Stage 3",
          data: [20, 10, 18, 18, 30, 26, 28],
          backgroundColor: "#8b5cf6", // Purple
          barThickness: 20,
          borderRadius: 20,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            align: "start", // Helps align tick labels with bars
          },
          grid: {
            offset: false, // Align grid to start of bar
          },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
    },
  });
}

let linechart = null;
  
const applicationsLineChart = () => {
  const linechartCanvas = document
    .getElementById("jsApplicationsTimeCanvas")
    .getContext("2d");
  
  if (linechart) {
    linechart.destroy();
  }

  const gradient = linechartCanvas.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(249, 115, 22, 0.4)'); // Orange with opacity
  gradient.addColorStop(1, 'rgba(249, 115, 22, 0)');   // Transparent

  linechart = new Chart(linechartCanvas, {
    type: "line",
    data: {
      labels: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM"],
      datasets: [
        {
          label: "Usage",
          data: [50, 70, 65, 90, 60, 75, 80], // Adjusted to match 7 labels
          fill: true,
          backgroundColor: gradient,
          borderColor: "#f97316",
          pointBackgroundColor: "#f97316",
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            callback: (value) => value + "%",
          },
          grid: {
            color: "rgba(0,0,0,0.05)",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
}

window.addEventListener("DOMContentLoaded", () => {
  handleMobileMenus();
  statisticsChart();
  applicationsLineChart();
});

let prevWidth = window.innerWidth;
window.addEventListener("resize", () => {
  let currentWidth = window.innerWidth;
  if (currentWidth !== prevWidth) {
    prevWidth = currentWidth;
    setTimeout(() => {
      statisticsChart();
      applicationsLineChart();
    }, 300);
  }
});