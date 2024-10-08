import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  basket$:Observable<IBasket>;
  currentUser$:Observable<IUser>;

  constructor(private basketService:BasketService, private accountService: AccountService,private router:Router) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$
    this.currentUser$ = this.accountService.currentUSer$
  }

  logout(){
    this.accountService.logout();
  }

  onSelectOptionChanged(e){
    console.log(e.target.value)

    if(e.target.value === 'logout'){
      this.logout();
    }
    else{
      this.router.navigateByUrl(e.target.value)
    }
  }

}
