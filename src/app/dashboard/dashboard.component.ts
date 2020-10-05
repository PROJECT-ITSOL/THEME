import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Chart } from '../../../node_modules/chart.js';
import { draw, generate } from 'patternomaly';
import { BillImportService } from '../service/billImport.service';
import { ProductOrderService } from '../service/productOrder.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  months: string[] = []
  dataComment: number[] = []
  years: number[] = []
  monthNow: number = 0
  totalCategory: number = 0
  // bill import
  listTotalMoneyBillImport: Array<any>;
  listTotalproductBillImport: Array<any>;
  listTotalBillImport: Array<number>;
  dataBillImport: Array<any>;
  // order
  listTotalOrder: Array<any>;
  listTotalMoneyOrder: Array<any>;
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

  constructor(private service: AuthenticationService,
    private billImportService: BillImportService,
    private productOrderService: ProductOrderService,) {
    this.getDataBimmImport();
    this.refreshData();

    this.getDataOrder();
    this.refreshDataOrder();
  }

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
    paint.data.datasets[0].data = []
    this.dataComment.forEach(e => {
      paint.data.datasets[0].data.push(e)
    })
    paint.update()

    paint.data.labels = []
    this.months.forEach(e => {
      paint.data.labels.push(e)
    })
    paint.update()
  }





  getStatistical() {
    let url = '/api/comment/statistical'
    // this.years=new 
    this.service.getStatisticalNoParam(url).subscribe(
      res => {
        let list = new Array()
        list = res['data']['data']
        this.monthNow = res['data']['monthNow']
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
        this.dataComment = []
        list = res['data']['data']
        list.forEach(e => {
          this.dataComment.push(e)
        })
        this.paintChart()
        console.log(list)
      }
    )
  }

  getTotalCategory() {
    let url = "/api/category/total"
    this.service.getTotalCategory(url).subscribe(
      res => {
        this.totalCategory = res['data']
      }
    )
  }


  //BillImport
  async getDataBimmImport() {
    this.listTotalBillImport = new Array();
    this.listTotalMoneyBillImport = new Array();
<<<<<<< HEAD
    this.listTotalproductBillImport= new Array();
      this.billImportService.getData(this.year).subscribe(res=>{
        this.dataBillImport=res  as Object[];
        //console.log(res);
        this.dataBillImport.forEach(element => {
          let i:number = element['totalBill'];  
          this.listTotalBillImport.push(i);
          let k:number = element['totalProduct'];
          this.listTotalproductBillImport.push(k);
          let l:number = element['totalMoney'];
          this.listTotalMoneyBillImport.push(l);
        });
       
      });    
=======
    this.listTotalproductBillImport = new Array();
    this.billImportService.getData(this.year).subscribe(res => {
      this.dataBillImport = res as Object[];
      //console.log(res);
      this.dataBillImport.forEach(element => {
        let i: number = element['totalBill'];
        this.listTotalBillImport.push(i);
        let k: number = element['totalProduct'];
        this.listTotalproductBillImport.push(k);
        let l: number = element['totalMoney'];
        this.listTotalMoneyBillImport.push(l);
      });
      console.log(this.listTotalBillImport);
    });
>>>>>>> 34cd68761198c66d8ae2250cc84ea1037e8caaeb
  }

  listYear = [2020, 2019, 2018];
  year: number = 2020;
  lineChartData: ChartDataSets[] = [
    { data: [], label: ' Total Bill' },
  ];
  lineChartData1: ChartDataSets[] = [
    { data: [], label: ' Total Product' },
  ];
  lineChartData2: ChartDataSets[] = [
    { data: [], label: ' Total Money' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  lineChartOptions: ChartOptions = {
    responsive: true
  };
  lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    }
  ];
  lineChartColors1: Color[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.2)',
      borderColor: 'red',
    }
  ];
  lineChartColors2: Color[] = [
    { // red
      backgroundColor: 'rgba(0, 255, 0, 0.2)',
      borderColor: 'green',
    }
  ];
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [];

  refreshData() {
    this.lineChartData[0].data = this.listTotalBillImport;
    this.lineChartData1[0].data = this.listTotalproductBillImport;
    this.lineChartData2[0].data = this.listTotalMoneyBillImport;
  }

  setYear(event) {
    this.year = event.target.value;
    this.getDataBimmImport();
    this.refreshData();
  }
  //End bill import


  // order
  async getDataOrder() {
    this.listTotalOrder = new Array();
    this.listTotalMoneyOrder = new Array();
    //this.listTotalproductBillImport= new Array();
    this.productOrderService.getDataOrder(9).subscribe(res => {
      this.dataBillImport = res as Object[];
      console.log(res);
      this.dataBillImport.forEach(element => {
        let i: number = element['totalOrder'];
        this.listTotalOrder.push(i);
        let l: number = element['totalMoney'];
        this.listTotalMoneyOrder.push(l);
      });
      console.log(this.listTotalOrder);
    });
  }

  lineChartDataOrder: ChartDataSets[] = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: ' Total order' },
  ];


  lineChartData2Order: ChartDataSets[] = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: ' Total Money' },
  ];

  lineChartLabelsOrder: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  lineChartOptionsOrder: ChartOptions = {
    responsive: true
  };
  lineChartColorsOrder: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(255, 0, 52, 0.6))',
      borderColor: 'rgba(255, 0, 52, 0.6)',
    }
  ];
  lineChartLegendOrder = true;
  lineChartTypeOrder = 'line';
  lineChartPluginsOrder = [];

  refreshDataOrder() {
    this.lineChartDataOrder[0].data = this.listTotalOrder;
    this.lineChartData2Order[0].data = this.listTotalMoneyOrder;
  }



}
