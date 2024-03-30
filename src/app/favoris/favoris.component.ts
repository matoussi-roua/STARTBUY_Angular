import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { Product } from '../models/product';
import { ProductsService } from '../service/products.service';
import { FavouriteService } from '../service/favourite.service';
import { ShoppinglistService } from '../service/shoppinglist.service';
import { ImageProduct } from '../models/ImageProduct';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  filteredProducts: Product[] = [];
  base64Data: any;
  retrievedImage!: string;
  constructor(private favouriteSrv: FavouriteService,
    private shoppingSrv: ShoppinglistService) {

  }

  ngOnInit() {
    let iduser = 1;
    this.favouriteSrv.getFavouriteList(iduser).subscribe(
      (data: Product[]) => {
        console.log(data);
        this.filteredProducts = data;

      }
    );

  }
  removeProductFromFavouriteList(idProduct: number) {
    this.favouriteSrv.removeProductFromFavouriteList(1, idProduct).subscribe(
      () => {
        window.alert('Product is removed successfully');
        window.location.reload();
      }
    )
  }
  addProductToShoppingList(idproduct: number) {
    this.shoppingSrv.addProductToShoppingList(1, idproduct).subscribe(
      () => {
        window.alert('Product is added successfully!');
      }
    );
  }
  showImage(image: ImageProduct) {  //Make a call to Spring Boot to get the Image Bytes.
    // debugger
    this.base64Data = image.tailleimage;

    this.retrievedImage = 'data:' + image.typeimage + ';base64,' + this.base64Data;
    return this.retrievedImage;
  }
}
