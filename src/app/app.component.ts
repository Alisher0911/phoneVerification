import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { WindowService } from './services/window.service';
import * as firebase from 'firebase/app';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'humanID2';

  isSignedIn = false;

  phoneNumber: string;
  code: string;
  phoneSignIn = true;
  windowRef: any;
  disableCodeSendButton = true;

  phoneRecaptchaVerifier: firebase.auth.RecaptchaVerifier

  grecaptchaa: any;
  config = {
    apiKey: "AIzaSyAwaeYCW_Gz2stgc349ZuLKMIP4KBejYG0",
    authDomain: "identification-33691.firebaseapp.com",
    projectId: "identification-33691",
    storageBucket: "identification-33691.appspot.com",
    messagingSenderId: "724902239703",
    appId: "1:724902239703:web:88cd9a1d20eab236367f92"
  }

  constructor(
      public firebaseService: FirebaseService,
      public windowService: WindowService,
      public firebaseAuth: AngularFireAuth,
    ) { }

  ngOnInit(): void {
    firebase.initializeApp(this.config);
    this.windowRef = this.windowService.windowRef;

    if(localStorage.getItem('user') !== null) {
      this.isSignedIn = true
    } else {
      this.isSignedIn = false
    }
  }

  ngAfterViewInit(): void {
    let captchaElement = document.getElementById('recaptcha-container');
    this.windowRef.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container', {
      size: 'normal',
      callback: () => {
        this.disableCodeSendButton = false
      }
    })
    this.windowRef.recaptchaVerifier.render();
  }

  async onSignUp(email: string, password: string) {
    await this.firebaseService.signUp(email, password)
    if(this.firebaseService.isLoggedIn) {
      this.isSignedIn = true
    }
  }

  async onSignIn(email: string, password: string) {
    await this.firebaseService.signIn(email, password)
    if(this.firebaseService.isLoggedIn) {
      this.isSignedIn = true
    }
  }

  handleLogout() {
    this.isSignedIn = false
  }


  async sendCode() {
    const appVerifier = this.windowRef.recaptchaVerifier
    this.firebaseService.signInWithPhone(this.phoneNumber, appVerifier, this.windowRef);
    /*await this.firebaseAuth.signInWithPhoneNumber(this.phoneNumber, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
        console.log(this.windowRef.confirmationResult);
      })
      .catch( error => console.log(error) );*/
  }

  async verifyCode() {
    this.firebaseService.verify(this.windowRef, this.code)
    /*this.windowRef.confirmationResult
      .confirm(this.code)
      .then((userCredentials) => {
        console.log(userCredentials)
        this.isSignedIn = true;
      })
      .catch(error => console.log(error, "Incorrect code entered."));*/
  }
}
