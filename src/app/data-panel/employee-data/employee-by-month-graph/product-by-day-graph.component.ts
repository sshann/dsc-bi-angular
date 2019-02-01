import {Component, Input, OnInit} from '@angular/core';
import {EmployeeData} from '../../../shared/models/employee-data.model';


@Component({
  selector: 'app-employee-by-day-graph',
  templateUrl: './employee-by-day-graph.component.html',
  styleUrls: ['./employee-by-day-graph.component.css']
})
export class EmployeeByDayGraphComponent implements OnInit {
  @Input() employees: EmployeeData[];
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
      domain: ['#4b7ca1']
    };
  }

  private formatData() {
    const array = [
      {
        name: this.dataProperty === 'current_value' ? 'Value' : 'Stock',
        series: []
      }
    ];

    this.employees.slice().reverse().forEach(employee => {
      const obj = {
        name: employee.date.substr(0, 10),
        value: employee[this.dataProperty]
      };
      array[0].series.push(obj);
    });
    array[0].series = this.sumSameDayEmployees(array[0].series);
    return array;
  }

  private sumSameDayEmployees(array) {
    const fractionDigits = this.dataProperty === 'current_value' ? 2 : 0;
    const newArray = [];
    let index = 0;

    newArray.push(array[0]);
    array.slice(1).forEach((element) => {
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
