import { error } from '@angular/compiler/src/util';
import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import Swal from 'sweetalert2';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login-responsive.component.scss'],
})
export class LoginComponent implements OnInit {

  authReq:any;
  res: any;

  constructor(private service: AuthenticationService,
    private router: Router) {}

  ngOnInit(): void {
    this.eventInput();
  }

  eventInput() {
    // debugger
    let inputs = document.querySelectorAll('.input');
    // console.log(inputs);
    inputs.forEach((input) => {
      input.addEventListener('focus', function () {
        let parent = this.parentNode.parentNode;
        parent.classList.add('focus');
      });

      input.addEventListener('blur', function () {
        let parent = this.parentNode.parentNode;
        if (this.value == '') {
          parent.classList.remove('focus'); 
        }
      });
    });
  }

  onSubmit(event){
    this.authReq={
      "username": event.value.username,
      "password": event.value.password
    }
    // console.log(this.authReq)
    localStorage.removeItem('token');
    this.service.generateToken(this.authReq).subscribe(
      data=>{
        console.log(data);
        localStorage.setItem("token",data.toString().substring(8,(data.toString().length-2)));
      this.router.navigate(['/homeAdmin']);
      },
      error=>{
        if(error.status===401){
          Swal.fire({
            icon: 'error',
            text: 'Incorrect username or password',
          })
        }
      }
    )
  }

}
