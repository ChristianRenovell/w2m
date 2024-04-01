import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CacheService } from './core/services/cache.service';
import { ServerInterceptor } from './core/interceptors/server.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    CacheService,
    { provide: HTTP_INTERCEPTORS, useClass: ServerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
