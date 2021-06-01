import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../services/firebase.service';
import { WindowService } from '../services/window.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit, AfterViewInit {

  isSignedIn = false;
  isCodeSent = false;

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
      private firebaseService: FirebaseService,
      private windowService: WindowService,
      //private firebaseAuth: AngularFireAuth,
      private router: Router,
      private sharedService: SharedService
    ) { }

  ngOnInit(): void {
    firebase.initializeApp(this.config);
    this.firebaseService.logout();
    this.windowRef = this.windowService.windowRef;

    if(localStorage.getItem('user') !== null) {
      this.isSignedIn = true
    } else {
      this.isSignedIn = false
    }
  }

  ngAfterViewInit(): void {
    this.windowRef.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container', {
      size: 'normal',
      callback: () => {
        this.disableCodeSendButton = false
      }
    })
    this.windowRef.recaptchaVerifier.render();
  }

 /* async onSignUp(email: string, password: string) {
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
  }*/

  handleLogout() {
    this.isSignedIn = false
  }


  async sendCode() {
    const appVerifier = this.windowRef.recaptchaVerifier
    this.firebaseService.signInWithPhone(this.phoneNumber, appVerifier, this.windowRef);
    if (this.firebaseService.isCodeSent) {
      this.isCodeSent = true
    }
    /*await this.firebaseAuth.signInWithPhoneNumber(this.phoneNumber, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
        console.log(this.windowRef.confirmationResult);
      })
      .catch( error => console.log(error) );*/
  }

  async verifyCode() {
    this.firebaseService.verify(this.windowRef, this.code)
    if(this.firebaseService.isVerified) {
      this.sharedService.phoneNumber = this.phoneNumber;
      this.router.navigate(['/ocr']);
      //this.isSignedIn = true
    }
    /*this.windowRef.confirmationResult
      .confirm(this.code)
      .then((userCredentials) => {
        console.log(userCredentials)
        this.isSignedIn = true;
      })
      .catch(error => console.log(error, "Incorrect code entered."));*/
  }

}
