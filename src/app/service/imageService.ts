import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ImageProduct } from "../models/ImageProduct";

@Injectable({
    providedIn: 'root'
  })
  export class imageService {
    constructor(private httpclient: HttpClient,private sanitizer: DomSanitizer) { }
    getImageUrl(image:ImageProduct):SafeResourceUrl{
        const imageUrl = 'data:' + image.typeimage + ';base64,' + image.tailleimage;
        return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
      }
  }