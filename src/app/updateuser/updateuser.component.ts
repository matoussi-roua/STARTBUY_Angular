import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../service/users.service';
import { Users } from '../models/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  updateuser!: FormGroup;
  id!: number;
  userselected!: Users;

  constructor(
    private usersrv: UsersService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private route:Router
  ) {}

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
   
    this.updateuser = this.fb.group({
      newlname: ['', Validators.required],
      newemail: [{value:'',disabled:true}, [Validators.required, Validators.email]],
      newpassword: ['', Validators.required],
      newfname: ['', Validators.required],
      newrole: ['', Validators.required],
      newcity: ['', Validators.required],
      newcountry: ['', Validators.required],
      newpostcode: ['', Validators.required],
      newphone: ['', Validators.required]
    });

    this.usersrv.getuserbyid(this.id).subscribe(
      (variable: Users) => {
        this.userselected = variable;
        this.updateForm();
      }
    );
  }

  updateForm() {
    this.updateuser.patchValue({
      newfname: this.userselected.firstName,
      newlname: this.userselected.lastName,
      newrole: this.userselected.role,
      newcity: this.userselected.city,
      newcountry: this.userselected.country,
      newpostcode: this.userselected.postCode,
      newphone: this.userselected.phone,
      newemail: this.userselected.email,
      newpassword: this.userselected.password
    });
  }

  OnUpdate() {
    console.log('hey');
    this.userselected.firstName = this.updateuser.get('newfname')?.value;
    this.userselected.lastName = this.updateuser.get('newlname')?.value;
    this.userselected.role = this.updateuser.get('newrole')?.value;
    this.userselected.city = this.updateuser.get('newcity')?.value;
    this.userselected.country = this.updateuser.get('newcountry')?.value;
    this.userselected.postCode = this.updateuser.get('newpostcode')?.value;
    this.userselected.phone = this.updateuser.get('newphone')?.value;
    this.userselected.email = this.updateuser.get('newemail')?.value;
    this.userselected.password = this.updateuser.get('newpassword')?.value;

    this.usersrv.updateUserInfo(this.userselected).subscribe(
      (variable: Users) => {
        this.route.navigate(['/usersforadmin'])
      }
    );

  }
}
