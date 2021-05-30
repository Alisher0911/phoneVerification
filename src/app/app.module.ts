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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
