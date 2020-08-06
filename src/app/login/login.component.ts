import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login-responsive.component.scss'],
})
export class LoginComponent implements OnInit {

  authReq:any;

  constructor(private service: AuthenticationService) {}

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

    let resToken = this.service.generateToken(this.authReq);
    resToken.subscribe(data =>{
      console.log(data);
    })

  }

  // check
}
