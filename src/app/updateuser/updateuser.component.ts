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
      newlocation: ['', Validators.required],
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
      newfname: this.userselected.first_name,
      newlname: this.userselected.last_name,
      newrole: this.userselected.role,
      newlocation: this.userselected.location,
      newphone: this.userselected.phone_number,
      newemail: this.userselected.email,
      newpassword: this.userselected.password
    });
  }

  OnUpdate() {
    console.log('hey');
    this.userselected.first_name = this.updateuser.get('newfname')?.value;
    this.userselected.last_name = this.updateuser.get('newlname')?.value;
    this.userselected.role = this.updateuser.get('newrole')?.value;
    this.userselected.location = this.updateuser.get('newlocation')?.value;
    this.userselected.phone_number = this.updateuser.get('newphone')?.value;
    this.userselected.email = this.updateuser.get('newemail')?.value;
    this.userselected.password = this.updateuser.get('newpassword')?.value;

    this.usersrv.updateUserInfo(this.userselected).subscribe(
      (variable: Users) => {
        this.route.navigate(['/usersforadmin'])
      }
    );

  }
}
