import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AuthGuardService } from './auth-guard.service';
import {Roles} from './const/Role.constant'
import { categoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { ProfileComponent } from './profile/profile.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { OurProductComponent } from './our-product/our-product.component';

const routes: Routes = [
{
  path:'',
  redirectTo:"book",
  pathMatch:"full"
},
{
  path:"book",
  component:FrontPageComponent
},
{
  path:"login",
  component:LoginComponent
},
{
  path:"product",
  component:OurProductComponent
},
 {
    path:"view/:id",
    component:ItemViewComponent
  },
{
  path:"dashboard",
  component:DashboardComponent,
  canActivate:[AuthGuardService],
  children:[
    {
      path:"user",
      component:UserComponent,
      canActivate:[AuthGuardService]
    },
    {
      path:"category",
      component:categoryComponent,
      canActivate:[AuthGuardService]
    },
    {
      path:"item",
      component:ItemComponent,
      canActivate:[AuthGuardService]
    },
    {
      path:"profile",
      component:ProfileComponent,
      canActivate:[AuthGuardService]
    }
    
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
