import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';
import { Rating } from '../models/rating';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  addproductform!: FormGroup;
  zero: number = 0;
  validation:boolean=false;

  constructor(private fb: FormBuilder, private usersrv: UsersService, private route: Router) {
  }
  ngOnInit(): void {
    this.addproductform = this.fb.group({
      newid: ['', Validators.required],
      newcategory: ['', Validators.required],
      newtitle: ['', Validators.required],
      newprice: ['', Validators.required],
      newdescription: ['', Validators.required],
      newimage: ['', Validators.required]
    });
  }
  OnAdd() {
    this.validation=true;
    console.log(this.validation,this.addproductform.controls);
    if (this.addproductform.valid) {
    console.log(this.addproductform.valid, this.addproductform.controls);
    let produit: Product = new Product();
    let rate:Rating=new Rating();
    rate.count=0;
    rate.rate=0;
    produit.id = this.addproductform.get("newid")?.value;
    produit.title = this.addproductform.get("newtitle")?.value;
    produit.category = this.addproductform.get("newcategory")?.value;
    produit.price = this.addproductform.get("newprice")?.value;
    produit.description = this.addproductform.get("newdescription")?.value;
    produit.image = this.addproductform.get("newimage")?.value;
    produit.rating = rate;
    this.usersrv.addproduct(produit).subscribe(
      (data:any) => {
        console.log(produit, produit.id);
        this.usersrv.getallproducts().subscribe((data: any) => {
          this.route.navigate(['/admin']);
          console.log(data);
        });
      }
    );
  }}
}
