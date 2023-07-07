import { Component, OnInit, ViewChild } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usersforadmin',
  templateUrl: './usersforadmin.component.html',
  styleUrls: ['./usersforadmin.component.css']
})
export class UsersforadminComponent implements OnInit {
  @ViewChild('Closebutton') btnclose:any;
  iddelete!:number;
  userlist: Users[] = [];
  constructor(private usersrv: UsersService , private route : Router) { }
  ngOnInit() {
    this.usersrv.getallusers().subscribe(
      (tab: Users[]) => {
        this.userlist = tab;
      }
    );
  }
  openModal(iduser:number){
    this.iddelete=iduser;

  }
  OnDelete(id: number) {
    this.usersrv.deleteusers(id).subscribe(
      (user) => {
        this.btnclose.nativeElement.click();
        this.usersrv.getallusers().subscribe(
          (tab: Users[]) => {
            this.userlist = tab;
          }
        )
      }
    )
  }
  OnAdd(){
    this.route.navigate(['/adduser']);
  }


}
