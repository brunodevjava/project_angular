import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private loaderSubject = new Subject<LoaderState>();
  loaderState: Observable<LoaderState> = this.loaderSubject.asObservable();

  showLoader(): void {
    document.body.style.cursor = 'wait';
    this.loaderSubject.next({ show: true } as LoaderState);
  }

  hideLoader(): void {
    document.body.style.cursor = 'inherit';
    this.loaderSubject.next({ show: false } as LoaderState);
  }
}
