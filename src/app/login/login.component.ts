import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login-responsive.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private loginService: AuthenticationService
  ) {}

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
    const username = event.value.username;
    const password = event.value.password;
    
    // this.loginService.authenticate(username,password).toPromise()
    // .then(res=>{
    //   if(res!=null){
    //     this.router.navigate(['/homeAdmin']);;
    //   }else{
    //     console.log('false');
    //   }
    // })
    if(username === "abc" && password === "123"){
      this.router.navigate(['/homeAdmin'])
    }
  }

  // check
}
