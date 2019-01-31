import {Component, OnInit} from '@angular/core';
import {HTTPStatus} from './shared/interceptors/loader.interceptor';
import {LoadingService} from './shared/loading.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading: boolean;

  constructor(private httpStatus: HTTPStatus,
              private loadingService: LoadingService) {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.loading = status;
    });

    this.loadingService.isLoading.subscribe(status => {
      this.loading = status;
      console.error('app ', status)
    });
  }

  ngOnInit(): void {
  }
}
