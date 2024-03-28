import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class NavigationTabViewService {
  private navigationTabViewSubject$ = new Subject<number>();

  activeIndex(activeIndex: number): void {
    this.navigationTabViewSubject$.next(activeIndex);
  }

  navigationTabViewObservable(): Observable<number> {
    return this.navigationTabViewSubject$.asObservable();
  }
}
