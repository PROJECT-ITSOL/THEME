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
 
// bill import
listTotalMoneyBillImport:Array<any>;
listTotalproductBillImport:Array<any>;
listTotalBillImport:Array<number>;
dataBillImport:Array<any>;
// order
listTotalOrder: Array<any>;
listTotalMoneyOrder: Array<any>;
  constructor(  private billImportService:BillImportService,
                private productOrderService:ProductOrderService,
      ) {
    this.getDataBimmImport();
    this.refreshData();

    this.getDataOrder();
    this.refreshDataOrder();
  }

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
  
  
  //BillImport
  async getDataBimmImport(){
    this.listTotalBillImport = new Array();
    this.listTotalMoneyBillImport = new Array();
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
  }
  
  listYear = [2020,2019,2018];
  year:number=2020;
  lineChartData: ChartDataSets[] = [
    { data:  [], label: ' Total Bill' },
  ];
  lineChartData1: ChartDataSets[] = [
    { data:  [], label: ' Total Product' },
  ];
  lineChartData2: ChartDataSets[] = [
    { data:  [], label: ' Total Money' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July','Aug','Sep','Oct','Nov','Dec'];
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

  setYear(event){
    this.year=event.target.value;
    this.getDataBimmImport();
    this.refreshData();
  }
  //End bill import

  
  // order
  async getDataOrder(){
    this.listTotalOrder = new Array();
    this.listTotalMoneyOrder = new Array();
    //this.listTotalproductBillImport= new Array();
      this.productOrderService.getDataOrder(9).subscribe(res=>{
        this.dataBillImport=res  as Object[];
        console.log(res);
        this.dataBillImport.forEach(element => {
          let i:number = element['totalOrder'];  
          this.listTotalOrder.push(i);
          // let k:number = element['totalProduct'];
          // this.listTotalproductBillImport.push(k);
          let l:number = element['totalMoney'];
          this.listTotalMoneyOrder.push(l);
        });
        console.log(this.listTotalOrder);
      });    
  }
  
  lineChartDataOrder: ChartDataSets[] = [
    { data:  [28, 48, 40, 19, 86, 27, 90], label: ' Total order' },
  ];
  
  // lineChartData1: ChartDataSets[] = [
  //   { data:  [28, 48, 40, 19, 86, 27, 90], label: ' Total Product' },
  // ];
  
  lineChartData2Order: ChartDataSets[] = [
    { data:  [28, 48, 40, 19, 86, 27, 90], label: ' Total Money' },
  ];

  lineChartLabelsOrder: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July','Aug','Sep','Oct','Nov','Dec'];
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
    //this.lineChartData1[0].data = this.listTotalproductBillImport;
    this.lineChartData2Order[0].data = this.listTotalMoneyOrder;
  }


  
}
