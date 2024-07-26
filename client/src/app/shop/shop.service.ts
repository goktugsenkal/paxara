import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/products';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shop-params';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let parameters = new HttpParams();

    if (shopParams.brandId > 0) parameters = parameters.append("brandId", shopParams.brandId)
    if (shopParams.typeId > 0) parameters = parameters.append("typeId", shopParams.typeId)
    parameters = parameters.append("sort", shopParams.sort)
    parameters = parameters.append("pageIndex", shopParams.pageNumber)
    parameters = parameters.append("pageSize", shopParams.pageSize)
    if(shopParams.search) parameters = parameters.append("search", shopParams.search)

    return this.http.get<Pagination<Product[]>>(this.baseUrl + "products", {params: parameters});
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + "products/brands")
  }
  getTypes() {
    return this.http.get<Type[]>(this.baseUrl + "products/types")
  }

}
