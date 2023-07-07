import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpclient: HttpClient) { }
  connect(email: string, password: string): Observable<Response> {
    return this.httpclient.get<Response>(environment.host + "/Client"+ { email: email, password: password })
  }
  addClient(client: Client): Observable<Client> {
    return this.httpclient.post<Client>(environment.host + "/Client", client)
  }
}
