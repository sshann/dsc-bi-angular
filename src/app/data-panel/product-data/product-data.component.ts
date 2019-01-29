import {Component, OnInit} from '@angular/core';
import {ProductDataService} from './product-data.service';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css']
})
export class ProductDataComponent implements OnInit {

  constructor(private productService: ProductDataService) {
  }

  ngOnInit() {
    this.productService.list().subscribe(response => {
      console.log(response);
    });
  }

}
