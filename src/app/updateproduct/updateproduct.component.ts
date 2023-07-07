import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {
  updateproductform!: FormGroup;
  id!: number;
  productselected!: Product;
  constructor(
    private usersrv: UsersService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private route: Router
  ) {

  }
  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];

    this.updateproductform = this.fb.group({
      newid: [{ value: '', disabled: true }, Validators.required],
      newcategory: ['', Validators.required],
      newtitle: ['', Validators.required],
      newprice: ['', Validators.required],
      newdescription: ['', Validators.required],
      newimage: ['', Validators.required]
    });

    this.usersrv.getproductbyid(this.id).subscribe(
      (variable: Product) => {
        this.productselected = variable;
        this.updateForm();
      }
    );
  }

  updateForm() {
    this.updateproductform.patchValue({
      newid: this.productselected.id,
      newcategory: this.productselected.category,
      newtitle: this.productselected.title,
      newprice: this.productselected.price,
      newdescription: this.productselected.description,
      newimage: this.productselected.image
    });
  }


  OnUpdate() {
    console.log('hey');
    this.productselected.id = this.updateproductform.get('newid')?.value;
    this.productselected.category = this.updateproductform.get('newcategory')?.value;
    this.productselected.title = this.updateproductform.get('newtitle')?.value;
    this.productselected.price = this.updateproductform.get('newprice')?.value;
    this.productselected.description = this.updateproductform.get('newdescription')?.value;
    this.productselected.image = this.updateproductform.get('newimage')?.value
    console.log(this.productselected);
    this.usersrv.updateproduct(this.productselected).subscribe(
      (data: Product) => {
        console.log(data);
        console.log("servise ")
        this.route.navigate(['/admin'])
      }
    );

  }
}
