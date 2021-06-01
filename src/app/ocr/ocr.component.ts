import { Component, OnInit } from '@angular/core';
import { OcrService } from '../services/ocr.service';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css']
})
export class OcrComponent implements OnInit {

  loading = false;
  imageFront:any;
  imageBack:any;
  imagePreview:any;
  imageDataFront = new FormData();
  imageDataBack = new FormData();
  front:string;
  back:string;
  base64Front:string;
  base64Back:string;
  DefaultStatus: string;
  status: string;
  maxFileSize: number;
  isValidFile = true;
  idFront: any;
  idBack: any;

  constructor(private ocrService: OcrService,
              private sharedService: SharedService,
              private router: Router) {
    this.DefaultStatus = "Maximum size allowed for the image is 4 MB";
    this.status = this.DefaultStatus;
    this.maxFileSize = 4 * 1024 * 1024; // 4MB
    this.front="";
    this.back="";
    this.base64Front="";
    this.base64Back="";
  }

  ngOnInit() {
  }

  handleFileSelect(evt:any){
    this.imageFront = <File>evt.target.files[0];
    var files = evt.target.files;
    var file = files[0];

   if (files && file) {
      var reader = new FileReader();

      reader.onload =this.handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}
handleReaderLoaded(readerEvt:any) {
   var binaryString = readerEvt.target.result;
          this.base64Front= btoa(binaryString);
  }

  handleFileSelect2(evt:any){
    this.imageBack = <File>evt.target.files[0];
    var files = evt.target.files;
    var file = files[0];

   if (files && file) {
      var reader = new FileReader();

      reader.onload =this.handleReaderLoaded2.bind(this);

      reader.readAsBinaryString(file);
  }
}
handleReaderLoaded2(readerEvt:any) {
   var binaryString = readerEvt.target.result;
          this.base64Back= btoa(binaryString);
  }


  GetText() {

    if (this.isValidFile) {

      this.loading = true;
      this.imageDataFront.append("base64String",this.base64Front);
      this.ocrService.GetIdCardInfoFront(this.base64Front).subscribe(
        (result) => {
          this.front=JSON.parse(result);
          this.sharedService.sendData(this.front);
          this.ocrService.GetIdCardInfoBack(this.base64Back).subscribe(
            (result2) => {
              this.back=JSON.parse(result2);
              this.sharedService.sendData2(this.back);
              this.router.navigate(['/result']);
            });
        });
    }
  }
}
