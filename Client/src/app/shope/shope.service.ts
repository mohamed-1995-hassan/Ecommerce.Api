import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { Observable } from 'rxjs';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { ShopParam } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopeService {

  baseUrl = 'https://localhost:7261/api/Product';
  constructor(private httpClient: HttpClient) { }

  getProducts(shopParam:ShopParam) : Observable<IPagination>{

    let params = new HttpParams();

    if(shopParam.brandIdSelected){
      params = params.append('brandId',shopParam.brandIdSelected.toString());
    }

    if(shopParam.typeIdselected){
      params = params.append('typeId',shopParam.typeIdselected.toString());
    }

    if(shopParam.pageNumber){
      params = params.append('pageIndex',shopParam.pageNumber.toString())
    }

    if(shopParam.pageSize){
      params = params.append('pageSize',shopParam.pageSize.toString())
    }

    if(shopParam.search){
      params = params.append('search',shopParam.search)
    }

    if(shopParam.sortSelected){
      params = params.append('sort',shopParam.sortSelected)
    }

    return this.httpClient.get<IPagination>(this.baseUrl,{params:params});
  }

  getBrands() : Observable<IBrand[]>{
    return this.httpClient.get<IBrand[]>(this.baseUrl + '/get-brands');
  }

  getTypes() : Observable<IBrand[]>{
    return this.httpClient.get<IBrand[]>(this.baseUrl + '/get-types');
  }
}
