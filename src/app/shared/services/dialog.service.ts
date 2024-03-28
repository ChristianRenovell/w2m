import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { DialogModel } from 'src/app/core/models/dialogModel';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogrSubject$ = new Subject<DialogModel>();
  private dialogConfirmationSubject$ = new Subject<boolean>();

  showDialog(valor: DialogModel): Observable<boolean> {
    this.dialogrSubject$.next(valor);
    return this.dialogConfirmationSubject$.asObservable();
  }

  dialogObservable(): Observable<DialogModel> {
    return this.dialogrSubject$.asObservable();
  }

  confirmDialog(result: boolean): void {
    this.dialogConfirmationSubject$.next(result);
  }
}
