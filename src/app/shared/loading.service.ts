import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LoadingService {
  isLoading = new Subject<boolean>();

  constructor() {
  }

  setStatus(status: boolean): void {
    this.isLoading.next(status);
    console.error(status);
  }
}
