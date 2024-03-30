import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../models/users';
import { UsersService } from '../service/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  updateuser!: FormGroup;
  id!: number;
  userselected!: Users;
  photo:any;
  photouser!:File;
  url:any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  constructor(
    private usersrv: UsersService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private route:Router,
    private sanitizer: DomSanitizer

  ) {}

  ngOnInit(): void {
    //this.router.snapshot.params['iduser']    
    this.id = 1;
    this.updateuser = this.fb.group({
      newlname: ['', Validators.required],
      newemail: [{value:'',disabled:true}, [Validators.required, Validators.email]],
      newpassword: ['', Validators.required],
      newfname: ['', Validators.required],
      newcity: ['', Validators.required],
      newcountry: ['', Validators.required],
      newpostcode: ['', Validators.required],
      newphone: ['', Validators.required]
    });

    this.usersrv.getuserbyid(this.id).subscribe(
      (variable: Users) => {
        this.userselected = variable;
        this.updateForm();
        console.log("heyoooo",this.photo)
      }
    );
    this.usersrv.getImageUser(1).subscribe(
      res => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    );
    this.usersrv.getImageUser(1).subscribe(
      
      (file:File)=>{this.photo=file;
        const objectUrl = URL.createObjectURL(file);
        this.url = this.sanitizer.bypassSecurityTrustUrl(objectUrl);}
     )
  }
  
  updateForm() {
    this.updateuser.patchValue({
      newfname: this.userselected.firstName,
      newlname: this.userselected.lastName,
      newcity: this.userselected.city,
      newcountry: this.userselected.country,
      newpostcode: this.userselected.postCode,
      newphone: this.userselected.phone,
      newemail: this.userselected.email,
      newpassword: this.userselected.password,
      photouser:this.photo
    });
  }

  onUpdate() {
    console.log('hey');
    this.userselected.firstName = this.updateuser.get('newfname')?.value;
    this.userselected.lastName = this.updateuser.get('newlname')?.value;
    this.userselected.city = this.updateuser.get('newcity')?.value;
    this.userselected.country = this.updateuser.get('newcountry')?.value;
    this.userselected.postCode = this.updateuser.get('newpostcode')?.value;
    this.userselected.phone = this.updateuser.get('newphone')?.value;
    this.userselected.email = this.updateuser.get('newemail')?.value;
    this.userselected.password = this.updateuser.get('newpassword')?.value;
    this.usersrv.addImageToUser(1,this.updateuser.get('photouser')?.value)

    this.usersrv.updateUserInfo(this.userselected).subscribe(
      (variable: Users) => {
        this.route.navigate(['/home'])
      }
    );

  }
  getFile(event:any){
    if (event.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      };
      this.photo=event.target.files[0];
      console.log(this.photo)
    }
    
  }

}
