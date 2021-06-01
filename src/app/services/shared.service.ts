import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  phoneNumber: string;
  idCardFront: any;
  idCardBack: any;

  constructor() { }

  sendData(front:string){
      this.idCardFront=front;
  }

  sendData2(back:string){
    this.idCardBack=back;
}

  getDataFront(){
      return this.idCardFront;
  }

  getDataBack(){
    return this.idCardBack;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }
}
