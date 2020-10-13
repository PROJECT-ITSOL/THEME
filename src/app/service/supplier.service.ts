import { Supplier } from './../ultis/supplier';
import { observable, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

  export class SupplierService {

      private apiUrl = "http://localhost:8080/api/supplier";

       constructor(private http: HttpClient){ }

        getAll():Observable<Supplier[]>{
            return this.http.get<Supplier[]>(this.apiUrl);
        }

        getListSupp(page:number): Observable<Supplier[]>{
            return this.http.get<Supplier[]>(this.apiUrl+'/list?page='+page);
        }
        
        getData(): Observable<Supplier[]> {
            return this.http.get<Supplier[]>(this.apiUrl);  
    
        }

        getSuppById(id:number) : Observable<Supplier>{
            return this.http.get<Supplier>(this.apiUrl+'/'+id);
        }

        addSupp(supp){
            return this.http.post(this.apiUrl+'/addSupplier',supp);
        }

        editSupp(id,supplier){
            return this.http.put(this.apiUrl+'/update/'+id,supplier,{
                responseType: 'text' as 'json',
              });
        }

        delete(id){
            return this.http.delete(this.apiUrl+'/delete?id='+id);
        }

        search(key:string): Observable<Supplier[]>{
            return this.http.get<Supplier[]>(this.apiUrl+'/search?keyword='+key);
        }

        searchByStatus(status:boolean): Observable<Supplier[]>{
            return this.http.get<Supplier[]>(this.apiUrl+'/status?status='+status);
        }

        
}
  
