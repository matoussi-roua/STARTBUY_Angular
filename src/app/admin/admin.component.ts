import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../service/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @ViewChild('MyModalClose') exitPopUp: any;
  iddelete!: number;
  productsList: Product[] = [];
  constructor(private router: ActivatedRoute, private route: Router, private httpclient: HttpClient, private usersrv: UsersService, private modalService: NgbModal) { }
  ngOnInit() {
    this.usersrv.getallproducts().subscribe(
      (data: any) => {
        console.log(data);
        this.productsList = data;

      }
    );
    console.log(this.productsList);

  };

  OnDelete(id: number) {
    this.usersrv.deleteproduct(id).subscribe((produit) => {
      this.exitPopUp.nativeElement.click();
      this.usersrv.getallproducts().subscribe(
        (data: any) => {
          console.log(data);
          this.productsList = data;
          
        }
      )     
    })
  };

  openModal(content: any) {
    this.iddelete = content;
    console.log(content, this.iddelete);

  }
onClick(){
  this.route.navigate(['/addproduct']);
  console.log("hello there")
}
}
