import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ImageProduct } from '../models/ImageProduct';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FavouriteService } from '../service/favourite.service';
import { ShoppinglistService } from '../service/shoppinglist.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css']
})
export class ShopCardComponent implements OnInit, OnChanges{
  totalCost: number = 0;
  costanddelivery!: number;
  base64Data: any;
  retrievedImage!: string;
  productForm: FormGroup;

  @Input() product = new Product(); // decorate the property with @Input()
  constructor(private fb: FormBuilder, private favouriteSrv: FavouriteService,
    private shoppingSvr: ShoppinglistService, private router: Router) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      idProduct: ['', Validators.required],
      quantity: ['', Validators.required],
      imageTitle: ['', Validators.required],
      imagePath: ['', Validators.required],
      imageType: ['', Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.product)
    this.productForm.controls['title'].setValue(this.product.title);
    this.productForm.controls['price'].setValue(this.product.price);
    this.productForm.controls['idProduct'].setValue(this.product.idproduct);
    this.productForm.controls['imageTitle'].setValue(this.product.imageproduct.titleimage);
    this.productForm.controls['imagePath'].setValue(this.product.imageproduct.tailleimage);
    this.productForm.controls['imageType'].setValue(this.product.imageproduct.typeimage);
    this.productForm.controls['quantity'].setValue(1);
  }
  ngOnInit(): void {
    console.log(this.product)

  }

  showImage(
  ) {  //Make a call to Spring Boot to get the Image Bytes.
    // debugger
    this.base64Data = this.productForm.controls['imagePath'].value;

    this.retrievedImage = 'data:' + this.productForm.controls['imageType'].value + ';base64,' + this.base64Data;
    return this.retrievedImage;
  }
  addcost() {
    // this.quantity+=1;
    this.totalCost = this.totalCost + this.productForm.controls['price'].value;
    this.costanddelivery = this.costanddelivery + this.productForm.controls['price'].value;
  }
  retrievecost() {
    // this.quantity-=1;
    // if (this.quantity>1){
    this.totalCost = this.totalCost - this.productForm.controls['price'].value;
    this.costanddelivery = this.costanddelivery - this.productForm.controls['price'].value;
  }

  addToFavouriteList() {
    this.favouriteSrv.addProductToFavouriteList(1, this.productForm.controls['idProduct'].value).subscribe(
      () => {
        window.alert('Product is added successfully!');
      }
    );
  }
  removeProductFromShoppingList() {
    this.shoppingSvr.removeProductFromShoppingList(1, this.productForm.controls['idProduct'].value).subscribe(
      () => {
        window.alert('Product is removed successfully!');
        window.location.reload();
      }
    );
  }


}
