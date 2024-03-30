import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from 'src/app/models/users';
import { tap } from "rxjs/operators";

import * as moment from "moment";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  private token!: string;

  constructor(private httpclt: HttpClient) { }

  // Méthode pour simuler la connexion de l'utilisateur
  login(email: string, password: string) {
    return this.httpclt.post<string>(environment.hostbackend+'/login/'+ email+"/"+ password,{} );
    //.pipe(
    // s
    // this is just the HTTP call, 
    // we still need to handle the reception of the token
    //.shareReplay();

  }
  private setSession(authResult: any) {
    //const expiresAt = moment().add(authResult.expiresIn, 'second');

//    localStorage.setItem('id_token', authResult.idToken);
    //localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('id_token', authResult);
    console.log(authResult);

  }

  logout() {
    localStorage.removeItem("id_token");
    //localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at")!;
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  // Méthode pour simuler la déconnexion de l'utilisateur
  // logout() {
  //   this.isAuthenticated = false;
  // }

  // Méthode pour vérifier si l'utilisateur est authentifié
  // isLogedIn() {
  //   return this.isAuthenticated;
  // }
  // Méthode pour enregistrer le jeton d'accès
  // setToken(token: string) {
  //   this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvdWFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJKb2huIERvZSJ9.x9NTCbs-5ACmf1mmeTwtY2ldJRiPggbMliZWkZcx96w";
  // }

  // Méthode pour vérifier si l'utilisateur est authentifié
  // isAuthenticated(): boolean {
  //   return this.token !== null;
  // }

}