import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TransactionDataService} from './transaction-data.service';

@Component({
  selector: 'app-transaction-data',
  templateUrl: './transaction-data.component.html',
  styleUrls: ['./transaction-data.component.css']
})
export class TransactionDataComponent implements OnInit {

  constructor(private http: HttpClient,
              private TDservice: TransactionDataService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.TDservice.list().subscribe(response => {
      });
    });
  }

}

