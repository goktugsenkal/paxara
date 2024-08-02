import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { isPlatformBrowser } from '@angular/common';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Paxara';

  constructor(
    private basketService: BasketService,
    private accountService: AccountService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadBasket(){
    if (isPlatformBrowser(this.platformId)) {
      const basketId = localStorage.getItem('basket_id');
      if (basketId) this.basketService.getBasket(basketId);
    }
  }

  loadCurrentUser() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.accountService.loadCurrentUser(token).subscribe();
      }
    }
  }
}
