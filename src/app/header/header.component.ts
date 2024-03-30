import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../models/product';
import { ProductsService } from '../service/products.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faHeart = faHeart;
  faUser = faUser;
  faShopping = faCartShopping;
  choiceofcategorie = "Categories"
  products: Product[] = [];
  client = false;  
  admin= false;
  visitor=true;
  syllabe!: string;
  constructor(private router: Router, private productsrv: ProductsService) {

  }
  ngOnInit(): void {

  }
  onFavoriteClick() {
    this.router.navigate(["/favorite"]);
  }
  choosecategory(x: string) {
    this.choiceofcategorie = x;
  }
  onSubmit() {
    if (this.syllabe == undefined) this.syllabe = 'null'
    this.router.navigate(['/products/' + this.choiceofcategorie + '/' + this.syllabe]).then(() => {
      window.location.reload();
    });

  }
  loggingout(){
    this.client=false;
    this.admin=false;
    this.visitor=true;
    this.router.navigate(["/home"]);
}}