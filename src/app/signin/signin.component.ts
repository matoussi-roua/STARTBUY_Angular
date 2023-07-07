import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../models/users';
import { UsersService } from '../service/users.service';
import { ClientService } from '../service/client.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  Validation=false;
  test = "hello there";
  bgcol = "background-color:yellow; font-size:40px;";
  txtmodel = "aaaa";
  signIn!: FormGroup;
  err!: string;
  alerterr = 'alert alert-danger';

  constructor(private fb: FormBuilder, private route: Router ,private clientservice :ClientService) {

  }

  ngOnInit() {
    this.signIn = this.fb.group({
      "email": ["", [Validators.required, Validators.email]],
      "password": ["", Validators.required],
      "acceptterms": [""]


    });
  }
  onSubmit() {
this.Validation=true;


    if (this.signIn.invalid) {

      return;
    }
  }
  onclick() {
    console.log(this.signIn)
    console.log(this.signIn.status)
    console.log(this.signIn.get("email")?.value)
    console.log(this.signIn.controls["acceptterms"].status)
    if (this.signIn.valid) {
      
      this.clientservice.connect(this.signIn.controls["email"].value,this.signIn.controls["password"].value).subscribe(
        ()=>{

        }
      );
      this.route.navigate([""])};

  }

}
