import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from '../models/product';
import { ShoppinglistService } from '../service/shoppinglist.service';
import { FavouriteService } from '../service/favourite.service';
import { ImageProduct } from '../models/ImageProduct';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productsList!: Product[];
  base64Data: any;
  retrievedImage!: string;
  constructor(private productSrv: ProductsService,
    private shoppingSrv: ShoppinglistService,
    private favouriteSrv: FavouriteService) { }
  ngOnInit(): void {
    this.productSrv.getallproducts().subscribe(
      (data: Product[]) => {
        console.log(data);
        this.productsList = this.getRandomItems(data, 8); // Select 6 random products
        console.log(this.productsList);
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  onFilterButton() {
    let elementsFiltre = document.getElementsByClassName("element-filtre")[0];

    if (elementsFiltre.getAttribute("display") === "none") {
      elementsFiltre.setAttribute("display", "block");
    } else {
      elementsFiltre.setAttribute("display", "none");
    }

  }
  getRandomItems<T>(items: T[], count: number): T[] {
    if (count >= items.length) {
      return items;
    }

    const shuffled = items.slice(); // Clone the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
  }
  addToFavouriteList(idProduct: number) {
    this.favouriteSrv.addProductToFavouriteList(1, idProduct).subscribe(
      () => {
        window.alert('Product is added successfully')
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
    return this.retrievedImage;}


}
