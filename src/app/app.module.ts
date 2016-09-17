import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutes } from './app.router';
import { RootComponent } from './shared/components';
import { HeaderComponent } from './shared/components';
import { SidebarComponent } from './shared/components';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutes
  ],
  declarations: [
    RootComponent,
    HeaderComponent,
    SidebarComponent
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }