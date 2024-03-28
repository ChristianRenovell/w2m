import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { ToastModel } from 'src/app/core/models/toastModel';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject$ = new Subject<ToastModel>();

  showToast(value: ToastModel): void {
    this.toastSubject$.next(value);
  }

  toastObservable(): Observable<ToastModel> {
    return this.toastSubject$.asObservable();
  }
}
