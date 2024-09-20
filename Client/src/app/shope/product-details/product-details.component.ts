import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopeService } from '../shope.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product:IProduct;

  constructor(private shopService: ShopeService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct()
  }
  loadProduct(){
    const productId = this.activateRoute.snapshot.paramMap.get('id');
    this.shopService.getProduct(+productId).subscribe(res => {
      this.product = res;
    })
  }
}
