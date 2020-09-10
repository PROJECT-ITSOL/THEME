import { AuthenticationService } from './../service/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isSubMenu = false;

  isShowLogout = false;
  constructor(private router: Router, private service: AuthenticationService) {}

  ngOnInit(): void {
    this.isToken();
  }

  showMenuDrop() {
    this.isSubMenu = !this.isSubMenu;
  }

  // tslint:disable-next-line:typedef
  showLogout() {
    this.isShowLogout = !this.isShowLogout;
  }
  // tslint:disable-next-line:typedef
  logout() {
    this.router.navigate(['/loginAdmin']);
    localStorage.removeItem('token');
  }
  // tslint:disable-next-line:typedef
  isToken(){
    this.service.isLoggedIn().subscribe();
  }
}
