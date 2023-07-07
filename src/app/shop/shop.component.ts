import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  filteredProducts:Product[]=[];
  constructor(private usersrv:UsersService){

  }
  ngOnInit() {
    this.usersrv.getallproducts().subscribe(
      (data: Product[]) => {
        console.log(data);
        this.filteredProducts=data;
        
      }
    );

  }
}
