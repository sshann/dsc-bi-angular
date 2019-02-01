/* tslint:disable:prefer-const no-inferrable-types triple-equals */
import {Component, OnInit} from '@angular/core';
import {TransactionDataService} from '../transaction-data/transaction-data.service';
import {ProductDataService} from '../product-data/product-data.service';
import {EmployeeDataService} from '../employee-data/employee-data.service';

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.css']
})
export class ExportDialogComponent implements OnInit {

  selected: string = 'ProductData';

  constructor(private transactionService: TransactionDataService,
              private productService: ProductDataService,
              private employeeService: EmployeeDataService) {
  }

  ngOnInit() {
  }

  toCSV(obj: any[]) {
    let array = typeof obj != 'object' ? JSON.parse(obj) : obj;
    let str = '';
    let row = '';

    // tslint:disable-next-line:forin
    for (let index in obj[0]) {
      // Now convert each value to string and comma-separated
      row += index + ',';
    }
    row = row.slice(0, -1);
    row = row.slice(0, -1);
    // append Label row with line break
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      // tslint:disable-next-line:forin
      for (let index in array[i]) {
        // tslint:disable-next-line:triple-equals
        if (line != '') {
          line += ',';
        }

        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }

  export(): void {
    // The filter is returning only field _rev for some reason
    // const filter = 'filter[fields][_rev]=false';
    if (this.selected == 'TransactionData') {
      this.transactionService.list().subscribe(comp => {
        console.log(comp);

        let csv = this.toCSV(comp);
        let a = document.createElement('a');
        a.setAttribute('style', 'display:none');
        let load = new Blob([csv], {type: 'text/csv'});
        let url = window.URL.createObjectURL(load);
        a.href = url;
        a.download = 'TransactionData.csv';
        a.click();
      });
    } else if (this.selected == 'ProductData') {
      this.productService.list().subscribe(comp => {
        console.log(comp);

        let csv = this.toCSV(comp);
        let a = document.createElement('a');
        a.setAttribute('style', 'display:none');
        let load = new Blob([csv], {type: 'text/csv'});
        let url = window.URL.createObjectURL(load);
        a.href = url;
        a.download = 'ProductData.csv';
        a.click();
      });
    } else {
      this.employeeService.list().subscribe(comp => {
        console.log(comp);

        let csv = this.toCSV(comp);
        let a = document.createElement('a');
        a.setAttribute('style', 'display:none');
        let load = new Blob([csv], {type: 'text/csv'});
        let url = window.URL.createObjectURL(load);
        a.href = url;
        a.download = 'EmployeeData.csv';
        a.click();
      });

    }


  }

}
