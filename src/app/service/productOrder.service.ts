
// dung de dong goi chuc nang 
import { Order } from './../ultis/order';
import { OderDetail } from './../ultis/orderDetail';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductOrderService {
    private apiUrl = "http://localhost:8080/api/order";

    // khai bao bien 
        messageSource = new BehaviorSubject<string>("default");
        currentMessage = this.messageSource.asObservable();
  // có thể subcribe theo dõi thay đổi value của biến này thay cho messageSource
 
  // method này để change source message 
        changeMessage(message:string) {
        this.messageSource.next(message);
        }
    
    //////
    constructor(private http: HttpClient) { }
    getListOrder(page: number): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl + '/list?page=' + page);
    }

    getData(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl);

    }

    getById(id:string){
        return this.http.get(this.apiUrl+'/'+id);
    }

    addOrder(order) {
        return this.http.post(this.apiUrl + '/addOrder', order);
    }

    editOrder(id, order) {
        return this.http.put(this.apiUrl + '/update/' + id, order, {
            responseType: 'text' as 'json',
        });
    }

    delete(url: string) {
        return this.http.delete(this.apiUrl + url);
    }

    search(key: string, page: number): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl + '/search?name=' + key + '&page=' + page);
    }


    searchStatus(key: string): Observable<Order[]>{
        return this.http.get<Order[]>(this.apiUrl+'/status?status='+key);
    }
    //
    // postAddNew(url: string, object: any) {
    //     return this.http.post(this.apiUrl + url, object);
    //   }
    // //
    // putUpdate(url: string, object: any) {
    //     return this.http.put(this.apiUrl + url, object);
    //   }
    // getOrderdetail(id) {
    //     return this.http.get<OderDetail[]>(this.apiUrl + '/oderdetail?=' + id);
    // }

}