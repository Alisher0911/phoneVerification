import { Component, OnInit } from '@angular/core';
import { IdCardFront } from '../models/idCardFront';
import { IdCardBack } from '../models/idCardBack';
import {SharedService} from "../services/shared.service"

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  idDataFront: any;
  idDataBack: any;
  phoneNumber: string;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    console.log(this.sharedService.getDataBack())

    this.idDataFront = new  IdCardFront(JSON.parse(this.sharedService.getDataFront()));
    this.idDataBack = new  IdCardBack(JSON.parse(this.sharedService.getDataBack()));
    this.phoneNumber = this.sharedService.getPhoneNumber();
  }
}
