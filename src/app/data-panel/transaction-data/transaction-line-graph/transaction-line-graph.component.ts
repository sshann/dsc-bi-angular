import {Component, Input, OnInit} from '@angular/core';
import {TransactionData} from '../../../shared/models/transaction-data.model';


@Component({
  selector: 'app-transaction-line-graph',
  templateUrl: './transaction-line-graph.component.html',
  styleUrls: ['./transaction-line-graph.component.css']
})
export class TransactionLineGraphComponent implements OnInit {
  @Input() transactions: TransactionData[];
  data: any[];
  colorScheme = {
    domain: ['#5AA454', '#A10A28']
  };

  constructor() {
  }

  ngOnInit() {
    console.log('T', this.transactions);
    this.data = [
      {
        name: 'Buy',
        series: []
      },
      {
        name: 'Sell',
        series: []
      }
    ];

    this.transactions.forEach(transaction => {
      const obj = {
        name: transaction.date.substr(0, 10),
        value: transaction.value
      };
      const index = transaction.type === 'Buy' ? 0 : 1;
      this.data[index].series.push(obj);
    });

  }

}
