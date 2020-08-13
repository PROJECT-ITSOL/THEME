import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError,map,tap} from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  checkAuth: string;
  constructor(private http: HttpClient) { }

  logout(){
    
  }


  // jwt-client
  generateToken(req){
    return this.http.post("http://localhost:8080/authenticate",req,{responseType: 'text' as 'json'});
  }

  isLoggedIn():boolean{
    const token=localStorage.getItem("token");
    let res=this.checkToken(token);
    // res.subscribe(data=>console.log(data))
    // if(){
    //   return true;
    // }else{
    //   return false;
    // }
    return true;
  }

  checkToken(token){
    const url = "http://localhost:8080/api/home";
    let tokenStr = "Bearer " + token;
    const headers = new HttpHeaders().set("Authorization",tokenStr)
    return this.http.get(url,{headers,responseType:'text' as 'json'}).pipe(
      tap(
        data=>console.log(JSON.stringify(data))
      ),
      catchError(
        error=>of(console.log("error"))
      )
    ) 
  }
}
