import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FakenewsComponent } from './fakenews/fakenews.component';
import { InicioComponent, DialogOverviewExampleDialog } from './inicio/inicio.component';
import {CdkTableModule} from '@angular/cdk/table';
import {MatListModule,MatTabsModule,MatButtonModule, MatSnackBarModule,MatTableModule, MatFormFieldModule, MatInputModule, MatCheckboxModule,MatCardModule,MatBottomSheet, MatBottomSheetRef, MatBottomSheetModule, MatDialogModule} from '@angular/material';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BottomSheetOverviewExampleSheet } from './inicio/BottomSheetOverviewExampleSheet';
import { FormsModule } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';


@NgModule({
  declarations: [
    AppComponent,
    FakenewsComponent,
    InicioComponent,
    BottomSheetOverviewExampleSheet,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MatTabsModule,
    MatButtonModule,
    MatSnackBarModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatBottomSheetModule,
    MatListModule,
    MatDialogModule,
    FormsModule
    
  ],
  entryComponents: [
    BottomSheetOverviewExampleSheet,
    DialogOverviewExampleDialog
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
