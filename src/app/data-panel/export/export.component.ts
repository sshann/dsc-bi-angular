import { Component, OnInit } from '@angular/core';
import {TransactionDataService} from '../transaction-data/transaction-data.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
	
	selected:string = "ProductData";
	result: any;

  constructor(private transactionService: TransactionDataService) {	  }

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
			this.result= comp;
			
			let csv = this.toCSV(this.result);
			let a = document.createElement("a");
			a.setAttribute('style','display:none');
			let load = new Blob([csv],{type:'text/csv'});
			let url = window.URL.createObjectURL(load);
			a.href = url;
			a.download = 'yourData.csv';
			a.click();
			});
	  }
	  else if (this.selected == "ProductData"){
	  }
	  else{
		  
	  }
	
	  
  }

}
