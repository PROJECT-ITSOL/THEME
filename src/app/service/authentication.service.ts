import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // jwt-client
  generateToken(req) {
    return this.http.post('http://localhost:8080/authenticate', req, {
      responseType: 'text' as 'json',
    });
  }

  isLoggedIn() {
    // debugger
    return this.http.get(this.baseUrl + '/api/home');
  }


  getListComment(page: number) {
    return this.http.get(this.baseUrl + '/api/comment/getList?page=' + page);
  }

  delete(url: string) {
    return this.http.delete(this.baseUrl + url);
  }
}
    