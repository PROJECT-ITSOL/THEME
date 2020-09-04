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

  getList(param: HttpParams, url: string) {
    return this.http.get(this.baseUrl + url,{params: param});
  }

  getSearch(param: HttpParams, url: string) {
    return this.http.get(this.baseUrl + url, { params: param });
  }

  postAddNew(url: string, object: any) {
    return this.http.post(this.baseUrl + url, object);
  }

  delete(url: string) {
    return this.http.delete(this.baseUrl + url);
  }

  update(url: string, data: any) {
    return this.http.put(this.baseUrl + url, data);
  }

  // comment
  getCommentById(url: string) {
    return this.http.get(this.baseUrl + url);
  }
}
