import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketroutingModule } from './basketrouting.module';
import { BasketComponent } from './basket.component';
import { OrderTotalsComponent } from '../shared/order-totals/order-totals.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BasketComponent],
  imports: [
    CommonModule,
    BasketroutingModule,
    SharedModule
  ],
  exports: [CommonModule]
})
export class BasketModule { }
