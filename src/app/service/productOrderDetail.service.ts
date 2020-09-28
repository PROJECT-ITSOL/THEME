import { OderDetail } from "./../ultis/orderDetail";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../ultis/order';

@Injectable({ providedIn: 'root' }) export class ProductOrderDetailService {
    private apiUrl = "http://localhost:8080/api/orderdetail";

    constructor(private http: HttpClient) { }
    
    getByIdProductOrderdetail(id: string) {
        // return this.http.get(this.apiUrl + '/' + id);
        return this.http.get(this.apiUrl + '/' + id)
    }
    getOrderById(id: string): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl + '/' + id);
    }

    getData(): Observable<OderDetail[]> {
        return this.http.get<OderDetail[]>(this.apiUrl);

    }

    addOrderDetail(orderDetail) {
        return this.http.post(this.apiUrl + '/addOrderDetail', orderDetail);
    }

    editOrderDetail(id, orderDetail) {
        return this.http.put(this.apiUrl + '/update/' + id, orderDetail
        );
    }

    delete(id:number) {
        return this.http.delete(this.apiUrl + '/delete?id='+id);
    }

    search(key: string, page: number): Observable<OderDetail[]> {
        return this.http.get<OderDetail[]>(this.apiUrl + '/search?name=' + key + '&page=' + page);
    }
}
