import { Product } from './../ultis/product';
import { Supplier } from './../ultis/supplier';
import { SupplierService } from './../service/supplier.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  listSupp: Supplier[];
  page: number = 0;
  pages: Array<number>;
  totalSupp: number;
  idDelete: number;
  keyword: string;
  listProduct: Product[];
  nameSupplier: string;
  dataSupp: Array<any>;
  supplier = new Supplier();
  message: string;
  status: string;
  boolean: boolean;
  p: string;
  listStatus: Array<string> = ['Active', 'Disable'];
  formValue: any;
  folderImage: string = 'folderImage';

  imgUrl: string;
  selectedImage: any = null;
  isSubmited: boolean = false;


  constructor(private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage) {
    this.route.queryParams.subscribe(params => {
      this.p = params['page'] || 0;
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.resetForm();
  }



  getAll() {
    this.listSupp = new Array();
    this.supplierService.getAll().subscribe(res => {
      this.dataSupp = res;
      this.dataSupp.forEach((supp) => {
        let supplier = new Supplier();
        supplier.idSupplier = supp['idSupplier'];
        supplier.address = supp['address'];
        supplier.logo = supp['logo'];
        supplier.name = supp['name'];
        supplier.status = supp['status'];
        supplier.phoneNumber = supp['phoneNumber'];
        supplier.products = supp['productList'];
        this.listSupp.push(supplier);
      });
      this.totalSupp = this.listSupp.length;
    });
  }

  pageChange(newPage: number) {
    this.router.navigate(['/homeAdmin/supplier'], { queryParams: { page: newPage } });
  }

  showEdit(item: Supplier) {
    this.supplier = item;
    this.listProduct = item['products'];
    this.nameSupplier = item['name'];
    this.idDelete = item['idSupplier']
  }

  add(form: NgForm) {
    this.formValue = form.value
    let newSupplier = new Supplier();
    const urlImg = document.getElementById('file');
    if (this.selectedImage !=null){
    var filePath = `${this.folderImage}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          newSupplier.logo = url;
          newSupplier.name = form.value.name;
          newSupplier.address = form.value.address;
          newSupplier.status = form.value.status;
          newSupplier.phoneNumber = form.value.phoneNumber;
          console.log(newSupplier);
          this.supplierService.addSupp(newSupplier).subscribe((res) => {
            this.message = res['message'];
            // location.reload();
            alert(res['message']);
            this.getAll();
            form.reset();
          });
        })
      })
    ).subscribe();
    } else {
          newSupplier.logo = '/assets/image/unnamed.png' ;
          newSupplier.name = form.value.name;
          newSupplier.address = form.value.address;
          newSupplier.status = form.value.status;
          newSupplier.phoneNumber = form.value.phoneNumber;
          console.log(newSupplier);
          this.supplierService.addSupp(newSupplier).subscribe((res) => {
            this.message = res['message'];
            // location.reload();
            alert(res['message']);
            this.getAll();
            form.reset();
          });

    }


  }

  edit(form: NgForm) {
    this.formValue = form.value
    let newSupplier = new Supplier();
    const urlImg = document.getElementById('file');
    if (this.selectedImage !=null){
    var filePath = `${this.folderImage}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          newSupplier.logo = url;
          newSupplier.name = form.value.name;
          newSupplier.address = form.value.address;
          newSupplier.status = form.value.status;
          newSupplier.phoneNumber = form.value.phoneNumber;
          console.log(newSupplier);
          this.supplierService.editSupp(this.idDelete,newSupplier).subscribe((res) => {
            this.message = res['message'];
            // location.reload();
            alert('Success');
            this.getAll();
           
          });
        })
      })
    ).subscribe();
    } else {
          newSupplier.logo = '/assets/image/unnamed.png' ;
          newSupplier.name = form.value.name;
          newSupplier.address = form.value.address;
          newSupplier.status = form.value.status;
          newSupplier.phoneNumber = form.value.phoneNumber;
          console.log(newSupplier);
          this.supplierService.editSupp(this.idDelete,newSupplier).subscribe((res) => {
            this.message = res['message'];
            // location.reload();
            alert('Success');
            this.getAll();
          });

        }
  }

  delete() {
    this.supplierService.delete(this.idDelete).subscribe(res => {
      alert(res['message']);
      this.getAll();
    })
  }

  search() {
    this.listSupp = new Array();
    this.supplierService.search(this.keyword).subscribe(res => {
      this.dataSupp = res;
      this.dataSupp.forEach((supp) => {
        let supplier = new Supplier();
        supplier.idSupplier = supp['idSupplier'];
        supplier.address = supp['address'];
        supplier.logo = supp['logo'];
        supplier.name = supp['name'];
        supplier.status = supp['status'];
        supplier.phoneNumber = supp['phoneNumber'];
        supplier.products = supp['productList'];
        this.listSupp.push(supplier);
      });
      this.totalSupp = this.listSupp.length;
    });
  }

  getSuppByStatus(event) {
    this.listSupp = new Array();
    this.status=event.target.value;
    if(this.status!='0'){
    
    if (this.status == 'Active') {
      this.boolean = true;
    } else {
      this.boolean = false;
    }
    
    this.supplierService.searchByStatus(this.boolean).subscribe(res => {
      this.dataSupp = res;
      this.dataSupp.forEach((supp) => {
        let supplier = new Supplier();
        supplier.idSupplier = supp['idSupplier'];
        supplier.address = supp['address'];
        supplier.logo = supp['logo'];
        supplier.name = supp['name'];
        supplier.status = supp['status'];
        supplier.phoneNumber = supp['phoneNumber'];
        supplier.products = supp['productList'];
        this.listSupp.push(supplier);
      });
      this.totalSupp = this.listSupp.length;
    });
  }else{
    this.getAll();
  }
  }

  showPreview(event: any) {
    console.log(event.target.value)
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgUrl = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgUrl = '/assets/image/image.png';
      this.selectedImage = null;
    }
  }
  showPreviewEdit(event:any) {
    console.log(event.target.value)
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.supplier.logo = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgUrl = '/assets/image/image.png';
      this.selectedImage = null;
    }
  }

  

  resetForm() {

    this.imgUrl = '/assets/image/unnamed.png';
    this.selectedImage = null;
    this.isSubmited = false;
  }
}
