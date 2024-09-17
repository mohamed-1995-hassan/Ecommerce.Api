import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopeService } from './shope.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParam } from '../shared/models/shopParams';

@Component({
  selector: 'app-shope',
  templateUrl: './shope.component.html',
  styleUrls: ['./shope.component.scss']
})
export class ShopeComponent implements OnInit {
  @ViewChild('search',{static:false}) searchTerm:ElementRef
  products:IProduct[];
  brands: IBrand[];
  types: IType[];
  sortOption = [
    {name : 'Alphabetical', value:'name'},
    {name : 'Price:Low To High', value:'priceAsc'},
    {name : 'Price:high To Low', value:'priceDesc'}
  ];
  shopParam = new ShopParam();
  totalCount:number;

  constructor(private shopeService: ShopeService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopeService.getProducts(this.shopParam).subscribe(res => {
      this.products = res.data
      this.totalCount = res.count
      this.shopParam.pageSize = res.pageSize
      this.shopParam.pageNumber = res.pageIndex
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
    this.shopParam.typeIdselected = id
    this.shopParam.pageNumber = 1
    this.getProducts()
  }

  onBrandSelected(id:number){
    this.shopParam.brandIdSelected = id
    this.shopParam.pageNumber = 1
    this.getProducts()
  }

  onPageChanged(event: any) {
    if(this.shopParam.pageNumber !== event){
      this.shopParam.pageNumber = event;
      this.getProducts();
    }
  }
  onSearch(){
    this.shopParam.search = this.searchTerm.nativeElement.value
    this.shopParam.pageNumber = 1
    this.getProducts()
  }
  
  onReset(){
    this.searchTerm.nativeElement.value = ''
    this.shopParam = new ShopParam();
    this.getProducts();
  }

  onSortSelected(sort:string){
    this.shopParam.sortSelected = sort;
    this.getProducts();
  }
}
