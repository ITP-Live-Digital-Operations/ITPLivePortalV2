import * as alertify from 'alertifyjs';
import { Component , OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/Services/user.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  loginForm: FormGroup;
  data: any;

  ngOnInit(): void {
    localStorage.clear();
  }


  constructor(private formBuilder: FormBuilder, private service: UserService, private route: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  onSubmit() {

    this.service.logIn(this.loginForm.value).subscribe((res) => {

      this.data = res;
      console.log(this.data);

      if(this.data.status === 'success'){
        localStorage.setItem('token',this.data.data.token)
        if(this.data.data.role === 'superadmin' /* || this.data.data.role === 'head of talent' */) {
          /* change route later to home page with all sections available */
          this.route.navigate(['home/admin/forms'])
          }else {
            this.route.navigate([`home/${this.data.data.role}/forms`])
          }
      }else{
        alertify(`${this.data.statusText}`)
      }


    });
  }
}
