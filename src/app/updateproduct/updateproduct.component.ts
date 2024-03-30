import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { ProductsService } from '../service/products.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageProduct } from '../models/ImageProduct';
import { imageService } from '../service/imageService';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {
  updateproductform!: FormGroup;
  id!: number;
  productselected!: Product;
  image!: ImageProduct; // You can define an interface for better type checking
  url: any;
  title!: string;

  // image
  selectedFile!: File;
  retrievedImage: any;
  base64Data!: any;
  constructor(
    private productSrv: ProductsService,
    private imageSrv: imageService,
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

    this.productSrv.getproductbyid(this.id).subscribe((data: Product) => {
      this.productselected = data;
      this.showImage(data.imageproduct);
      this.updateForm();
    }
    );

  }

  // This method sanitizes the image URL for safe rendering

  updateForm() {
    this.updateproductform.patchValue({
      newid: this.productselected.idproduct,
      newcategory: this.productselected.category,
      newtitle: this.productselected.title,
      newprice: this.productselected.price,
      newdescription: this.productselected.description,
      // newimage: this.productSrv.getImageProduct(this.id)
    });
  }


  OnUpdate() {
    this.productselected.idproduct = this.updateproductform.get('newid')?.value;
    this.productselected.category = this.updateproductform.get('newcategory')?.value;
    this.productselected.title = this.updateproductform.get('newtitle')?.value;
    this.productselected.price = this.updateproductform.get('newprice')?.value;
    this.productselected.description = this.updateproductform.get('newdescription')?.value;
    // this.productselected.image = this.updateproductform.get('newimage')?.value
    console.log(this.productselected);
    this.productSrv.updateproduct(this.productselected).subscribe(
      (data: Product) => {
        console.log(data);
        this.onUploadImage();
        this.route.navigate(['/admin'])
      }
    );

  }

  // Image
  //Gets called when the user selects an image
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

  //Gets called when the user clicks on save to upload the image
  onUploadImage() {
    if (this.selectedFile != undefined) { // if we change the image
      //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile);
      this.productSrv.addImageToProduct(this.id, uploadImageData).subscribe(response => { // get api
        //this.viewedImage = this.temporaryRetrievedImage; // view the new image
      });
    }
  }

  // get image 
  showImage(image: ImageProduct) {  //Make a call to Spring Boot to get the Image Bytes.
    this.title = image.titleimage;
    this.base64Data = image.tailleimage;

    this.retrievedImage = 'data:' + image.typeimage + ';base64,' + this.base64Data;
    this.url = this.retrievedImage;

    // Debugging: Check if the image URL is correctly formed
    console.log('Retrieved Image URL:', this.url);
    // this.productSrv.getImageProduct(this.id).subscribe(
    //   res => {
    //     //debugger;
    //     this.retrieveResponse = res;
    //     this.title = res.titleimage;
    //     this.base64Data = this.retrieveResponse.tailleimage; 
    //     this.retrievedImage = 'data:/' + this.retrieveResponse.typeimage + ';base64,' + this.base64Data;
    //     this.url = this.retrievedImage;
    //     // Debugging: Check if the image URL is correctly formed
    //     console.log('Retrieved Image URL:', this.url);
    //   },
    //   error => {
    //     console.error('Error fetching image:', error);
    //   });
  }
}
