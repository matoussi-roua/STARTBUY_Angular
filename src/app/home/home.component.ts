import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
onFilterButton(){
  let elementsFiltre = document.getElementsByClassName("element-filtre")[0];
   
  if (elementsFiltre.getAttribute("display") === "none") {
      elementsFiltre.setAttribute("display","block");
  } else {
    elementsFiltre.setAttribute("display","none");
  }

}

}
