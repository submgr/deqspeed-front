var dashboardChart = document.getElementById('dashboard-chart')

var dashboardChart = new Chart(dashboardChart, {
    type: 'bar',
    data: {
      labels: ["2010", "2015", "2020",],
      datasets: [
        {
          label: "iOS",
          backgroundColor: "#A0D468",
          data: [900,1000,1150]
        }, {
          label: "Android",
          backgroundColor: "#4A89DC",
          data: [890,950,1100]
        }
      ]
    },
    options: {
        responsive: true, maintainAspectRatio:false,
        legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
        title: {display: false}
    }
});	
    
