import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string){
    const url="http://localhost:8080/api/admin/" + username + "/" + password;
    return this.http.get(url);
  }

  isAdminLogin(){
    return false;

  }

  logout(){
    
  }


  // jwt-client
  generateToken(req){
    return this.http.post("http://localhost:8080/authenticate",req,{responseType: 'text' as 'json'});
  }

  // welcomeToHome(token){
  //   let tokenStr = 'Bearer '+ token;
  //   const headers= new HttpHeaders().set('Authorization',tokenStr);
  //   return this.http.get("http://localhost:8080",{headers,responseType: 'text' as 'json'});
  // }
}
