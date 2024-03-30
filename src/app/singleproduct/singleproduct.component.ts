import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../models/product';
import { ProductsService } from '../service/products.service';
import { FavouriteService } from '../service/favourite.service';
import { ShoppinglistService } from '../service/shoppinglist.service';
import { ImageProduct } from '../models/ImageProduct';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css']
})
export class SingleproductComponent implements OnInit {
  idProduct!: number;
  productsList: Product[] = [];
  filteredProducts: Product[] = [];
  product!: Product;
  title!: string;
  base64Data: any;
  retrievedImage!: string;
  url!: string;
  productselected!: Product;
  constructor(
    private router: ActivatedRoute,
    private httpclient: HttpClient,
    private productSrv: ProductsService,
    private favouriteSrv: FavouriteService,
    private shoppingSrv:ShoppinglistService) {

  }
  ngOnInit() {
    this.idProduct = this.router.snapshot.params['id'];
    // this.httpclient.get("https://fakestoreapi.com/products").subscribe((data: any) => {
    //   console.log(data);
    //   this.productsList = data;
    //   this.filteredProducts =  this.productsList.filter(e => e.idproduct == this.idProduct);
    //   console.log(this.filteredProducts);
    // });
    this.productSrv.getproductbyid(this.idProduct).subscribe(
      (data: Product) => {
        this.product = data;
        this.showImage(data.imageproduct);

      }
    )
  }
  addToFavouriteList(idproduct: number) {
    this.favouriteSrv.addProductToFavouriteList(1, this.idProduct).subscribe(
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
    this.title = image.titleimage;
    this.base64Data = image.tailleimage;

    this.retrievedImage = 'data:' + image.typeimage + ';base64,' + this.base64Data;
    this.url = this.retrievedImage;
  
  }

}
