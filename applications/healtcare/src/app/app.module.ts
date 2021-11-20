import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BreadcrumbModule } from 'libraries/ui/src/lib/breadcrumb/breadcrumb.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BreadcrumbModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
