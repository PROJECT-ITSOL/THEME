import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/authentication.service';
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
  months: string[] = []
  dataComment: number[] = []
  years: number[] = []
  monthNow: number=0
  totalCategory:number=0
  colors = [
    '#1FDECF',
    '#1FC6DE',
    '#1FDE3A',
    '#1FDE56',
    '#F0845F',
    '#F05F71',
  ];
  // LineChart
  chartData = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: this.colors[1],
        opacity: 0.5,
        borderColor: this.colors[0],
        borderWidth: 4,
        pointBackgroundColor: this.colors[0],
      },
    ],
  };

  constructor(private service: AuthenticationService) { }

  ngOnInit(): void {
    this.getTotalCategory()
    this.getStatistical()
  }

  paintChart() {
    var myChart = document.getElementById('myAreaChart');
    var paint = new Chart(myChart, {
      type: 'line',
      data: this.chartData,
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
    })

    // update data
    // debugger
    paint.data.datasets[0].data=[]
    this.dataComment.forEach(e => {
      paint.data.datasets[0].data.push(e)
    })
    paint.update()

    paint.data.labels=[]
    this.months.forEach(e => {
      paint.data.labels.push(e)
    })
    paint.update()

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
          backgroundColor: this.colors.slice(0, 3),
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

  getStatistical() {
    let url = '/api/comment/statistical'
    // this.years=new 
    this.service.getStatisticalNoParam(url).subscribe(
      res => {
        let list = new Array()
        list = res['data']['data']
        this.monthNow=res['data']['monthNow']
        this.months = res['data']['months']
        this.years = res['data']['years']
        list.forEach(data => {
          this.dataComment.push(data)
        })
        this.paintChart()
      }
    )

  }
  setYears(event, year: number) {
    event.preventDefault()
    let url = "/api/comment/statistical"
    const param = new HttpParams().append("year", year.toString())
    this.service.getStatistical(url, param).subscribe(
      res => {
        let list = new Array()
        this.dataComment=[]
        list = res['data']['data']
        list.forEach(e=>{
          this.dataComment.push(e)
        })
        this.paintChart()
        console.log(list)
      }
    )
  }

  getTotalCategory(){
    let url="/api/category/total"
    this.service.getTotalCategory(url).subscribe(
      res=>{
        this.totalCategory=res['data']
      }
    )
  }
}
