import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../models/users';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  adduserform!: FormGroup;

  constructor(private fb: FormBuilder, private usersrv: UsersService , private route : Router) {

  }
  ngOnInit(): void {
    this.adduserform = this.fb.group({
      newid:['',Validators.required],
      newlname: ['', Validators.required],
      newemail: ['', [Validators.required, Validators.email]],
      newpassword: ['', Validators.required],
      newfname: ['', Validators.required],
      newrole: ['', Validators.required],
      newlocation: ['', Validators.required],
      newphone: ['', Validators.required]
    });


  }
  OnAdd() {
    let useradded: Users = new Users();
    useradded.id = this.adduserform.get("newid")?.value;
    useradded.first_name = this.adduserform.get("newfname")?.value;
    useradded.last_name = this.adduserform.get("newlname")?.value;
    useradded.role = this.adduserform.get("newrole")?.value;
    useradded.location = this.adduserform.get("newlocation")?.value;
    useradded.phone_number = this.adduserform.get("newphone")?.value;
    useradded.email = this.adduserform.get("newemail")?.value;
    useradded.password = this.adduserform.get("newpassword")?.value;
  
    this.usersrv.addUser(useradded).subscribe(
      () => {
        console.log('User added successfully');
        this.route.navigate(['/usersforadmin']);
      }
    );
  }
  
}
