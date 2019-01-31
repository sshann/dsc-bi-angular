import {Component, OnInit} from '@angular/core';
import {EmployeeDataService} from './employee-data.service';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css']
})
export class EmployeeDataComponent implements OnInit {

  constructor(private employeeService: EmployeeDataService) {
  }

  ngOnInit() {
    this.employeeService.list().subscribe(response => {
      console.log(response);
    });
  }

}
