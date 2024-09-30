import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.appUrl;
  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUSer$ = this.currentUserSource.asObservable();

  constructor(private httpClient:HttpClient,private router:Router) { }

  login(values:any){
    return this.httpClient.post(this.baseUrl + 'account/login', values).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user)
        }
      })
    )
  }

  loadCurrentUser(token:string){
    let headers = new HttpHeaders();
    
    headers = headers.set('Authorization', `Bearer ${token}`);
    console.log(headers)
    return this.httpClient.get(this.baseUrl + 'account/current-user', {headers}).pipe(
      map((user:IUser) =>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(values:any){
    return this.httpClient.post(this.baseUrl + 'account/register', values).pipe(
      map((user:IUser) =>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user)
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string){
    return this.httpClient.get(this.baseUrl + 'account/check-email?email=' + email)
  }
}
