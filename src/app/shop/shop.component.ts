import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { UsersService } from '../service/users.service';
import { ProductsService } from '../service/products.service';
import { FavouriteService } from '../service/favourite.service';
import { ShoppinglistService } from '../service/shoppinglist.service';
import { ImageProduct } from '../models/ImageProduct';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  filteredProducts: Product[] = [];
  totalCost: number = 0;
  costanddelivery!: number;
  base64Data: any;
  retrievedImage!: string;
  quantity = new FormControl('1');
  constructor(private productSrv: ProductsService, private favouriteSrv: FavouriteService, private shoppingSvr: ShoppinglistService) {

  }
  ngOnInit() {
    let iduser = 1;
    this.shoppingSvr.getShoppingList(iduser).subscribe(
      (data: Product[]) => {
        console.log(data);
        this.filteredProducts = data;
        for (let product of this.filteredProducts) {

          this.totalCost = this.totalCost + product.price; //*quantity à voir
        }
        this.costanddelivery = this.totalCost + 7;
      }
    );

  }

  // onAddQuantity(price: number){
  //   debugger;

  //   let quantity = document.getElementById("form1")?.getAttribute("value");
  //   let quant = parseInt(quantity!, 10);
  //   document.getElementById("form1")?.setAttribute("value", (quant+1).toString());
  // }

  addToFavouriteList(idProduct: number) {
    this.favouriteSrv.addProductToFavouriteList(1, idProduct).subscribe(
      () => {
        window.alert('Product is added successfully!');
      }
    );
  }
  removeProductFromShoppingList(idproduct: number) {
    this.shoppingSvr.removeProductFromShoppingList(1, idproduct).subscribe(
      () => {
        window.alert('Product is removed successfully!');
        window.location.reload();
      }
    );
  }

  removeAllProductFromShoppingList() {
    this.shoppingSvr.removeAllProductFromShoppingList(1).subscribe(
      () => {
        window.alert('Order is done successfully we will contact you in two days!');
        window.location.reload();
      }
    );

  }
  showImage(image: ImageProduct) {  //Make a call to Spring Boot to get the Image Bytes.
    // debugger
    this.base64Data = image.tailleimage;

    this.retrievedImage = 'data:' + image.typeimage + ';base64,' + this.base64Data;
    return this.retrievedImage;
  }
  addcost(price: number) {
    this.quantity.setValue("2");
    console.log(this.quantity.value)
    // this.quantity+=1;
    this.totalCost = this.totalCost + price;
    this.costanddelivery = this.costanddelivery + price;
  }
  retrievecost(price: number) {
    // this.quantity-=1;

    console.log(this.quantity);
    // if (this.quantity>1){
    console.log(this.quantity);
    this.totalCost = this.totalCost - price;
    this.costanddelivery = this.costanddelivery - price;
  }

  // }
}
