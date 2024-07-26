import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/Models/pagination';
import { Product } from '../shared/Models/products';
import { Brand } from '../shared/Models/brand';
import { Type } from '../shared/Models/type';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getProducts(brandId?: number, typeId?: number, sortSelected?: string) {
    let parameters = new HttpParams();

    if (brandId) parameters = parameters.append("brandId", brandId)
    if (typeId) parameters = parameters.append("typeId", typeId)
    if (sortSelected) parameters = parameters.append("sort", sortSelected)

    return this.http.get<Pagination<Product[]>>(this.baseUrl + "products", {params: parameters});
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + "products/brands")
  }
  getTypes() {
    return this.http.get<Type[]>(this.baseUrl + "products/types")
  }
}
