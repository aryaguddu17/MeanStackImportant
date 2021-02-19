import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ModalModule,BsModalRef } from 'ngx-bootstrap/modal';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';
import { TruncatePipe } from './core/pipe/truncate.pipe';
import { LightboxModule } from 'ngx-lightbox';
import { WebStorage } from './core/utility/web.storage';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoAddComponent,
    CsvUploadComponent,
    ProductsComponent,
    AddProductComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    LightboxModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
  ],
  providers: [BsModalRef,
    WebStorage,
    LocalStorageService,
    SessionStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

