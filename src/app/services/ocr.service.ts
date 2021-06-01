import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OcrService {

  baseURL: string;
  headers:any;
  options:any;
  constructor(private http: HttpClient) {
    this.baseURL = 'https://localhost:5001/Read';
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.options = this.headers;
  }

  GetIdCardInfoFront(base64String: string) {
    return this.http.post(this.baseURL+'/front',JSON.stringify(base64String), {headers:this.headers,responseType:'text'})
      .pipe(response =>{
        return response
      }
    );
  }

  GetIdCardInfoBack(base64String: string) {
    return this.http.post(this.baseURL+'/back', JSON.stringify(base64String), {headers:this.headers,responseType:'text'})
      .pipe(response => {
        return response;
      });
  }
}
