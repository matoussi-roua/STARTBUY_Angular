import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { FavorisComponent } from './favoris/favoris.component';
import { ShopComponent } from './shop/shop.component';
import { ContactComponent } from './contact/contact.component';
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
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "footer", component: FooterComponent },
  { path: "home", component: HomeComponent},
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "about", component: AboutComponent },
  { path: "favorite", component: FavorisComponent },
  { path: "shop", component: ShopComponent },
  { path: "contact", component: ContactComponent },
  { path: "profile/:iduser", component: ProfileComponent },
  { path: "admin", component: AdminComponent },
  { path: "products/:category/:syllabe", component: ProductsComponent },
  { path: "singleproduct/:id", component: SingleproductComponent },
  { path: "header-admin", component: HeaderAdminComponent },
  { path: "usersforadmin", component: UsersforadminComponent },
  { path: "updateusers/:id", component: UpdateuserComponent },
  { path: "adduser", component: AdduserComponent },
  { path: "addproduct", component: AddproductComponent },
  { path: "updateproduct/:id", component: UpdateproductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
