import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isVerified = false
  isCodeSent = false

  constructor(public firebaseAuth: AngularFireAuth) { }

  /*async signIn(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
      })
  }

  async signUp(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
      })
  }*/

  async signInWithPhone(phone: string, appVerifier: auth.RecaptchaVerifier, windowRef: any) {
    await this.firebaseAuth.signInWithPhoneNumber(phone, appVerifier)
      .then(result => {
        windowRef.confirmationResult = result;
        console.log(windowRef.confirmationResult);
      })
      .catch( error =>  console.log(error));
  }

  async verify(windowRef: any, code: string) {
    windowRef.confirmationResult
      .confirm(code)
      .then((userCredentials: any) =>  {
        console.log(userCredentials);
        this.isVerified = true;
        localStorage.setItem('user', JSON.stringify(userCredentials));
      })
      .catch((error: any) => console.log(error, "Incorrect code entered."));
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
}
