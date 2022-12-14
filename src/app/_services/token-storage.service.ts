import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  user_role: string;

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    console.log("LOGGGGG: " + sessionStorage.getItem(USER_KEY));
    // console.log(sessionStorage.getItem(USER_KEY.split(',')[2]));
    let usr = JSON.parse(sessionStorage.getItem(USER_KEY));
    let role = JSON.parse(sessionStorage.getItem(USER_KEY));
    this.user_role = role.roles;
    console.log("Role: " + this.user_role);
    window.sessionStorage.setItem("USER_ROLE", this.user_role);
    // console.log("Current user id: " + usr.id)
    window.sessionStorage.setItem("USER_ID", usr.id);
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
