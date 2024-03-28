import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinnerSubject$ = new Subject<boolean>();

  showSpinner(valor: boolean): void {
    this.spinnerSubject$.next(valor);
  }

  spinnerObservable(): Observable<boolean> {
    return this.spinnerSubject$.asObservable();
  }
}
