import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, HttpResponse<any>>();

  constructor() {}

  put(req: HttpRequest<any>, resp: HttpResponse<any>): void {
    this.cache.set(req.urlWithParams, resp);
  }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    return this.cache.get(req.urlWithParams);
  }

  invalidateCache(): void {
    this.cache.clear();
  }
}
