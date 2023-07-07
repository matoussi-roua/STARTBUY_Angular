import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpclient: HttpClient) { }

  getallusers(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(environment.host + "/users")
  }
  deleteusers(id: number): Observable<Users> {
    return this.httpclient.delete<Users>(environment.host + "/users/" + id);

  }
  getuserbyid(id: number): Observable<Users> {
    return this.httpclient.get<Users>(environment.host + "/users/" + id);
  }
  updateUserInfo(user: Users): Observable<Users> {
    return this.httpclient.put<Users>(environment.host + "/users/" + user.id, user);
  }
  addUser(user: Users): Observable<Users> {
    return this.httpclient.post<Users>(environment.host + "/users/", user);
  }
  getallproducts(): Observable<Product[]> {
    return this.httpclient.get<Product[]>(environment.host + "/products");
  }
  getproductbyid(id: number): Observable<Product> {
    return this.httpclient.get<Product>(environment.host + "/products/" + id);
  }
  deleteproduct(id: number): Observable<Product> {
    return this.httpclient.delete<Product>(environment.host + "/products/" + id)
  }
  addproduct(produit: Product): Observable<Product> {
    return this.httpclient.post<Product>(environment.host + "/products/", produit);
  }
  updateproduct(produit: Product): Observable<Product> {
    return this.httpclient.put<Product>(environment.host + "/products/" + produit.id, produit)
  }
  connect(email: string, password: string): Observable<Response> {
    return this.httpclient.post<Response>(environment.host + "/Client", { email: email, password: password })
  }
  addClient(client: Client): Observable<Client> {
    return this.httpclient.post<Client>(environment.host + "/Client", client)
  }
}

