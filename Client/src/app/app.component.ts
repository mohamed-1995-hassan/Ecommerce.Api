import { Component } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { IProduct } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products: IProduct[]
  constructor(private basketService:BasketService){}

  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id')

    if(basketId){
      this.basketService.getBasket(basketId).subscribe(() =>{
        console.log('intial')
      }, err =>{
        console.log(err)
      })
    }
  }
  title = 'Client';
}
