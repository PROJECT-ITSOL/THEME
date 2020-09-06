import { Supplier } from './../ultis/supplier';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

  export class SupplierService {

      private apiUrl = "http://localhost:8080/api/supplier";

       constructor(private http: HttpClient){ }
        getListSupp(page:number): Observable<Supplier[]>{
            return this.http.get<Supplier[]>(this.apiUrl+'/phanTrang?page='+page);
        }
        
        getData(): Observable<Supplier[]> {
            return this.http.get<Supplier[]>(this.apiUrl);  

        }

        addSupp(supp){
            return this.http.post(this.apiUrl+'/addSupplier',supp,{
                responseType: 'text' as 'json',
              });
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
            return this.http.get<Supplier[]>(this.apiUrl+'/search?name='+key);
        }

        
}
  
