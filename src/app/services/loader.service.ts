import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  showLoader() {
    this.isLoading.next(true)
  }

  hideLoader() {
    this.isLoading.next(false)
  }

}
