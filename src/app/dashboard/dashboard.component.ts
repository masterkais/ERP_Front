import { Component, OnInit, ViewChild } from "@angular/core";
import { SiteStock } from "app/shared/models/siteStock.model";
import { SiteStockService } from "app/shared/services/siteStock.service";
import { StatistiqueService } from "app/shared/services/statistique.service";
import * as Chartist from "chartist";
import { data } from "jquery";
import { GoogleChartInterface, GoogleChartType } from "ng2-google-charts";
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  numberClient;
  numberAdmin;
  numberUser;
  numberInvetary;
  numberPurshasing;
  numberVehicule;
  numberVehiculeDisponible;
  numberVehiculeNonDisponible;
  numberProduct;
  numberProductPromo;
  numberProductNonPromo;
  numberProductDisponible;
  numberProductNonDisponible;
  numberCaegorys;
  numberBrands;
  numberRequestAtente;
  numberRequestAccepted;
  NumberOfsalesOrder;
  getNumberOfsalesOrderByClient;
  getNumberOfsalesByPrchasingManager;
  numberOfRequestTransfertDelyvred;
  numberSiteStock;
  numberSiteStockDisponible;
  numberSieStockNonDisponible;
  numberRequest;
  numberDelivery;
  numberOfSalesByCurrentDay;
  totalVenteByCurrentDay;
  numberOfSalesByCurrentWeek;
  totalVenteByCurrentWeek;
   numberOfSalesByCurrentMonth;
  totalVenteByCurrentMonth;
  numberCategory;numberBrand;
  siteStocks: SiteStock[];
  numbers: number[];
  list = [[]];
  objets: Array<{ s: SiteStock; n: number }> = [];

  pieChart: GoogleChartInterface;
  S1: any = [];
  S2: any = [];
  PrStock: any = [];
  PrCategory: any = [];
  arr: any[];
  submit = false;
  constructor(
    public statistiqueService: StatistiqueService,
    private stockService: SiteStockService
  ) {}
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq2 = 0;
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = ["2017", "2018", "2019", "2020", "2021", "2022"];
  public barChartType = "bar";
  public barChartLegend = true;
  barChartData: any;

  // Pie
  public pieChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };
  doughnutChartDatasets: any = [];
  
  public pieChartData: ChartData<"pie", number[], string | string[]> = {
    labels: [["Download", "Sales"], ["In", "Store", "Sales"], "Mail Sales"],
    datasets: [
      {
        data: this.doughnutChartDatasets,
      },
    ],
  };
  public pieChartType: ChartType = "pie";
  
  async ngOnInit() {
    await this.statistiqueService.getTotalVenteBy6MonthS1().then((data) => {
      this.S1 = data;
    });
    await this.statistiqueService.getTotalVenteBy6MonthS2().then((data) => {
      this.S2 = data;
    });
    await this.statistiqueService.getNumberProductsByStockV2().then((data) => {
      this.PrStock = data;
      let arr = [];
      this.PrStock.forEach((element) => {
        this.arr = Object.keys(element).map(function (key) {
          console.log(key);
          console.log(element[key]);

          arr.push(element[key]);
          return arr;
        });
      });

      console.log(this.arr);
    });
    await this.statistiqueService
      .getNumberProductsByCategorieV2()
      .then((data) => {
        this.PrCategory = data;
        console.log(data);
      });
    this.barChartData = [
      { data: this.S1, label: "Series A" },
      { data: this.S2, label: "Series B" },
    ];
    this.doughnutChartDatasets = [1,2,3]
    console.log(this.pieChartData);
    console.log(this.pieChart2.dataTable);

    await this.statistiqueService.getNumberOfCategory().then((data)=>{
      this.numberCategory=data;
    })
    await this.statistiqueService.getNumberOfBrand().then((data)=>{
      this.numberBrand=data;
    })
    await this.stockService.getAllSiteStockV2().then((data)=>{
      this.siteStocks=data;
    });
    await this.statistiqueService.getNumberOfClient().then((data)=>{
      this.numberClient=data;
    });
    await this.statistiqueService.getNumberOfInvetoryManager().then((data)=>{
      this.numberInvetary=data;
    });
    await this.statistiqueService.getNumberOfPurchasingManager().then((data)=>{
      this.numberPurshasing=data;
    });
 
    await this.statistiqueService.getNumberOfClient().then((data)=>{
      this.numberClient=data;
    });
    await this.statistiqueService.getNumberOfProduct().then((data)=>{
      this.numberProduct=data;
    });
    await this.statistiqueService.getNumberOfProductActive().then((data)=>{
      this.numberProductDisponible=data;
    });
    await this.statistiqueService.getNumberOfProductNonActive().then((data)=>{
      this.numberProductNonDisponible=data;
    });
    await this.statistiqueService.getNumberOfProductPromo().then((data)=>{
      this.numberProductPromo=data;
    });
    await this.statistiqueService.getNumberOfProductNomPromo().then((data)=>{
      this.numberProductNonPromo=data;
    });
    await this.statistiqueService.getNumberOfNumberSiteStockDisponible().then((data)=>{
      this.numberSiteStockDisponible=data;
    });
    await this.statistiqueService.getNumberOfSiteStockNonDisponible().then((data)=>{
      this.numberSieStockNonDisponible=data;
    });
    await this.statistiqueService.getNumberOfRequestTransfertAccepted().then((data)=>{
      this.numberRequestAccepted=data;
    });
    await this.statistiqueService.getNumberOfRequestTransfertAttente().then((data)=>{
      this.numberRequestAtente=data;
    });
    await this.statistiqueService.getNumberOfRequestTransfertDelyvred().then((data)=>{
      this.numberOfRequestTransfertDelyvred=data;
    });
    await this.statistiqueService.getNumberOfsalesOrder().then((data)=>{
      this.NumberOfsalesOrder=data;
    });
    await this.statistiqueService.getNumberOfVehicule().then((data)=>{
      this.numberVehicule=data;
    });
    await this.statistiqueService.getNumberOfVehiculeDisponible().then((data)=>{
      this.numberVehiculeDisponible=data;
    });
    await this.statistiqueService.getNumberOfVehiculeNonDisponible().then((data)=>{
      this.numberVehiculeNonDisponible=data;
    });
    await this.statistiqueService.getNumberOfRequestTransfert().then((data)=>{
      this.numberRequest=data;
    });
    await this.statistiqueService.getNumberOfDelivery().then((data)=>{
      this.numberDelivery=data;
    });
    await this.statistiqueService.getNumberOfsalesOrder().then((data)=>{
      this.NumberOfsalesOrder=data;
    });
    await this.statistiqueService.getNumberOfsalesByCurrentDay().then((data)=>{
      this.numberOfSalesByCurrentDay=data;
    });
    await this.statistiqueService.getTotalVenteByCurrentDay().then((data)=>{
      this.totalVenteByCurrentDay=data;
    });
    await this.statistiqueService.getNumberOfsalesByCurrentWeek().then((data)=>{
      this.numberOfSalesByCurrentWeek=data;
    });
    await this.statistiqueService.getTotalVenteByCurrentWeek().then((data)=>{
      this.totalVenteByCurrentWeek=data;
    });   
    await this.statistiqueService.getNumberOfsalesByCurrentMonth().then((data)=>{
      this.numberOfSalesByCurrentMonth=data;
    });
    await this.statistiqueService.getTotalVenteByCurrentMonth().then((data)=>{
      this.totalVenteByCurrentMonth=data;
    }) ;

    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      series: [[12, 17, 7, 17, 23, 18, 38]],
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    var dailySalesChart = new Chartist.Line(
      "#dailySalesChart",
      dataDailySalesChart,
      optionsDailySalesChart
    );

    this.startAnimationForLineChart(dailySalesChart);

    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ["12p", "3p", "6p", "9p", "12p", "3a", "6a", "9a"],
      series: [[230, 750, 450, 300, 280, 240, 200, 190]],
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    var completedTasksChart = new Chartist.Line(
      "#completedTasksChart",
      dataCompletedTasksChart,
      optionsCompletedTasksChart
    );

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);
    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
    var datawebsiteViewsChart = {
      labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]],
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
    };
    var responsiveOptions: any[] = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            },
          },
        },
      ],
    ];
    var websiteViewsChart = new Chartist.Bar(
      "#websiteViewsChart",
      datawebsiteViewsChart,
      optionswebsiteViewsChart,
      responsiveOptions
    );

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }

 
  pieChart2: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    dataTable: [
      ["Student", "Marks"],
      ["A", 80],
      ["B", 90],
      ["C", 88],
    ],
    options: { title: "Student Marks" },
  };
  barChart: GoogleChartInterface = {
    chartType: GoogleChartType.BarChart,
    dataTable: [
      ["Student", "Marks"],
      ["A", 80],
      ["B", 90],
      ["C", 88],
    ],
    options: { title: "Student Marks" },
  };

  public GetDonuts(): Observable<any> {
    // return a bool, or even the calculated data.
    return of("some value");
  }
}