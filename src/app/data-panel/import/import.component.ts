/* tslint:disable:no-inferrable-types prefer-const */
import {Component, OnInit} from '@angular/core';
import {TransactionDataService} from '../transaction-data/transaction-data.service';
import {TransactionData} from '../../shared/models/transaction-data.model';
import {ProductData} from '../../shared/models/product-data.model';
import {EmployeeData} from '../../shared/models/employee-data.model';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  trial: any;
  selectedData: string = 'EmployeeData';
  transactionJson: TransactionData[] = [];
  temp: TransactionData;
  productJson: ProductData[] = [];
  tempProduct: ProductData;
  employeeJson: EmployeeData[] = [];
  tempEmployee: EmployeeData;
  file: number = 0;
  company_id = JSON.parse(localStorage.getItem('currentUser')).company_id;


  constructor(private dataService: TransactionDataService) {
  }


  ngOnInit() {
    this.temp = {
      date: ' ',
      value: ' ',
      type: ' ',
      amount: 0,
      description: ' ',
      reference: ' ',
      company_id: this.company_id
    };

    this.tempProduct = {
      date: ' ',
      category: ' ',
      current_value: 0,
      current_stock: 0,
      name: ' ',
      description: '',
      company_id: this.company_id
    };
    this.tempEmployee = {
      date: '',
      department: '',
      reference: '',
      total_employees: 0,
      total_salary_paid: 0,
      total_teams: 0,
      company_id: this.company_id
    };
  }

  selected(ddlValue: string): void {
    this.selectedData = ddlValue;
  }

  csvToJson(t: any): void {
    this.file = t.srcElement.files.length;
    if (this.file != 0) {
      this.trial = t.target.files[0];

      let reader: FileReader = new FileReader();
      reader.readAsText(this.trial);

      reader.onload = () => {
        let csv: string = reader.result;
        let allFileLines = csv.split('\n');
        let header = allFileLines[0].split(',');
        let lines = [];

        for (let i = 1; i < allFileLines.length; i++) {
          // split content based on comma
          let data = allFileLines[i].split(',');

          if (data.length === header.length) {
            let attribute = [];
            for (let j = 0; j < header.length; j++) {
              header[j] = header[j].trim();
              attribute[header[j]] = data[j];
            }
            lines.push(attribute);
          }
        }
        // all rows in the csv file
        console.log('>>>>>>>>>>>>>>>>>', lines);
        if (this.selectedData === 'TransactionData') {
          alert('IN TransactionData');
          for (let i = 0; i < lines.length; i++) {
            this.temp.date = lines[i].date;
            this.temp.description = lines[i].description;
            this.temp.value = lines[i].value;
            this.temp.amount = lines[i].amount;
            this.temp.type = lines[i].type;
            this.temp.reference = lines[i].reference;


            this.transactionJson.push(this.temp);
            this.temp = {
              date: '',
              description: '',
              value: '',
              amount: 0,
              type: '',
              reference: '',
              company_id: this.company_id
            };

          }
          console.log(this.transactionJson);
        } else if (this.selectedData === 'ProductData') {
          alert('IN ProductData');
          for (let i = 0; i < lines.length; i++) {
            this.tempProduct.date = lines[i].date;
            this.tempProduct.name = lines[i].name;
            this.tempProduct.current_value = lines[i].current_value;
            this.tempProduct.current_stock = lines[i].current_stock;
            this.tempProduct.category = lines[i].category;
            this.tempProduct.description = lines[i].description;


            this.productJson.push(this.tempProduct);
            this.tempProduct = {
              date: '',
              name: '',
              current_value: 0,
              current_stock: 0,
              category: '',
              description: '',
              company_id: this.company_id
            };
          }
        } else {
          for (let i = 0; i < lines.length; i++) {
            this.tempEmployee.date = lines[i].date;
            this.tempEmployee.department = lines[i].department;
            this.tempEmployee.total_employees = lines[i].total_employees;
            this.tempEmployee.total_salary_paid = lines[i].total_salary_paid;
            this.tempEmployee.total_teams = lines[i].total_teams;


            this.employeeJson.push(this.tempEmployee);
            this.tempEmployee = {
              date: '',
              department: '',
              total_employees: 0,
              total_salary_paid: 0,
              total_teams: 0,
              reference: '',
              company_id: this.company_id
            };
          }

        }
      };
    } else {
      alert('Choose a file to import');
    }
  }


  import(): void {
    if (this.selectedData === 'TransactionData') {
      this.dataService.import(this.transactionJson, this.selectedData).subscribe(comp => {
        console.log(comp);
      });
    } else if (this.selectedData === 'ProductData') {
      this.dataService.import(this.productJson, this.selectedData).subscribe(comp => {
        console.log(comp);
      });
    } else {
      this.dataService.import(this.employeeJson, this.selectedData).subscribe(comp => {
        console.log(comp);
      });
    }
  }

}
