import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { UsersService } from '../service/users.service';
import { ProductsService } from '../service/products.service';
import { FavouriteService } from '../service/favourite.service';
import { ShoppinglistService } from '../service/shoppinglist.service';
import { ImageProduct } from '../models/ImageProduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  category!: string;
  currentCategory!: string;

  productsList: Product[] = [];
  filteredProducts: Product[] = [];
  syllabe!: string;
  title!: string;
  base64Data: any;
  retrievedImage!: string;
  url!: string;
  productselected!: Product;
  product: any;
  constructor(
    private router: ActivatedRoute,
    private httpclient:HttpClient ,
    private productSrv: ProductsService,
    private favouriteSrv:FavouriteService,
    private shoppingSrv:ShoppinglistService) {
    
   
  }
  ngOnInit() {

    this.category = this.router.snapshot.params['category'];
    this.currentCategory=this.category.toUpperCase();
    this.syllabe = this.router.snapshot.params['syllabe'];
    console.log(this.category,this.syllabe);
    // if (this.category == "man") this.category = "men's clothing";
    // else if (this.category == "women") this.category = "women's clothing";
    // else if (this.category == "accessories") {this.category = "electronics" };
    // console.log(this.category);
    // this.currentCategory=this.category;

    // this.httpclient.get("https://fakestoreapi.com/products").subscribe((data: any) => {
    //   console.log(data);
    //   this.productsList = data;
    //   this.filteredProducts =  this.productsList.filter(e => e.category == this.category);
    //   console.log(this.filteredProducts);
    // });
    this.productSrv.searchByCategoryAndSyllabe(this.category,this.syllabe).subscribe(
      (data:Product[])=>{
        console.log(data);
        this.filteredProducts=data;
        
      }
    )
  }
  addToFavouriteList(idProduct: number) {
    this.favouriteSrv.addProductToFavouriteList(1,idProduct).subscribe(
      () => {
        window.alert('Product is added successfully')
      }
    )
  }
  addProductToShoppingList(idproduct:number){
    this.shoppingSrv.addProductToShoppingList(1,idproduct).subscribe(
      ()=>{
        window.alert('Product is added successfully!');
      }
    );
  }
  showImage(image: ImageProduct) {  //Make a call to Spring Boot to get the Image Bytes.
    // debugger
    this.title = image.titleimage;
    this.base64Data = image.tailleimage;

    this.retrievedImage = 'data:' + image.typeimage + ';base64,' + this.base64Data;
    this.url = this.retrievedImage;
    return this.retrievedImage;}


}
