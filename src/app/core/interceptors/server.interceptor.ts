import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { CacheService } from '../services/cache.service';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class ServerInterceptor implements HttpInterceptor {
  constructor(private cacheService: CacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cachedResponse = this.cacheService.get(req);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cacheService.put(req, event);
        }
      })
    );
  }
}
