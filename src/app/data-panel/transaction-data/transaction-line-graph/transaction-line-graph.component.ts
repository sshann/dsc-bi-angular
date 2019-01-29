import {Component, Input, OnInit} from '@angular/core';
import {TransactionData} from '../../../shared/models/transaction-data.model';


@Component({
  selector: 'app-transaction-line-graph',
  templateUrl: './transaction-line-graph.component.html',
  styleUrls: ['./transaction-line-graph.component.css']
})
export class TransactionLineGraphComponent implements OnInit {
  @Input() transactions: TransactionData[];
  @Input() graphData: { name: string, series: any[] }[];
  @Input() graphTitle: string;
  @Input() colorScheme: { domain: string[] };
  data: any[];
  _colorScheme: { domain: string[] };
  _graphTitle: string;

  constructor() {
  }

  ngOnInit() {
    if (this.graphData) {
      this.data = this.graphData;
    } else {
      this.data = this.formatData();
    }

    this._graphTitle = this.graphTitle ? this.graphTitle : 'Value (€)';
    this._colorScheme = this.colorScheme ? this.colorScheme : {
      domain: ['#A10A28', '#5AA454']
    };
  }

  private formatData() {
    const array = [
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
      array[index].series.push(obj);
    });
    array[0].series = this.sumSameDayTransactions(array[0].series);
    array[1].series = this.sumSameDayTransactions(array[1].series);
    return array;
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
