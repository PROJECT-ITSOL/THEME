import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Chart } from '../../../node_modules/chart.js';
import { draw, generate } from 'patternomaly';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    var colors = [
      '#1FDECF',
      '#1FC6DE',
      '#1FDE3A',
      '#1FDE56',
      '#F0845F',
      '#F05F71',
    ];
    // LineChart
    var chartData = {
      labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      datasets: [
        {
          data: [589, 445, 483, 503, 689, 692, 634],
          backgroundColor: colors[1],
          opacity:0.5,
          borderColor: colors[0],
          borderWidth: 4,
          pointBackgroundColor: colors[0],
        },
      ],
    };
    var myChart = document.getElementById('myAreaChart');
    if (myChart) {
      new Chart(myChart, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: 'transparent',
                  zeroLineColor: 'transparent',
                },
                
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                },
              },
            ],
          },

          legend: {
            display: false,
          },
        },
      });
    }

    //test
    var colors = [
      '#1FDECF',
      '#1FC6DE',
      '#1FDE3A',
      '#1FDE56',
      '#F0845F',
      '#F05F71',
    ];
    // LineChart
    var chartData = {
      labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      datasets: [
        {
          data: [589, 445, 483, 503, 689, 692, 634],
          backgroundColor:'#FBFBEF' ,
          opacity:0.5,
          borderColor: colors[0],
          borderWidth: 4,
          pointBackgroundColor: colors[0],
        },
        {
          data: [111, 222, 333, 444, 89, 555, 455],
          backgroundColor: colors[1],
          opacity:0.5,
          borderColor: colors[0],
          borderWidth: 4,
          pointBackgroundColor: colors[0],
        },
      ],
    };
    var myChart = document.getElementById('new');
    if (myChart) {
      new Chart(myChart, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: 'transparent',
                  zeroLineColor: 'transparent',
                },
                
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                },
              },
            ],
          },

          legend: {
            display: false,
          },
        },
      });
    }


    // Pie Chart

    var donutOptions = {
      cutoutPercentage: 70,
      legend: {
        position: 'bottom',
        labels: { pointStyle: 'circle', usePointStyle: true },
      },
    };
    var chartPieData = {
      labels: ['Bootstrap', 'Popper', 'Other'],
      datasets: [
        {
          backgroundColor: colors.slice(0, 3),
          borderWidth: 0,
          data: [74, 11, 40],
        },
      ],
    };

    var chartPie = document.getElementById('myPieChart');
    if (chartPie) {
      new Chart(chartPie, {
        type: 'pie',
        data: chartPieData,
        options: donutOptions,
      });
    }
  }
}
