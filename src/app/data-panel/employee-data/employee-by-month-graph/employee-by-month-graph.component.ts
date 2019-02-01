import {Component, Input, OnInit} from '@angular/core';
import {EmployeeData} from '../../../shared/models/employee-data.model';


@Component({
  selector: 'app-employee-by-month-graph',
  templateUrl: './employee-by-month-graph.component.html',
  styleUrls: ['./employee-by-month-graph.component.css']
})
export class EmployeeByMonthGraphComponent implements OnInit {
  @Input() employees: EmployeeData[];
  @Input() graphData: { name: string, series: any[] }[];
  @Input() graphTitle: string;
  @Input() colorScheme: { domain: string[] };
  @Input() dataProperty: string[];
  data: any[];
  _graphTitle: string;

  constructor() {
  }

  ngOnInit() {
    if (this.graphData) {
      this.data = this.graphData;
    } else {
      this.data = [];
      this.dataProperty.forEach(property => {
        this.data.push(this.formatData(property));
      });
    }
    console.log(this.data);

    this._graphTitle = this.graphTitle;
  }

  private getPropertyLabel(property: string): string {
    let label = '';
    switch (property) {
      case 'total_employees':
        label = 'Number of employees';
        break;
      case 'total_salary_paid':
        label = 'Total salary paid';
        break;
      case 'total_teams':
        label = 'Number of teams';
        break;
    }
    return label;
  }

  private getPropertyDecimal(property: string): number {
    let decimal = 0;
    switch (property) {
      case 'total_employees':
        decimal = 0;
        break;
      case 'total_salary_paid':
        decimal = 2;
        break;
      case 'total_teams':
        decimal = 0;
        break;
    }
    return decimal;
  }

  private formatData(property) {
    const line = {
      name: this.getPropertyLabel(property),
      series: []
    };
    const decimal = this.getPropertyDecimal(property);

    this.employees.slice().reverse().forEach(employee => {
      const obj = {
        name: employee.date.substr(0, 10),
        value: (employee[property]).toFixed(decimal)
      };
      line.series.push(obj);
    });
    line.series = this.sumSameDayEmployees(line.series, decimal);
    return line;
  }

  private sumSameDayEmployees(array, decimal) {
    const newArray = [];
    let index = 0;

    newArray.push(array[0]);
    array.slice(1).forEach((element) => {
      if (newArray[index].name === element.name) {
        newArray[index].value = (parseFloat(newArray[index].value) + parseFloat(element.value)).toFixed(decimal);
      } else {
        index++;
        newArray.push(element);
      }
    });

    return newArray;
  }

}
