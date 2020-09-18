import { OderDetail } from "./../ultis/orderDetail";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root'}) export class ProductOrderDetailService {
    private apiUrl= "http://localhost:8080/api/orderDetail";

    constructor(private http: HttpClient){}
        getByIdProductOrderdetail(id:string): Observable<OderDetail[]>{
            return this.http.get<OderDetail[]>(this.apiUrl+'?idOrder='+id);
        }

        getData(): Observable<OderDetail[]> {
            return this.http.get<OderDetail[]>(this.apiUrl);  

        }

        addOrderDetail(orderDetail){
            return this.http.post(this.apiUrl+'/addOrder',orderDetail);
        }

        editOrderDetail(id,orderDetail){
            return this.http.put(this.apiUrl+'/update/'+id,orderDetail,{
                responseType: 'text' as 'json',
            });
        }

        delete(id){
            return this.http.delete(this.apiUrl+'/delete?id='+id);
        }

        search(key:string,page:number): Observable<OderDetail[]>{
            return this.http.get<OderDetail[]>(this.apiUrl+'/search?name='+key+'&page='+page);
        }
}
