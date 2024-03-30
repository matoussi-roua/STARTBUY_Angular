import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';
import { Rating } from '../models/rating';
import { ProductsService } from '../service/products.service';
import { ImageProduct } from '../models/ImageProduct';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  addproductform!: FormGroup;
  zero: number = 0;
  validation: boolean = false;
  selectedFile: any;
  url: any;

  constructor(private fb: FormBuilder, private productSrv: ProductsService, private route: Router) {
  }
  ngOnInit(): void {
    this.addproductform = this.fb.group({
      newcategory: ['', Validators.required],
      newtitle: ['', Validators.required],
      newprice: ['', Validators.required],
      newdescription: ['', Validators.required],
      newimage: ['', Validators.required]
    });
  }
  OnAdd() {
    this.validation = true;
    console.log(this.validation, this.addproductform.controls);
    if (this.addproductform.valid) {
      console.log(this.addproductform.valid, this.addproductform.controls);
      let produit: Product = new Product();
      produit.title = this.addproductform.get("newtitle")?.value;
      produit.category = this.addproductform.get("newcategory")?.value;
      produit.price = this.addproductform.get("newprice")?.value;
      produit.description = this.addproductform.get("newdescription")?.value;
      produit.imageproduct=new ImageProduct();
      this.productSrv.addproduct(produit).subscribe(
        (data: any) => {
          console.log(produit, produit.idproduct);
          this.onUploadImage(data.idproduct);
          this.route.navigate(['/admin'])

          // this.productSrv.getallproducts().subscribe((data)=>{
          //   this.route.navigate(['/admin'])
          // });
        }
      );
    }
  }
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.url = reader.result;
      console.log(this.url)
    }
  }
  onUploadImage(idproduct:number) {
    if (this.selectedFile != undefined) { // if we change the image
      //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile);
      this.productSrv.addImageToProduct(idproduct, uploadImageData).subscribe(response => { // get api
        //this.viewedImage = this.temporaryRetrievedImage; // view the new image
      });
    }
  }
}
