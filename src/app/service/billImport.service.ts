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
            return this.http.get<BillImport[]>(this.apiUrl+'/billPage?page='+page);
        }

        getBillById(id:number):Observable<BillImport>{
            return this.http.get<BillImport>(this.apiUrl+'/'+id);

        }
        
        getByIdSupp(id:number,page:number): Observable<BillImport[]>{
            return this.http.get<BillImport[]>(this.apiUrl+'/searchByIdSupp?idSupplier='+id+'&page='+page);
        }

        getAllBill(): Observable<BillImport[]>{
            return this.http.get<BillImport[]>(this.apiUrl+'/all');
        }

        getLastBill():Observable<BillImport>{
            return this.http.get<BillImport>(this.apiUrl+'/getLastBill');
        }

        getBillBySuppAndMonth(month:number,id:number): Observable<BillImport[]>{
            return this.http.get<BillImport[]>(this.apiUrl+'/getByMonthAndSupp?month='+month+'&idSupplier='+id);
        }

        addBill(bill){
            return this.http.post(this.apiUrl+'/addBillImport',bill);
        }

        editBill(id,billImport){
            return this.http.put(this.apiUrl+'/update/'+id,billImport,{
                responseType: 'text' as 'json',
              });
        }

        delete(id:number){
            return this.http.delete(this.apiUrl+'/delete/'+id);
        }

        search(key:string): Observable<BillImport[]>{
            return this.http.get<BillImport[]>(this.apiUrl+'/getByIdCode/'+key);
        }

        searchMonth(month:number): Observable<BillImport[]>{
            return this.http.get<BillImport[]>(this.apiUrl+'/searchMonth?month='+month);
        }


        updateTotalPrice(id,billDetail){
            return this.http.put(this.apiUrl+'/updateMoney/'+id,billDetail,{
                responseType: 'text' as 'json',
            });
            
        }

        getData(year){
            return this.http.get(this.apiUrl+'/thongKe?year='+year);
        }

        // updateBillImport(id:string){
        //     return this.http.put(this.apiUrl+'/update/'+id);        
        // }

        
}
  
