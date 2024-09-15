import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopeService } from './shope.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';

@Component({
  selector: 'app-shope',
  templateUrl: './shope.component.html',
  styleUrls: ['./shope.component.scss']
})
export class ShopeComponent implements OnInit {
  products:IProduct[];
  brands: IBrand[];
  types: IType[];
  typeSelectedId :number
  brandSelectedId:number
  constructor(private shopeService: ShopeService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopeService.getProducts(this.brandSelectedId, this.typeSelectedId).subscribe(res => {
      this.products = res
    })
  }

  getBrands(){
    this.shopeService.getBrands().subscribe(res => {
      this.brands = [{ id:0, name:'all' }, ...res]
    })
  }

  getTypes(){
    this.shopeService.getTypes().subscribe(res => {
      this.types = [{ id:0, name:'all' }, ...res]
    })
  }
  onTypeSelected(id:number){
    this.typeSelectedId = id
    this.getProducts()
  }

  onBrandSelected(id:number){
    this.brandSelectedId = id
    this.getProducts()
  }

}
