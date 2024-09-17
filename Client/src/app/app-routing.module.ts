import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopeComponent } from './shope/shope.component';
import { ProductDetailsComponent } from './shope/product-details/product-details.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'shop',component:ShopeComponent},
  {path:'shop/:id',component:ProductDetailsComponent},
  {path:'**',redirectTo:'',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
