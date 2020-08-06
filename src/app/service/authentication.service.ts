import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
