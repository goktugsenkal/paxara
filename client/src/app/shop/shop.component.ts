import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/Models/products';
import { ShopService } from './shop.service';
import { Brand } from '../shared/Models/brand';
import { Type } from '../shared/Models/type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit{
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  brandIdSelected = 0;
  typeIdSelected = 0;
  sortSelected = "name";
  sortOptions = [
    {name: "Alfabetik", value: "name"},
    {name: "Fiyat: Artan", value: "priceAsc"},
    {name: "Fiyat: Azalan", value: "priceDesc"},
  ]

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(brandId?: number, typeId?: number) {
    this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected).subscribe({
      next: response => this.products = response.data,
      error: () => console.log()
    })
  }
  getBrands() {
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{id: 0, name: "All"}, ...response],
      error: () => console.log()
    })
  }
  getTypes() {
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{id: 0, name: "All"}, ...response],
      error: () => console.log()
    })
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    this.typeIdSelected = typeId;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.sortSelected = event.target.value;
    this.getProducts();
  }
}
