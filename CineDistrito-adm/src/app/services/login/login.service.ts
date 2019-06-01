import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  data=[];
  apiURL: string = environment.KEYCLOAK_URL;
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  constructor(private httpClient: HttpClient, private route:Router) { 

  }
  login(username: string, password: string) {
    let parametros = new HttpParams()
      .set("grant_type", "password")
      .set("client_id", "CineDistrito")
      .set("client_secret", "ef705ea9-754b-4178-bcd7-80920c0adb7d")
      .set("username", username)
      .set("password", password)
  
    return this.httpClient.post<any>(this.apiURL + '/realms/SAT/protocol/openid-connect/token', parametros, { headers: this.httpHeaders }).subscribe((res => {
      this.data=JSON.parse(atob(res.access_token.split('.')[1]))
      console.log(this.data);
      sessionStorage.setItem('access_token',res.access_token);
      this.route.navigate(['inicio']);
    }),error => {
      console.log("error", error);
      
    })
  }
  logout() {
    sessionStorage.removeItem('access_token');
  }
  public get loggedIn(): boolean {
    return sessionStorage.getItem('access_token') !== null;
  }
}
