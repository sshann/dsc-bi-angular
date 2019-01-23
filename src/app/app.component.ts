import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BI Application';

  ngOnInit(){
   
  }
  
  constructor(private router: Router){}
  
  redirect(url:string):void{
	  let accessToken = localStorage.getItem('accessToken');
	  if(!accessToken){
		  this.router.navigate(["/login"]);
	  }
  }
}
