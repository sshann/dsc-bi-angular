import { Component, OnInit } from '@angular/core';
import {TransactionDataService} from '../transaction-data/transaction-data.service';
import {ProductDataService} from '../product-data/product-data.service';
import {EmployeeDataService} from '../employee-data/employee-data.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
	
	selected:string = "ProductData";

  constructor(private transactionService: TransactionDataService, private productService: ProductDataService, private employeeService: EmployeeDataService) {	  }

  ngOnInit() {
  }
  
  toCSV(obj: any[]) {
            var array = typeof obj != 'object' ? JSON.parse(obj) : obj;
            var str = '';
            var row = "";
 
            for (var index in obj[0]) {
                //Now convert each value to string and comma-separated
                row += index + ',';
            }
            row = row.slice(0, -1);
            //append Label row with line break
            str += row + '\r\n';
 
            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','
 
                    line += array[i][index];
                }
                str += line + '\r\n';
            }
            return str;
        }
  
  export():void{
	  if(this.selected=="TransactionData"){
		  this.transactionService.list().subscribe(comp => {
			console.log(comp);
			
			let csv = this.toCSV(comp);
			let a = document.createElement("a");
			a.setAttribute('style','display:none');
			let load = new Blob([csv],{type:'text/csv'});
			let url = window.URL.createObjectURL(load);
			a.href = url;
			a.download = 'TransactionData.csv';
			a.click();
			});
	  }
	  else if (this.selected == "ProductData"){
		  this.productService.list().subscribe(comp => {
			console.log(comp);
			
			let csv = this.toCSV(comp);
			let a = document.createElement("a");
			a.setAttribute('style','display:none');
			let load = new Blob([csv],{type:'text/csv'});
			let url = window.URL.createObjectURL(load);
			a.href = url;
			a.download = 'ProductData.csv';
			a.click();
			});
	  }
	  else{
		  this.employeeService.list().subscribe(comp => {
			console.log(comp);
			
			let csv = this.toCSV(comp);
			let a = document.createElement("a");
			a.setAttribute('style','display:none');
			let load = new Blob([csv],{type:'text/csv'});
			let url = window.URL.createObjectURL(load);
			a.href = url;
			a.download = 'EmployeeData.csv';
			a.click();
			});
		  
	  }
	
	  
  }

}
