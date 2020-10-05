import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

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
    return this.http.get(this.baseUrl + url, { params: param });
  }
  // get all
  getAll(url: string) {
    return this.http.get(this.baseUrl + url);
  }
  getSearch(param: HttpParams, url: string) {
    return this.http.get(this.baseUrl + url, { params: param });
  }

  postAddNew(url: string, object: any) {
    return this.http.post(this.baseUrl + url, object);
  }

  putUpdate(url: string, object: any) {
    return this.http.put(this.baseUrl + url, object);
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
  getListNoParam(url: string) {
    return this.http.get(this.baseUrl + url)
  }
  getStatistical(url: string, param: HttpParams) {
    return this.http.get(this.baseUrl + url, { params: param })
  }
  getStatisticalNoParam(url: string) {
    return this.http.get(this.baseUrl + url)
  }

  // category
  getTotalCategory(url:string){
    return this.http.get(this.baseUrl + url)
  }

}
