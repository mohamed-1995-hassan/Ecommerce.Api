import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.appUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private httpClient:HttpClient) { }

  getBasket(id:string){
    return this.httpClient.get(this.baseUrl + 'basket?id='+id).pipe(

      map((basket:IBasket)=>{
        this.basketSource.next(basket)
      })
    )
  }

  getCurrentBasketValue(){
    return this.basketSource.value
  }

  addItemToBasket(item:IProduct, quantity = 1){

    const itemToAdd : IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    let baseket = this.getCurrentBasketValue();
    if(baseket === null){
      
      baseket = this.createBasket();
    }
    baseket.items = this.addOrUpdateItem(baseket.items, itemToAdd, quantity)
    this.setBasket(baseket);
  }

  setBasket(basket:IBasket){
    return this.httpClient.post(this.baseUrl + 'basket', basket).subscribe((response:IBasket) =>{
      this.basketSource.next(response)
    }, error =>{
      console.log(error)
    })
  }


  private createBasket(): IBasket {
    const basket =  new Basket()
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      brand:item.productBrand,
      type:item.productType,
      pictureUrl: item.pictureUrl,
      price: item.price,
      quantity: quantity
    }
  }
  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id)

    if(index === -1){
      itemToAdd.quantity = quantity
      items.push(itemToAdd) 
    }
    else{
      items[index].quantity += quantity
    }
    return items;
  }
}
