import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../models/users';
import { UsersService } from '../service/users.service';
import { AuthService } from '../service/auth/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  Validation = false;
  test = "hello there";
  bgcol = "background-color:yellow; font-size:40px;";
  txtmodel = "aaaa";
  signIn!: FormGroup;
  err!: string;
  alerterr = 'alert alert-danger';

  constructor(private fb: FormBuilder, private route: Router, private userSrv: UsersService, private authService: AuthService) {

  }

  ngOnInit() {
    this.signIn = this.fb.group({
      "email": ["", [Validators.required, Validators.email]],
      "password": ["", Validators.required],
      "acceptterms": [""]


    });
  }
  onSubmit() {
    this.Validation = true;


    if (this.signIn.invalid) {

      return;
    }
  }
  onclick() {
    console.log("formgroup:", this.signIn)
    console.log("status:", this.signIn.status)
    console.log(this.signIn.get("email")?.value)
    console.log(this.signIn.controls["acceptterms"].status)
    if (this.signIn.valid) {

      // this.userSrv.connect(this.signIn.controls["email"].value,this.signIn.controls["password"].value).subscribe(
      //   (res)=>{
      //     console.log(res.accessToken);

      //   }
      // );
      this.authService.login(this.signIn.controls["email"].value, this.signIn.controls["password"].value)
      .subscribe(
        (data) => {
          debugger;
          console.log("User is logged in");
          console.log(data);
          localStorage.setItem('id_token', data);
          console.log(data);
          localStorage.setItem("isLoggedIn","true");
          this.route.navigate(['']);
        }
      );
    };

  }

}
