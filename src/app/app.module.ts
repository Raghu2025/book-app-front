import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// module
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from './modal/modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
// import * as _ from 'lodash';

//component
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user/component/user-form/user-form.component';
import { categoryFormComponent } from './category/components/category-form/category-form';
import { categoryComponent } from './category/category.component';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { ItemFormComponent } from './item/components/item-form/item-form.component';
import { ItemComponent } from './item/item.component';
import { ProfileComponent } from './profile/profile.component';


// service
import { ApiInterceptorService } from './api-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { ItemViewComponent } from './item-view/item-view.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { OurProductComponent } from './our-product/our-product.component';
import { NavigationComponent } from './navigation/navigation.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserComponent,
    UserFormComponent,
    categoryFormComponent,
    categoryComponent,
    ItemFormComponent,
    ItemComponent,
    ProfileComponent,
    ItemViewComponent,
    FrontPageComponent,
    OurProductComponent,
    NavigationComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule ,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSlideToggleModule,
    ToastrModule.forRoot(),
    MatSelectModule

  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiInterceptorService,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
