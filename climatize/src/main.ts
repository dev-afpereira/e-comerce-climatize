import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
enableProdMode();

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()), // Habilitando fetch
    BrowserAnimationsModule
  ]
})
.catch(err => console.error(err));