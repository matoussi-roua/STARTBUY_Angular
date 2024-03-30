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

  constructor(private fb: FormBuilder, private usersrv: UsersService, private route: Router) {

  }
  ngOnInit(): void {
    this.adduserform = this.fb.group({
      newlname: ['', Validators.required],
      newemail: ['', [Validators.required, Validators.email]],
      newpassword: ['', Validators.required],
      newfname: ['', Validators.required],
      newrole: ['', Validators.required],
      newcity: ['', Validators.required],
      newcountry: ['', Validators.required],
      newpostcode: ['', Validators.required],
      newphone: ['', Validators.required]
    });


  }
  OnAdd() {
    let useradded: Users = new Users();
    useradded.firstName = this.adduserform.get("newfname")?.value;
    useradded.lastName = this.adduserform.get("newlname")?.value;
    useradded.role = this.adduserform.get("newrole")?.value;
    useradded.city = this.adduserform.get("newcity")?.value;
    useradded.country = this.adduserform.get("newcountry")?.value;
    useradded.postCode = this.adduserform.get("newpostcode")?.value;
    useradded.phone = this.adduserform.get("newphone")?.value;
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
