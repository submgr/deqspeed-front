var walletChart = document.getElementById('wallet-chart')

var walletDemoChart = new Chart(walletChart, {
    type: 'bar',
    data: {
      labels: ["Jun", "Jul", "Aug"],
      datasets: [
        {
          label: "Expenses",
          backgroundColor: "#ED5565",
          data: [100,100,130]
        }, {
          label: "Income",
          backgroundColor: "#A0D468",
          data: [170,145,165]
        }, {
          label: "Subscriptions",
          backgroundColor: "#4A89DC",
          data: [71,50,70]
        }
      ]
    },
    options: {
        responsive: true, maintainAspectRatio:false,
        legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
        title: {display: false}
    }
});	
    
