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
    domain: ['#A10A28', '#5AA454']
  };

  constructor() {
  }

  ngOnInit() {
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
        value: parseFloat(transaction.value).toFixed(2)
      };
      const index = transaction.type === 'Buy' ? 0 : 1;
      this.data[index].series.push(obj);
    });
    this.data[0].series = this.sumSameDayTransactions(this.data[0].series);
    this.data[1].series = this.sumSameDayTransactions(this.data[1].series);
  }

  private sumSameDayTransactions(array) {
    const newArray = [];
    let newArrayIndex = 0;

    newArray.push(array[0]);
    array.slice(1).forEach((element, index) => {
      if (newArray[newArrayIndex].name === element.name) {
        newArray[newArrayIndex].value = (parseFloat(newArray[newArrayIndex].value) + parseFloat(element.value)).toFixed(2);
      } else {
        newArrayIndex++;
        newArray.push(element);
      }
    });


    return newArray;
  }

}
