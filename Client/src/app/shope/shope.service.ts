import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { Observable } from 'rxjs';
import { IBrand } from '../shared/models/brand';

@Injectable({
  providedIn: 'root'
})
export class ShopeService {

  baseUrl = 'https://localhost:7261/api/Product';
  constructor(private httpClient: HttpClient) { }

  getProducts(brandSelectedId?:number, typeSelectedId?:number) : Observable<IProduct[]>{

    let params = new HttpParams();

    if(brandSelectedId){
      params = params.append('brandId',brandSelectedId.toString());
    }

    if(typeSelectedId){
      params = params.append('typeId',typeSelectedId.toString());
    }
    return this.httpClient.get<IProduct[]>(this.baseUrl,{params:params});
  }

  getBrands() : Observable<IBrand[]>{
    return this.httpClient.get<IBrand[]>(this.baseUrl + '/get-brands');
  }

  getTypes() : Observable<IBrand[]>{
    return this.httpClient.get<IBrand[]>(this.baseUrl + '/get-types');
  }
}
