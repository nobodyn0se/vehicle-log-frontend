import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import {importProvidersFrom} from "@angular/core";

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule)]
});
