import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {

  constructor(private httpclient :HttpClient) { }
  getShoppingList(iduser :number):Observable<Product[]>{
    return this.httpclient.get<Product[]>(environment.hostbackend+"/getshoppinglist/"+iduser)
  }
  addProductToShoppingList(iduser:number,idproduct :number):Observable<any>{
    return this.httpclient.put<any>(environment.hostbackend+"/addtoshop/"+iduser+"/"+idproduct,{})
  }
  removeAllProductFromShoppingList(iduser:number):Observable<any>{
    return this.httpclient.delete<any>(environment.hostbackend+"/removeallfromshop/"+iduser)
  }
  removeProductFromShoppingList(iduser : number,idproduct : number):Observable<any>{
    return this.httpclient.delete<any>(environment.hostbackend+"/removefromshop/"+iduser+"/"+idproduct)
  }
}
