import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
	
	trial: any ;
	submit:String = "";
	json: any = [];

  constructor() { }

  ngOnInit() {
	
  }
  
  import(t:any):void{
	  if(t != ""){
		  this.trial = t;
		  this.trial = t.target.files[0];
		  
		  let reader: FileReader = new FileReader();
		  reader.readAsText(this.trial);
		  
		  reader.onload = () => {
			  let csv: string = reader.result;
			  let allFileLines = csv.split("\n");
			  let header = allFileLines[0].split(',');
			  let lines = [];
			  
			  for (let i = 1; i < allFileLines.length; i++) {
				  // split content based on comma
				  let data = allFileLines[i].split(',');
				  
				  if (data.length === header.length) {
					  let attribute = [];
					  for (let j = 0; j < header.length; j++) {
						  attribute[header[j]]=data[j];
						  }
						  lines.push(attribute);
					}
				}
				// all rows in the csv file 
				console.log(">>>>>>>>>>>>>>>>>", lines);
				this.json = lines

			}
		}
	  else{
		  alert("File not selected! Please select a file");
		 
	  }
  }
  
  selected():void{
	  
  }

}
