import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule,FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FooterComponent } from './footer/footer.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { FavorisComponent } from './favoris/favoris.component';
import { ShopComponent } from './shop/shop.component';
import { HeaderAboutContactComponent } from './header-about-contact/header-about-contact.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './products/products.component';
import { SingleproductComponent } from './singleproduct/singleproduct.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { UsersforadminComponent } from './usersforadmin/usersforadmin.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { ShopCardComponent } from './shop-card/shop-card.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    AboutComponent,
    HomeComponent,
    FavorisComponent,
    ShopComponent,
    HeaderAboutContactComponent,
    ContactComponent,
    ProfileComponent,
    AdminComponent,
    ProductsComponent,
    SingleproductComponent,
    HeaderAdminComponent,
    UsersforadminComponent,
    UpdateuserComponent,
    AdduserComponent,
    AddproductComponent,
    UpdateproductComponent,
    ShopCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(library: FaIconLibrary) {
  //   library.addIconPacks(fas, far);
  // }
 }
