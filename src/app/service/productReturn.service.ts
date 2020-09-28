// dung de dong goi chuc nang 
import { Order } from '../ultis/order';
import { OderDetail } from '../ultis/orderDetail';
import { ProductReturn } from '../ultis/productReturn';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductReturnService {
    private apiUrl = "http://localhost:8080/api/productReturn";

    // khai bao bien 
        messageSource = new BehaviorSubject<string>("default");
        currentMessage = this.messageSource.asObservable();
  // có thể subcribe theo dõi thay đổi value của biến này thay cho messageSource
 
  // method này để change source message 
        changeMessage(message:string) {
        this.messageSource.next(message);
        }

        constructor(private http: HttpClient) { }
    //
        getListProductRetunr(page: number): Observable<ProductReturn[]>{
            return this.http.get<ProductReturn[]>(this.apiUrl+'/list?page='+page);

        }
        getData(): Observable<ProductReturn[]> {
            return this.http.get<ProductReturn[]>(this.apiUrl);
    
        }
        addProductReturn(productReturn) {
            return this.http.post(this.apiUrl + '/addProductReturn', productReturn);
        }

        editOrder(id, productReturn) {
            return this.http.put(this.apiUrl + '/update/' + id, productReturn, {
                responseType: 'text' as 'json',
            });
        }
        delete(url: number) {
            return this.http.delete(this.apiUrl +'/delete/'+ url);
        }
    
        search(key: string, page: number): Observable<ProductReturn[]> {
            return this.http.get<ProductReturn[]>(this.apiUrl + '/search?name=' + key + '&page=' + page);
        }

        // searchStatus(status: string, page: number): Observable<ProductReturn[]> {
        //     return this.http.get<ProductReturn[]>(this.apiUrl + '/seachStatus?status=' + status + '&page=' + page);
        // }
        searchStatus(status: string): Observable<ProductReturn[]>{
            return this.http.get<ProductReturn[]>(this.apiUrl+'/status?status='+status);
        }
}   