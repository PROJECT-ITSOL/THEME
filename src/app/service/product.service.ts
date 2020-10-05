
import { observable, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

  export class ProductService {

      private apiUrl = "http://localhost:8080/api/product";

       constructor(private http: HttpClient){ }
       updateAmount(id,billImportDetail){
        return this.http.put(this.apiUrl+'/updateAmountImport/'+id,billImportDetail,{
            responseType: 'text' as 'json',
          });

        }

        getId(id){
          return this.http.get(this.apiUrl+'/'+id);
        }

  }