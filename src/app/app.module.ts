import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseService } from './services/firebase.service';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { WindowService } from './services/window.service';
import { OcrComponent } from './ocr/ocr.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { OcrService } from './services/ocr.service';
import { PhoneComponent } from './phone/phone.component';
import { ResultComponent } from './result/result.component';
import { SharedService } from './services/shared.service';

const appRoutes: Routes =[
  { path: '', component: PhoneComponent },
  { path: 'ocr', component: OcrComponent },
  { path: 'result', component: ResultComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PhoneComponent,
    OcrComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAwaeYCW_Gz2stgc349ZuLKMIP4KBejYG0",
      authDomain: "identification-33691.firebaseapp.com",
      projectId: "identification-33691",
      storageBucket: "identification-33691.appspot.com",
      messagingSenderId: "724902239703",
      appId: "1:724902239703:web:88cd9a1d20eab236367f92"
    }),
    AngularFirestoreModule
  ],
  providers: [
    FirebaseService,
    WindowService,
    OcrService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
