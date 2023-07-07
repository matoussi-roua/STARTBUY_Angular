import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { UsersService } from '../service/users.service';

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
  constructor(private router: ActivatedRoute,private httpclient:HttpClient ,private usersrv: UsersService) {
    
   
  }
  ngOnInit() {

    this.category = this.router.snapshot.params['category'];
    console.log(this.category);
    if (this.category == "man") this.category = "men's clothing";
    else if (this.category == "women") this.category = "women's clothing";
    else if (this.category == "accessories") {this.category = "electronics" };
    console.log(this.category);
    this.currentCategory=this.category;

    this.httpclient.get("https://fakestoreapi.com/products").subscribe((data: any) => {
      console.log(data);
      this.productsList = data;
      this.filteredProducts =  this.productsList.filter(e => e.category == this.category);
      console.log(this.filteredProducts);
    });
  }
}
