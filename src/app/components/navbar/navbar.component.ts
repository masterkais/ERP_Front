import { Location } from "@angular/common";
import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "app/shared/models/user.module";
import { AuthentificationServiceService } from "app/shared/services/authentification-service.service";
import { BasketService } from "app/shared/services/Basket.service";
import { CaddyService } from "app/shared/services/caddy.service";
import { StatistiqueService } from "app/shared/services/statistique.service";
import { UserService } from "app/shared/services/user.service";
import { ROUTES } from "../sidebar/sidebar.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  user: User;
  numberRequestTransfert: number;
  sideNav: boolean = true;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private authService: AuthentificationServiceService,
    private userService: UserService,
    public caddyService: CaddyService,
    public basketService: BasketService,
    private stistiqueService: StatistiqueService
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  async ngOnInit() {
    if (this.authService.isLogged)
      this.caddyService.loadCaddyFromLocalStorage();
    this.basketService.loadBasketFromLocalStorage();
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
    await this.stistiqueService.getNumberOfProductEnAtente().then((data) => {
      this.numberRequestTransfert = data;
    });
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName("body")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);

    body.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const body = document.getElementsByTagName("body")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    body.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName("body")[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove("nav-open");
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove("toggled");
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add("toggled");
      }, 430);

      var $layer = document.createElement("div");
      $layer.setAttribute("class", "close-layer");

      if (body.querySelectorAll(".main-panel")) {
        document.getElementsByClassName("main-panel")[0].appendChild($layer);
      } else if (body.classList.contains("off-canvas-sidebar")) {
        document
          .getElementsByClassName("wrapper-full-page")[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add("visible");
      }, 100);

      $layer.onclick = function () {
        //asign a function
        body.classList.remove("nav-open");
        this.mobile_menu_visible = 0;
        $layer.classList.remove("visible");
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove("toggled");
        }, 400);
      }.bind(this);

      body.classList.add("nav-open");
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl("user/login");
  }
  goProfile() {
    this.userService.getCurrentUser().subscribe((data) => {
      this.router.navigateByUrl("user/profile/" + data.id);
    });
  }
  onRedirectRequest() {
    this.router.navigateByUrl("/myRequestTransfert");
  }
  webSide() {
    const sidenav = document
      .getElementsByClassName("sidebar")
      .item(0) as HTMLElement;
    const content = document
      .getElementsByClassName("main-panel")
      .item(0) as HTMLElement;
    const MainContent = document
      .getElementsByClassName("main-content")
      .item(0) as HTMLElement;
    if ($(window).width() > 991) {
      if (this.sideNav) {
        sidenav.style.display = "none";
        content.style.width = "calc(100% - 0px)";
        this.sideNav = false;
      } else {
        sidenav.style.display = "block";
        content.style.width = "calc(100% - 260px)";
        this.sideNav = true;
      }
    }
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
};
}