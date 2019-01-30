import {Component, Input, OnInit} from '@angular/core';
import {TransactionData} from '../../../shared/models/transaction-data.model';


@Component({
  selector: 'app-transaction-by-day-graph',
  templateUrl: './transaction-by-day-graph.component.html',
  styleUrls: ['./transaction-by-day-graph.component.css']
})
export class TransactionByDayGraphComponent implements OnInit {
  @Input() transactions: TransactionData[];
  @Input() graphData: { name: string, series: any[] }[];
  @Input() graphTitle: string;
  @Input() colorScheme: { domain: string[] };
  @Input() dataProperty: string;
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

    this.transactions.slice().reverse().forEach(transaction => {
      const obj = {
        name: transaction.date.substr(0, 10),
        value: transaction[this.dataProperty]
      };
      const index = transaction.type === 'Buy' ? 0 : 1;
      array[index].series.push(obj);
    });
    console.log('first', JSON.stringify(array));
    array[0].series = this.sumSameDayTransactions(array[0].series);
    array[1].series = this.sumSameDayTransactions(array[1].series);
    return array;
  }

  private sumSameDayTransactions(array) {
    const fractionDigits = this.dataProperty === 'current_value' ? 2 : 0;

    const newArray = [];
    let index = 0;

    newArray.push(array[0]);
    array.slice(1).forEach((element) => {
      console.log(JSON.stringify(array));
      if (newArray[index].name === element.name) {
        newArray[index].value = (parseFloat(newArray[index].value) + parseFloat(element.value)).toFixed(fractionDigits);
      } else {
        index++;
        newArray.push(element);
      }
    });


    return newArray;
  }

}
