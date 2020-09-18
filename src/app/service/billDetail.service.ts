import { BillImportDetail } from './../ultis/billImportDetail';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

  export class BillDetailService {

      private apiUrl = "http://localhost:8080/api/billDetail";

       constructor(private http: HttpClient){ }

        getByIdBill(id:string): Observable<BillImportDetail[]>{
            return this.http.get<BillImportDetail[]>(this.apiUrl+'?idBillImport='+id);
        }
        
    

        addBill(bill){
            return this.http.post(this.apiUrl+'/addNewBillDetail',bill);
        }

        editSupp(id,billImport){
            return this.http.put(this.apiUrl+'/update/'+id,billImport,{
                responseType: 'text' as 'json',
              });
        }

        delete(id){
            return this.http.delete(this.apiUrl+'/delete/'+id);
        }

        search(key:string,page:number): Observable<BillImportDetail[]>{
            return this.http.get<BillImportDetail[]>(this.apiUrl+'/search?keyWord='+key+'&page='+page);
        }

        
}
  
