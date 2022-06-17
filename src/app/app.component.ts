import { Component} from '@angular/core';
import { BasketService } from './shared/services/Basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public basketService:BasketService){
    this.basketService.loadBasketFromLocalStorage()
  }
}
