import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Paxara';

  constructor(
    private basketService: BasketService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const basketId = localStorage.getItem('basket_id');
      if (basketId) this.basketService.getBasket(basketId);
    }
  }
}
