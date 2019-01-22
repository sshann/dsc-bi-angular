import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/observable/of';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BI Application';

  ngOnInit(){
   
  }
}
