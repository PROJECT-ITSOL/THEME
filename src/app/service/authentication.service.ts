import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  expiresAt: number;
  userProfile: any;
  accessToken: string;
  authenticated: boolean;

  constructor(private http: HttpClient) { }

  // authenticate(username: string, password: string){
  //   const url="http://localhost:8080/api/admin/" + username + "/" + password;
  //   return this.http.get(url);
  // }
  logout(){
    
  }


  // jwt-client
  generateToken(req){
    return this.http.post("http://localhost:8080/authenticate",req,{responseType: 'text' as 'json'});
  }
  isLoggedIn():boolean{
    const token=localStorage.getItem("token");
    if(token != null){
      return true;
    }else{
      return false;
    }
  }
}
