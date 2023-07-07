import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
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

  isLoggedIn = false;
  constructor(private router: Router) {

  }
  ngOnInit(): void {

  }
  onFavoriteClick() {
    this.router.navigate(["/favorite"]);
  }
  choosecategory(x: string) {

    if (x == "women") this.choiceofcategorie = "Women";
    else {
      if (x == "man") this.choiceofcategorie = "Man";
      else {
        if (x == "accessories") this.choiceofcategorie = "Accessories";
        else {
          if (x == "child") this.choiceofcategorie = "Child";
          else this.choiceofcategorie = "Categories"
        }
      }
    }
  }
}
