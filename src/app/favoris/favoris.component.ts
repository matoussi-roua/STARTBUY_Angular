import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit{
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
