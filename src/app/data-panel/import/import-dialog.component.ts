/* tslint:disable:no-inferrable-types prefer-const */
import {Component, Inject, OnInit} from '@angular/core';
import {TransactionData} from '../../shared/models/transaction-data.model';
import {ProductData} from '../../shared/models/product-data.model';
import {EmployeeData} from '../../shared/models/employee-data.model';
import {MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {ProductDataService} from '../product-data/product-data.service';
import {TransactionDataService} from '../transaction-data/transaction-data.service';
import {EmployeeDataService} from '../employee-data/employee-data.service';

@Component({
  selector: 'app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.css']
})
export class ImportDialogComponent implements OnInit {

  trial: any;
  selectedData: string;
  transactionJson: TransactionData[] = [];
  temp: TransactionData;
  productJson: ProductData[] = [];
  tempProduct: ProductData;
  employeeJson: EmployeeData[] = [];
  tempEmployee: EmployeeData;
  file: number = 0;
  enableImportButton = false;
  company_id = JSON.parse(localStorage.getItem('currentUser')).company_id;


  constructor(private transactionService: TransactionDataService,
              private productService: ProductDataService,
              private employeeService: EmployeeDataService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) private data) {
  }


  ngOnInit() {
    this.selectedData = this.data ? this.data.type : 'ProductData';

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

  // selected(ddlValue: string): void {
  //   this.selectedData = ddlValue;
  // }

  csvToJson(t: any): void {
    this.enableImportButton = false;
    this.file = t.srcElement.files.length;
    // tslint:disable-next-line:triple-equals
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
          for (let i = 0; i < lines.length; i++) {
            this.tempProduct.date = lines[i].date;
            this.tempProduct.name = lines[i].name;
            this.tempProduct.current_value = lines[i].current_value;
            this.tempProduct.current_stock = lines[i].current_stock;
            this.tempProduct.category = lines[i].category;
            this.tempProduct.description = lines[i].description;
            this.tempProduct.reference = lines[i].reference;


            this.productJson.push(this.tempProduct);
            this.tempProduct = {
              date: '',
              name: '',
              current_value: 0,
              reference: '',
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
            this.tempEmployee.reference = lines[i].reference;


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
      this.enableImportButton = true;
    } else {
      alert('Choose a file to import');
    }
  }


  import(): void {
    console.log('data', this.transactionJson, this.productJson, this.employeeJson);
    if (this.selectedData === 'TransactionData') {
      this.transactionService.import(this.transactionJson).subscribe(comp => {
        console.log(comp);
        this.displaySuccessMessage();
      });
    } else if (this.selectedData === 'ProductData') {
      this.productService.import(this.productJson).subscribe(comp => {
        console.log(comp);
        this.displaySuccessMessage();
      });
    } else {
      this.employeeService.import(this.employeeJson).subscribe(comp => {
        console.log(comp);
        this.displaySuccessMessage();
      });
    }
  }

  private displaySuccessMessage() {
    this.snackBar.open('Data imported', null, {
      duration: 3000,
    });
  }
}
