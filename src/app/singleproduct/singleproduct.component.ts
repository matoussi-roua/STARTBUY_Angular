import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css']
})
export class SingleproductComponent implements OnInit {
  id!:number;
  productsList:Product[]=[];
  filteredProducts:Product[]=[];
  constructor(private router:ActivatedRoute,private httpclient:HttpClient){

  }
  ngOnInit(){
    this.id=this.router.snapshot.params['id'];
    this.httpclient.get("https://fakestoreapi.com/products").subscribe((data: any) => {
      console.log(data);
      this.productsList = data;
      this.filteredProducts =  this.productsList.filter(e => e.id == this.id);
      console.log(this.filteredProducts);
    });
      
  }

}
