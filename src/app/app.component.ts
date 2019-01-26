import {Component, OnInit} from '@angular/core';
import {HTTPStatus} from './shared/interceptors/loader.interceptor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading: boolean;

  constructor(private httpStatus: HTTPStatus) {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.loading = status;
      console.log(status);
    });
  }

  ngOnInit(): void {
  }
}
