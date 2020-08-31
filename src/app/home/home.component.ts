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

  showLogout() {
    this.isShowLogout = !this.isShowLogout;
  }
  logout() {
    this.router.navigate(['/loginAdmin']);
    localStorage.removeItem('token');
  }
  isToken(){
    this.service.isLoggedIn().subscribe();
  }
}
