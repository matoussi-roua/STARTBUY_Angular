import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {
  choiceofcategorie = "Categories";
  constructor() {

  }
  ngOnInit(): void {

  }
  choosecategory(x: string) {

    if (x == "women") this.choiceofcategorie = "Women";
    else {
      if (x == "man") this.choiceofcategorie = "Man";
      else {
        if (x=="accessories") this.choiceofcategorie="Accessories";
        else{
          if (x=="child") this.choiceofcategorie="Child";
          else this.choiceofcategorie = "Categories"
        }
      }
    }
  }
}
