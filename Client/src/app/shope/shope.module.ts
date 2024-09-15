import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopeComponent } from './shope.component';
import { ProductItemComponent } from './product-item/product-item.component';



@NgModule({
  declarations: [ShopeComponent, ProductItemComponent],
  imports: [
    CommonModule
  ],
  exports:[ShopeComponent]
})
export class ShopeModule { }
