import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../models/client';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signup!:FormGroup;
  Validation=false;
      constructor(private fb :FormBuilder,private route  :Router,private userservice : UsersService){

  }


  ngOnInit() {
    this.signup = this.fb.group({
      "fname":["",Validators.required],
      "lname":["",Validators.required],
      "email":["",[Validators.required, Validators.email]],
      "password":["",Validators.required],
      "repeatpassword":["",Validators.required],
      "agree":[false, Validators.requiredTrue]
    })
      
  }
  OnSubmit(){
    this.Validation=true;
    if (this.signup.valid) {
      let newclient:Client =new Client();
      newclient.id = this.signup.get("newid")?.value;
      newclient.first_name = this.signup.get("fname")?.value;
      newclient.last_name = this.signup.get("lname")?.value;
      newclient.email = this.signup.get("email")?.value;
      newclient.password = this.signup.get("password")?.value;
      this.userservice.addClient(newclient).subscribe(
        ()=>{
          console.log(newclient);
        }
      );
      this.route.navigate([""])
    }
      };
}
