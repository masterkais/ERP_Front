import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "app/shared/models/category.model";
import { EntryVoucher } from "app/shared/models/entryVoucher.model";
import { LineRequestTransfert } from "app/shared/models/lineRequestTransfert.model";
import { LineRequestTransfertDetail } from "app/shared/models/lineRequestTransfertDetail.model";
import { Product } from "app/shared/models/product.model";
import { RequestTransfert } from "app/shared/models/requestTransfert.model";
import { SiteStock } from "app/shared/models/siteStock.model";
import { User } from "app/shared/models/user.module";
import { CategoryService } from "app/shared/services/category.service";
import { DialogService } from "app/shared/services/dialog.service";
import { EntryVoucherService } from "app/shared/services/entryVoucher.model";
import { LineRequestTransfertService } from "app/shared/services/lineRequestTransfert.service";
import { ProductService } from "app/shared/services/product.service";
import { RequestTransfertService } from "app/shared/services/requestransfert.service";
import { SiteStockService } from "app/shared/services/siteStock.service";
import { UserService } from "app/shared/services/user.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: "line-request-transfert-entry",
  templateUrl: "./line-request-transfert-entry.component.html",
  styleUrls: ["./line-request-transfert-entry.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class LineRequestTransfertEntryComponent implements OnInit {
  lineFormGroup?: FormGroup;
  groups = new FormControl();
  submitted: boolean = false;
  data: any[] = [];
  displayedColumns: string[] = [
    "requestTransfertId",
    "categoryid",
    "quantity",
    "state",
    "action",
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<LineRequestTransfert>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listRequestTransfert: RequestTransfert[];
  siteSource;
  siteDestination;
  requestTransfertList: RequestTransfert[];
  user: User;
  linesTransfert: LineRequestTransfert[] = [];
  lineTransfert: LineRequestTransfert;
  idRequest: number;
  requestTransfert: RequestTransfert;
  idLineTransfert;
  ids: any[] = [];
  products: any[] = [];
  maxQuantity: number;
  isFull: boolean = false;
  category: Category;
  siteStockSource: SiteStock;
  transerts: Array<{
    lt: LineRequestTransfert;
    ltds: LineRequestTransfertDetail[];
  }> = [];
  qte: number;
  entryVoucher: EntryVoucher;
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private dialogService: DialogService,
    private toast: NgToastService,
    private siteStockService: SiteStockService,
    private productService: ProductService,
    private requestTransfertService: RequestTransfertService,
    private userService: UserService,
    private lineRequestService: LineRequestTransfertService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private lineDetailTransfertService: LineRequestTransfertService,
    private entryVoucherService: EntryVoucherService
  ) {
    this.idRequest = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getAllLineRequestTransfert();
    this.getRequestTransfert();
    this.lineFormGroup = this.formBuilder.group({
      quantity: ["", Validators.compose([Validators.required])],
      products: ["", Validators.compose([Validators.required])],
    });
  }
  async getRequestTransfert() {
    await this.requestTransfertService
      .getRequestTransfertByIdWithPromise(this.idRequest)
      .then((data) => {
        this.requestTransfert = data;
      });
  }
  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  getValues(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.ids.push({ id: event.source.value });
        console.log("add" + event.source.value);
      } else {
        this.removeProduct(event.source.value);
        console.log("remove" + event.source.value);
      }
      if (this.ids.length == this.maxQuantity) {
        this.isFull = true;
      } else {
        this.isFull = false;
      }
    }
  }
  removeProduct(id: number): void {
    this.ids = this.ids.filter(({ id }) => id !== id);
  }

  async getAllLineRequestTransfert() {
    await this.lineRequestService
      .getAllLineRequestTransfertByIdRequestV2(this.idRequest)
      .then((data) => {
        data.forEach((d) => {
          if (d.state == 3 || d.state == 4) {
            this.linesTransfert.push(d);
          }
        });
        this.dataSource = new MatTableDataSource(this.linesTransfert);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    await this.getAllLineDetails();
  }
  async getAllLineDetails() {
    await this.linesTransfert.forEach(async (data) => {
      await this.lineDetailTransfertService
        .findAllTransfertLineDetaiByIdLineTransfertV2(data.id)
        .then((ld) => {
          let tld: any = { lt: data, ltds: ld };
          this.transerts.push(tld);
        });
    });
  }
  async onClick(line: LineRequestTransfert) {
    this.products = [];
    await this.getAllProductByLinetransfert(line);
    this.lineTransfert = line;
    this.idLineTransfert = line.id;
    if (line.quantity <= this.products.length) {
      this.maxQuantity = line.quantity;
    } else {
      this.maxQuantity = this.products.length;
    }
  }
  async getAllProductByLinetransfert(line) {
    await this.transerts.forEach(async (data) => {
      let i: 0;
      if (data.lt.id == line.id) {
        await data.ltds.forEach((d) => {
          i += 1;
          console.log(i);
          this.products.push(d.product);
        });
      }
    });
  }
  async onAccept() {
    this.submitted = true;
    await this.accepter();
    this.toast.success({ detail: "Line a etait accepté !", duration: 5000 });
    this.router.navigateByUrl("/requestTransfertLines/" + this.idRequest);
    window.location.reload();
  }
  async accepter() {
    let idsProduct: number[] = [];
    this.ids.forEach((id) => idsProduct.push(id.id));
    await this.lineRequestService
      .acceptLineRequestTransfertEntry(this.idLineTransfert, idsProduct)
      .then(() => {});
  }
  onReject(transferLine: LineRequestTransfert) {
    this.lineRequestService
      .rejectLineRequestTransfert(this.idLineTransfert)
      .subscribe(() => {
        this.toast.success({
          detail: "Line a etait accepté !",
          duration: 5000,
        });
      });
  }
  onGenereEntryVoucher() {
    window.open(
      "http://localhost:4200/#/requestTransfert/entryVoucher/" + this.idRequest
    );
    window.close();
  }
  async createEntryVoucher() {
    await this.entryVoucherService
      .onNewEntryVoucher(this.idRequest)
      .then((data) => {
        this.entryVoucher = data;
      });
  }
  onReset() {
    this.products = [];
  }
}
