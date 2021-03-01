import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedin : boolean;
  AuthToken;
  Pago;
  constructor() {
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

  logout() {
    this.destroyUserCredentials();
  }
}
