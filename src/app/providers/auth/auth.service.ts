import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedin : boolean;
  AuthToken;
  Pago;
  constructor(private router: Router) {
    this.isLoggedin = false;
    this.AuthToken = null;
    this.Pago = null;
  }
  storeUserCredentials(token) {
      console.log(token);
      window.localStorage.setItem('cipuser', JSON.stringify(token));
      this.useCredentials(token);      
  }  

  useCredentials(token) {
      this.isLoggedin = true;
      this.AuthToken = token;
  }

  loadUserCredentials() {
      var token = window.localStorage.getItem('cipuser');
      this.useCredentials(JSON.parse(token));
  }

  destroyUserCredentials() {
      this.isLoggedin = false;
      this.AuthToken = null;
      window.localStorage.removeItem('cipuser');
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);   
    if (!this.Pago) {
      this.router.navigate(["tabs"]);
      return false;
    }
    return true;
  }

  logout() {
    this.destroyUserCredentials();
  }
}
