import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../models/client';
import { UsersService } from '../service/users.service';
import { Users } from '../models/users';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupform!: FormGroup;
  Validation = false;

  constructor(private fb: FormBuilder, private usersrv: UsersService, private route: Router) {
  }
  ngOnInit(): void {
    this.signupform = this.fb.group({
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fname: ['', Validators.required],
      repeatpassword:["",Validators.required],
      agree:[false, Validators.requiredTrue]
    });
  }
  OnSubmit() {
    this.Validation = true;
    if (this.signupform.valid) {
      let useradded: Users = new Users();
      useradded.firstName = this.signupform.get("fname")?.value;
      useradded.lastName = this.signupform.get("lname")?.value;
      useradded.role = "CLIENT";
      useradded.city = "";
      useradded.country = "";
      useradded.postCode = 0;
      useradded.phone = 0;
      useradded.email = this.signupform.get("email")?.value;
      useradded.password = this.signupform.get("password")?.value;

      this.usersrv.addUser(useradded).subscribe(
        (response) => {
          console.log('User added successfully');
          useradded.iduser = response.iduser; // Assuming the server returns the ID in the response
          this.route.navigate(['/profile/', useradded.iduser]);
        }
      );
      this.route.navigate(['/profile/',useradded.iduser]);
    }
  }

}
