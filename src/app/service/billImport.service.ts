import { BillImport } from './../ultis/billImport';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

  export class BillImportService {

      private apiUrl = "http://localhost:8080/api/billImport";

       constructor(private http: HttpClient){ }

        getListBillByPage(page:number): Observable<BillImport[]>{
            return this.http.get<BillImport[]>(this.apiUrl+'?page='+page);
        }
        
    

        addBill(bill){
            return this.http.post(this.apiUrl+'/addBillImport',bill);
        }

        editSupp(id,billImport){
            return this.http.put(this.apiUrl+'/update/'+id,billImport,{
                responseType: 'text' as 'json',
              });
        }

        delete(id){
            return this.http.delete(this.apiUrl+'/delete'+id);
        }

        search(key:string,page:number): Observable<BillImport[]>{
            return this.http.get<BillImport[]>(this.apiUrl+'/search?keyWord='+key+'&page='+page);
        }

        
}
  
