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
<<<<<<< HEAD
    // debuggers  
=======
>>>>>>> a58d90eeb048e617e01449fff7434692fe7aa940
    this.service.isLoggedIn().subscribe();
  }
}
