import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ImageProduct } from '../models/ImageProduct';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpclient: HttpClient,private sanitizer: DomSanitizer) { }
  getallproducts(): Observable<Product[]> {
    return this.httpclient.get<Product[]>(environment.hostbackend + "/getallproducts");
  }
  getproductbyid(id: number): Observable<Product> {
    return this.httpclient.get<Product>(environment.hostbackend + "/getproductbyid/" + id);
  }
  deleteproduct(id: number): Observable<Product> {
    return this.httpclient.delete<Product>(environment.hostbackend + "/deleteproduct/" + id)
  }
  addproduct(produit: Product): Observable<Product> {
    return this.httpclient.post<Product>(environment.hostbackend + "/addproduct", produit);
  }
  updateproduct(produit: Product): Observable<Product> {
    return this.httpclient.put<Product>(environment.hostbackend + "/updateproduct/" + produit.idproduct, produit)
  }
  searchByCategoryAndSyllabe(category: String, syllabe: String): Observable<Product[]> {
    return this.httpclient.get<Product[]>(environment.hostbackend + "/getproductsbycategoryandsyllabe/" + category+"/" + syllabe);
  }
  addImageToProduct(idProduct: number, uploadImageData: FormData): Observable<Product> {
    return this.httpclient.post<Product>(environment.hostbackend + "/addimagetoproduct/" + 
    idProduct ,uploadImageData);
  }
  getImageProduct(idProduct: number): Observable<ImageProduct> {
    return this.httpclient.get<ImageProduct>(environment.hostbackend + "/getimageproduct/" + idProduct);
  }

}
