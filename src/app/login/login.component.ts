import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {AuthenticateUser} from '../services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  loginForm: FormGroup;
  returnUrl: string;
  
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticateUser: AuthenticateUser
    ) {

      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

     }

  ngOnInit(): void {

  }

   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticateUser
          .login(this.f.username.value, this.f.password.value)
          .subscribe(
            (data) => {
              console.log("data received ", data)
              this.loading = false;
              this.router.navigate(["/dashboard"]);
            },
            (error) => {
              this.loading = false;
            }
          );
    console.log("submitted")
  }

}
